import { NextResponse } from "next/server";

type AppSearchResult = {
  id: string; // App Store trackId
  name: string; // trackName
  version: string;
  iconUrl: string | null; // artworkUrl60 / artworkUrl100
  url: string | null; // trackViewUrl
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const term = (searchParams.get("term") || "").trim();
    const country = (searchParams.get("country") || "ie").toLowerCase();

    if (!term) {
      return NextResponse.json({ results: [] as AppSearchResult[] });
    }

    // iTunes Search API
    const apiUrl =
      `https://itunes.apple.com/search?` +
      `term=${encodeURIComponent(term)}` +
      `&country=${encodeURIComponent(country)}` +
      `&entity=software` +
      `&limit=8`;

    const res = await fetch(apiUrl, { cache: "no-store" });
    if (!res.ok) {
      const t = await res.text();
      return NextResponse.json(
        { error: "App search failed", details: t },
        { status: 500 }
      );
    }

    const data = await res.json();
    const rawResults = Array.isArray(data?.results) ? data.results : [];

    const results: AppSearchResult[] = rawResults
      .map((r: any) => {
        const id = r?.trackId ? String(r.trackId) : "";
        const name = r?.trackName ? String(r.trackName) : "";
        const version = r?.version ? String(r.version) : "";
        const iconUrl =
          (r?.artworkUrl60 ? String(r.artworkUrl60) : null) ||
          (r?.artworkUrl100 ? String(r.artworkUrl100) : null);
        const url = r?.trackViewUrl ? String(r.trackViewUrl) : null;

        if (!id || !name || !version) return null;

        return { id, name, version, iconUrl, url };
      })
      .filter(Boolean) as AppSearchResult[];

    return NextResponse.json({ results });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Unexpected error", details: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}