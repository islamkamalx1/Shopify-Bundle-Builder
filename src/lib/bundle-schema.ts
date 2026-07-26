import { z } from "zod";

const priceSchema = z.union([z.number(), z.string()]);

const bundleVariantSchema = z.object({
  id: z.string(),
  label: z.string(),
  thumbnail: z.string().optional(),
});

const bundleProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  badge: z.object({ text: z.string() }).optional(),
  image: z.string().optional(),
  learnMore: z.string().optional(),
  price: priceSchema,
  compareAtPrice: priceSchema.optional(),
  variants: z.array(bundleVariantSchema).optional(),
});

const bundleStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  order: z.number(),
  products: z.array(bundleProductSchema),
});

export const bundleDataSchema = z.object({
  steps: z.array(bundleStepSchema),
  shipping: z.number(),
  compareAtShipping: z.number().optional(),
  shippingImage: z.string().optional(),
  financing: z.string().optional(),
});

export type BundleVariant = z.infer<typeof bundleVariantSchema>;
export type BundleProduct = z.infer<typeof bundleProductSchema>;
export type BundleStep = z.infer<typeof bundleStepSchema>;
export type BundleData = z.infer<typeof bundleDataSchema>;
