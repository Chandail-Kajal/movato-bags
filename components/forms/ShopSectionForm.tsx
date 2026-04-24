/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFormik } from "formik";
import { api } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import Image from "next/image";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const schema = Yup.object({
    image: Yup.mixed().required("Image is required"),
    categoryType: Yup.string()
        .oneOf(["size", "collection", "trip"])
        .required("Category type is required"),
    
});

export const ShopSecitonForm = ({
    editItem,
    onClose,
    refresh,
    items,
}: any) => {
    const formik = useFormik({
        initialValues: {
            image: editItem?.image || "",
            categoryType: editItem?.categoryType || "",
            buttonTitle: editItem?.buttonTitle || "",
            caption: editItem?.caption || "",
        },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: async (values) => {
            const formData = new FormData();

            if (values.image instanceof File) {
                formData.append("image", values.image);
            }

            formData.append("categoryType", values.categoryType);
            formData.append("buttonTitle", values.buttonTitle);
            formData.append("caption", values.caption);

            try {
                if (editItem) {
                    formData.append("id", editItem._id);
                    await api.put("/admin/sections/shop", formData);
                } else {
                    formData.append("order", String(items.length));
                    await api.post("/admin/sections/shop", formData);
                }

                refresh();
                onClose();
            } catch (err) {
                console.error(err);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">

            {typeof formik.values.image === "string" &&
                formik.values.image && (
                    <Image
                        height={50}
                        width={50}
                        alt="preview"
                        src={formik.values.image}
                        className="w-full h-32 object-cover rounded"
                    />
                )}

            <Input
                type="file"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        formik.setFieldValue("image", file);
                    }
                }}
            />

           
            <Select
                value={formik.values.categoryType}
                onValueChange={(value) =>
                    formik.setFieldValue("categoryType", value)
                }
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select category type" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="size">Size</SelectItem>
                    <SelectItem value="collection">Collection</SelectItem>
                    <SelectItem value="trip">Trip</SelectItem>
                </SelectContent>
            </Select>

            {formik.touched.categoryType && formik.errors.categoryType && (
                <p className="text-red-500 text-sm">
                    {formik.errors.categoryType as string}
                </p>
            )}

           
            <Input
                placeholder="Button Title"
                {...formik.getFieldProps("buttonTitle")}
            />
            {formik.touched.buttonTitle && formik.errors.buttonTitle && (
                <p className="text-red-500 text-sm">
                    {formik.errors.buttonTitle as string}
                </p>
            )}

           
            <Input
                placeholder="Caption"
                {...formik.getFieldProps("caption")}
            />
            {formik.touched.caption && formik.errors.caption && (
                <p className="text-red-500 text-sm">
                    {formik.errors.caption as string}
                </p>
            )}

            
            {formik.touched.image && formik.errors.image && (
                <p className="text-red-500 text-sm">
                    {formik.errors.image as string}
                </p>
            )}

           
            <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
};