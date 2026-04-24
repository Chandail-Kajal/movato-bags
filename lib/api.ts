/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});


export const fetchPublicData = async (
  section: "shop" | "hero" | "featured",
  queryParams: Record<string, any> = {}
) => {
  try {
    const queryString = new URLSearchParams(queryParams).toString();

    const url = `/public/sections/${section}${queryString ? `?${queryString}` : ""
      }`;

    const { data } = await api.get(url);

    return data?.data || [];
  } catch (error) {
    console.error("fetchPublicData error:", error);
    return [];
  }
};
