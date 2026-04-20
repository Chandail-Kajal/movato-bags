"use client";

import { useEffect, useState } from "react";

type Banner = {
  _id: string;
  title: string;
  sortOrder: number;
  isActive: boolean;
};

export default function AdminPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/admin/heros");
      const data = await res.json();
      setBanners(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const updateSort = async (id: string, newOrder: number) => {
    await fetch("/api/admin/heros", {
      method: "PUT",
      body: JSON.stringify({ id, sortOrder: newOrder }),
    });

    fetchBanners();
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Hero Banner Admin</h1>

      <div className="flex flex-col gap-3">
        {banners.map((banner) => (
          <div
            key={banner._id}
            className="border p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{banner.title}</p>
              <p className="text-sm text-gray-500">
                Order: {banner.sortOrder}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  updateSort(banner._id, banner.sortOrder - 1)
                }
                className="px-3 py-1 bg-gray-200"
              >
                ↑
              </button>
              <button
                onClick={() =>
                  updateSort(banner._id, banner.sortOrder + 1)
                }
                className="px-3 py-1 bg-gray-200"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}