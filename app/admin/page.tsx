/* eslint-disable @next/next/no-img-element */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

type HeroType = {
  _id: string;
  image: string;
  title: string;
  description: string;
  primaryBtn: string;
  secondaryBtn: string;
  isActive: boolean;
  order: number;
};

export default function HeroAdmin() {
  const [items, setItems] = useState<HeroType[]>([]);
  const [original, setOriginal] = useState<HeroType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<HeroType | null>(null);

  const [form, setForm] = useState<any>({
    image: "",
    title: "",
    description: "",
    primaryBtn: "",
    secondaryBtn: "",
  });

  // ✅ Fetch Data
  const fetchItems = async () => {
    const res = await fetch("/api/admin");
    const data = await res.json();

    setItems(data.data || []);
    setOriginal(data.data || []);
  };

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const res = await fetch("/api/admin");
        const data = await res.json();

        if (!ignore) {
          setItems(data.data || []);
          setOriginal(data.data || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadData();

    return () => {
      ignore = true; // ✅ prevents unwanted state updates
    };
  }, []);

  // ✅ Check reorder change
  const isChanged =
    JSON.stringify(items.map((i) => i._id)) !==
    JSON.stringify(original.map((i) => i._id));

  // ✅ Drag End
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const updated = Array.from(items);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);

    setItems(
      updated.map((item, index) => ({
        ...item,
        order: index,
      }))
    );
  };

  // ✅ Save Order
  const saveOrder = async () => {
    await fetch("/api/admin/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((item, index) => ({
          id: item._id,
          order: index,
        })),
      }),
    });

    fetchItems();
  };

  // ✅ Toggle Active
  const toggleActive = async (item: HeroType) => {
    await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item._id,
        isActive: !item.isActive,
      }),
    });

    fetchItems();
  };

  // ✅ Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete item?")) return;

    await fetch(`/api/admin?id=${id}`, {
      method: "DELETE",
    });

    fetchItems();
  };

  const handleSubmit = async () => {
    if (!form.title) return;

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("primaryBtn", form.primaryBtn);
    formData.append("secondaryBtn", form.secondaryBtn);

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    if (editItem) {
      formData.append("id", editItem._id);

      await fetch("/api/admin", {
        method: "PUT",
        body: formData,
      });
    } else {
      formData.append("order", String(items.length));

      await fetch("/api/admin", {
        method: "POST",
        body: formData,
      });
    }

    closeModal();
    fetchItems();
  };

  // ✅ Modal Controls
  const openAdd = () => {
    setEditItem(null);
    setForm({
      image: "",
      title: "",
      description: "",
      primaryBtn: "",
      secondaryBtn: "",
    });
    setShowModal(true);
  };

  const openEdit = (item: HeroType) => {
    setEditItem(item);
    setForm({
      image: item.image,
      title: item.title,
      description: item.description,
      primaryBtn: item.primaryBtn,
      secondaryBtn: item.secondaryBtn,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
  };

  return (
    <div className="p-6 mx-auto w-full min-h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Hero Banner Admin</h1>

        <div className="flex gap-2">
          {isChanged && (
            <button
              onClick={saveOrder}
              className="bg-green-500 text-white px-4 py-2 rounded-xl"
            >
              Save Order
            </button>
          )}

          <button
            onClick={openAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Drag List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable
                  key={item._id}
                  draggableId={item._id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-white shadow rounded-xl p-3 mb-4 flex items-center gap-3"
                    >
                      {/* Drag */}
                      <div
                        {...provided.dragHandleProps}
                        className="cursor-grab text-gray-400"
                      >
                        ☰
                      </div>

                      {/* Image */}
                      <img
                        src={item.image}
                        className="w-28 h-16 object-cover rounded"
                        alt=""
                      />

                      {/* Content */}
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>

                      {/* Toggle */}
                      <div
                        onClick={() => toggleActive(item)}
                        className={`ml-auto w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${item.isActive ? "bg-green-500" : "bg-gray-300"
                          }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow transform ${item.isActive ? "translate-x-5" : ""
                            }`}
                        />
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 ml-3">
                        <button
                          onClick={() => openEdit(item)}
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-87.5">
            <h2 className="mb-4 font-semibold">
              {editItem ? "Edit Banner" : "Add Banner"}
            </h2>

            {/* ✅ IMAGE UPLOAD */}
            <div className="mb-3">
              {/* Preview */}
              {typeof form.image === "string" && form.image && (
                <img
                  src={form.image}
                  alt="preview"
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )}

              <input
                type="file"
                accept=".png,.jpg,.jpeg,.svg"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setForm((prev: any) => ({
                    ...prev,
                    image: file, // ✅ FILE stored
                  }));
                }}
              />
            </div>

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full border px-3 py-2 mb-2 rounded"
            />

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border px-3 py-2 mb-2 rounded"
            />

            <input
              placeholder="Primary Button"
              value={form.primaryBtn}
              onChange={(e) =>
                setForm({ ...form, primaryBtn: e.target.value })
              }
              className="w-full border px-3 py-2 mb-2 rounded"
            />

            <input
              placeholder="Secondary Button"
              value={form.secondaryBtn}
              onChange={(e) =>
                setForm({ ...form, secondaryBtn: e.target.value })
              }
              className="w-full border px-3 py-2 mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button onClick={closeModal}>Cancel</button>
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-3 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}