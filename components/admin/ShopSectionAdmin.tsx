/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { api } from "@/lib/api";

// shadcn
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ShopSecitonForm } from "@/components/forms/ShopSectionForm";
import Image from "next/image";

type ItemType = {
  _id: string;
  image: string;
  isActive: boolean;
  order: number;
};

export function ShopSectionAdmin() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [original, setOriginal] = useState<ItemType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<ItemType | null>(null);
  const [image, setImage] = useState<File | string>("");

  const fetchItems = async () => {
    const { data } = await api.get("/admin/sections/shop");
    setItems(data.data || []);
    setOriginal(data.data || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const isChanged =
    JSON.stringify(items.map((i) => i._id)) !==
    JSON.stringify(original.map((i) => i._id));

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const updated = Array.from(items);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);

    setItems(updated.map((item, index) => ({ ...item, order: index })));
  };

  const saveOrder = async () => {
    await api.put("/admin/sections/shop/reorder", {
      items: items.map((item, index) => ({
        id: item._id,
        order: index,
      })),
    });

    fetchItems();
  };

  const toggleActive = async (item: ItemType) => {
    await api.patch("/admin/sections/shop", {
      id: item._id,
      isActive: !item.isActive,
    });

    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete item?")) return;

    await api.delete(`/admin/sections/shop?id=${id}`);
    fetchItems();
  };

  const openAdd = () => {
    setEditItem(null);
    setImage("");
    setShowModal(true);
  };

  const openEdit = (item: ItemType) => {
    setEditItem(item);
    setImage(item.image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
    setImage("");
  };

  return (
    <div className="p-6 w-full min-h-screen bg-white">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Swap Image Admin</h1>

        <div className="flex gap-2">
          {isChanged && (
            <Button onClick={saveOrder} className="bg-green-500">
              Save Order
            </Button>
          )}

          <Button onClick={openAdd}>+ Add</Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center gap-4 p-3 mb-3 shadow rounded"
                    >
                      <div {...provided.dragHandleProps}>☰</div>

                      <Image
                        height={50}
                        width={50}
                        alt={item.image}
                        src={item.image}
                        className="w-32 h-20 object-cover rounded"
                      />

                      <div
                        onClick={() => toggleActive(item)}
                        className={`ml-auto w-10 h-5 flex items-center p-1 rounded-full cursor-pointer ${item.isActive ? "bg-green-500" : "bg-gray-300"
                          }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full ${item.isActive ? "translate-x-5" : ""
                            }`}
                        />
                      </div>

                      <Button onClick={() => openEdit(item)}>Edit</Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editItem ? "Edit Image" : "Add Image"}
            </DialogTitle>
          </DialogHeader>

          <ShopSecitonForm
            editItem={editItem}
            onClose={closeModal}
            refresh={fetchItems}
            items={items}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}