import { z } from "zod";

export const productCreateBodySchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  name: z.string().min(1, "Product name is required"),
  description: z.string(),
  status: z.string(),
  productCode: z.string(),
  categoryId: z.string().min(1, "Category is required"),
  options: z.array(
    z.object({
      name: z.string(),
      values: z.array(z.string()),
    })
  ),
  variants: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      inventory: z.number(),
      options: z.array(z.string()),
      sku: z.string(),
      imei: z.string().trim().default(""),
      image: z.string().nullable(),
    })
  ),
  images: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      publicId: z.string(),
    })
  ),
});

export const productUpdateBodySchema = z.object({
  id: z.string(),
  slug: z.string().min(1, "Slug is required"),
  name: z.string().min(1, "Product name is required"),
  description: z.string(),
  productCode: z.string(),
  categoryId: z.string().min(1, "Category is required"),
  options: z.array(
    z.object({
      name: z.string(),
      values: z.array(z.string()),
    })
  ),
  variants: z.array(
    z.object({
      id: z.string(),
      sku: z.string(),
      name: z.string(),
      price: z.number(),
      inventory: z.number(),
      options: z.array(z.string()),
      imei: z.string().trim().default(""),
      image: z.string().nullable(),
    })
  ),
  images: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      publicId: z.string(),
    })
  ),
});
