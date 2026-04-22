/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getHeroBanners() {
  const res = await fetch("http://localhost:3000/api/public/heroes", {
    cache: "no-store",
  });

  const data = await res.json();

  return data.data|| [];
}
export async function getshopyourluggage() {
  const res = await fetch("http://localhost:3000/api/public/shopimages", {
    cache: "no-store",
  });

  const data = await res.json();

  return data.data?.map((item:any)=>{ return item.image}) || [];
}