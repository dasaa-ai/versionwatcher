export async function fetchAppDetails(appId: string) {
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${appId}`
  );

  if (!response.ok) return null;

  const data = await response.json();

  if (!data.results || data.results.length === 0) return null;

  const app = data.results[0];

  return {
    name: app.trackName,
    version: app.version,
    url: app.trackViewUrl,
  };
}
