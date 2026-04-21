export async function getHeroBanners() {
  const res = await fetch("http://localhost:3000/api/heroes", {
    cache: "no-store",
  });

  const data = await res.json();

  return data.data || [];
}