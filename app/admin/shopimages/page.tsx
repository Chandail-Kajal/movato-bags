/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

type ItemType = {
  _id: string;
  image: string;
  isActive: boolean;
  order: number;
};

export default function SwapImageAdmin() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [original, setOriginal] = useState<ItemType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<ItemType | null>(null);

  const [form, setForm] = useState<any>({
    image: "",
  });

  // ✅ Fetch
  const fetchItems = async () => {
    const res = await fetch("/api/swapimages");
    const data = await res.json();
    setItems(data.data || []);
    setOriginal(data.data || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ✅ Detect reorder change
  const isChanged =
    JSON.stringify(items.map((i) => i._id)) !==
    JSON.stringify(original.map((i) => i._id));

  // ✅ Drag
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
    await fetch("/api/swapimages/reorder", {
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

  // ✅ Toggle
  const toggleActive = async (item: ItemType) => {
    await fetch("/api/swapimages", {
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

    await fetch(`/api/swapimages?id=${id}`, {
      method: "DELETE",
    });

    fetchItems();
  };

  // ✅ Submit
  const handleSubmit = async () => {
    const formData = new FormData();

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    if (editItem) {
      formData.append("id", editItem._id);

      await fetch("/api/swapimages", {
        method: "PUT",
        body: formData,
      });
    } else {
      formData.append("order", String(items.length));

      await fetch("/api/swapimages", {
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
    setForm({ image: "" });
    setShowModal(true);
  };

  const openEdit = (item: ItemType) => {
    setEditItem(item);
    setForm({ image: item.image });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
  };

  return (
    <div className="p-6 w-full min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Swap Image Admin</h1>

        <div className="flex gap-2">
          {isChanged && (
            <button
              onClick={saveOrder}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save Order
            </button>
          )}

          <button
            onClick={openAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add
          </button>
        </div>
      </div>

      {/* List */}
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
                      className="flex items-center gap-4 p-3 mb-3 shadow rounded"
                    >
                      {/* Drag */}
                      <div {...provided.dragHandleProps} className="cursor-grab">
                        ☰
                      </div>

                      {/* Image */}
                      <img
                        src={item.image}
                        className="w-32 h-20 object-cover rounded"
                      />

                      {/* Toggle */}
                      <div
                        onClick={() => toggleActive(item)}
                        className={`ml-auto w-10 h-5 flex items-center p-1 rounded-full cursor-pointer ${
                          item.isActive ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full ${
                            item.isActive ? "translate-x-5" : ""
                          }`}
                        />
                      </div>

                      {/* Buttons */}
                      <button
                        onClick={() => openEdit(item)}
                        className="bg-blue-600 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
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
          <div className="bg-white p-6 rounded w-96">
            <h2 className="mb-4">
              {editItem ? "Edit Image" : "Add Image"}
            </h2>

            {/* Preview */}
            {typeof form.image === "string" && form.image && (
              <img
                src={form.image}
                className="w-full h-32 object-cover mb-2 rounded"
              />
            )}

            <input
              type="file"
              onChange={(e) =>
                setForm({ image: e.target.files?.[0] })
              }
              className="mb-4"
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