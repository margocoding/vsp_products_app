import { create } from "axios";

export const baseApi = create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})