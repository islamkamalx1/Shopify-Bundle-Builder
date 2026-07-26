import type { BundleData, BundleProduct, BundleState } from "@/types/bundle";

export const getSelectionKey = (productId: string, variantId?: string) =>
  variantId ? `${productId}:${variantId}` : productId;

export const getActiveVariantId = (
  state: Pick<BundleState, "selectedVariants">,
  product: BundleProduct,
): string | undefined => {
  if (!product.variants?.length) return undefined;
  return state.selectedVariants[product.id] ?? product.variants[0].id;
};

export const getPlanProductIds = (bundle: BundleData) =>
  bundle.steps
    .find((step) => step.id === "plan")
    ?.products.map((product) => product.id) ?? [];
