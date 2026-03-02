import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

function unixToIso(unix: unknown) {
  if (typeof unix !== "number") return null;
  return new Date(unix * 1000).toISOString();
}

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET" },
      { status: 500 }
    );
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  // Stripe signature verification requires the raw body string
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err?.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    const admin = supabaseAdmin();

    // -------------------------
    // checkout.session.completed
    // -------------------------
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.user_id;
      const customerId =
        typeof session.customer === "string" ? session.customer : null;
      const subscriptionId =
        typeof session.subscription === "string" ? session.subscription : null;

      if (!userId) {
        console.warn(
          "checkout.session.completed missing session.metadata.user_id"
        );
        return NextResponse.json({ received: true }, { status: 200 });
      }

      if (!subscriptionId) {
        console.warn("checkout.session.completed missing session.subscription");
        return NextResponse.json({ received: true }, { status: 200 });
      }

      const sub = await stripe.subscriptions.retrieve(subscriptionId);

      const priceId = sub.items.data?.[0]?.price?.id ?? null;

      // TS-safe way: Stripe types sometimes vary, so read via index signature
      const currentPeriodEnd = unixToIso(
        (sub as any).current_period_end ?? (sub as any).current_period_end
      );

      const { error } = await admin.from("subscriptions").upsert(
        {
          user_id: userId,
          stripe_customer_id: customerId,
          stripe_subscription_id: sub.id,
          stripe_price_id: priceId,
          status: sub.status,
          current_period_end: currentPeriodEnd,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

      if (error) {
        console.error(
          "Supabase upsert error (checkout.session.completed):",
          error
        );
        return NextResponse.json({ error: "DB write failed" }, { status: 500 });
      }

      return NextResponse.json({ received: true }, { status: 200 });
    }

    // -----------------------------
    // customer.subscription.updated
    // -----------------------------
    if (event.type === "customer.subscription.updated") {
      const sub = event.data.object as Stripe.Subscription;

      const priceId = sub.items.data?.[0]?.price?.id ?? null;

      const currentPeriodEnd = unixToIso((sub as any).current_period_end);

      const { error } = await admin
        .from("subscriptions")
        .update({
          stripe_price_id: priceId,
          status: sub.status,
          current_period_end: currentPeriodEnd,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", sub.id);

      if (error) {
        console.error(
          "Supabase update error (customer.subscription.updated):",
          error
        );
        return NextResponse.json({ error: "DB update failed" }, { status: 500 });
      }

      return NextResponse.json({ received: true }, { status: 200 });
    }

    // -----------------------------
    // customer.subscription.deleted
    // -----------------------------
    if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object as Stripe.Subscription;

      const { error } = await admin
        .from("subscriptions")
        .update({
          status: sub.status,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", sub.id);

      if (error) {
        console.error(
          "Supabase update error (customer.subscription.deleted):",
          error
        );
        return NextResponse.json({ error: "DB update failed" }, { status: 500 });
      }

      return NextResponse.json({ received: true }, { status: 200 });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: err?.message || "Webhook failed" },
      { status: 500 }
    );
  }
}