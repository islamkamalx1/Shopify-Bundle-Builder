import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import bundleData from "@/data/bundle.json";
import { toast } from "sonner";
import type { BundleState } from "@/types/bundle";
import { getActiveVariantId, getSelectionKey } from "./bundle-selectors";
import { applySelection } from "./bundle-rules";
import { bundleDataSchema } from "./bundle-schema";

const initialBundle = bundleDataSchema.parse(bundleData);
const STORAGE_KEY = "bundle-builder-config";

const DEFAULT_SELECTED_PRODUCTS: Record<string, number> = {
  [getSelectionKey("wyze-cam-v4", "white")]: 1,
  [getSelectionKey("wyze-cam-pan-v3", "white")]: 1,
  "cam-unlimited": 1,
  "wyze-sense-motion-sensor": 1,
  "wyze-sense-hub": 1,
  "wyze-microSD-card": 1,
};

const DEFAULT_SELECTED_VARIANTS: Record<string, string> = {
  "wyze-cam-v4": "white",
  "wyze-cam-pan-v3": "white",
};

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useBundleStore = create<BundleState>()(
  persist(
    (set, get) => ({
      bundle: initialBundle,
      activeStep: initialBundle.steps[0]?.id ?? "",
      selectedProducts: DEFAULT_SELECTED_PRODUCTS,
      selectedVariants: DEFAULT_SELECTED_VARIANTS,

      setActiveStep: (stepId) => set({ activeStep: stepId }),

      setQuantity: (productId, quantity, stepId, variantId) =>
        set((state) => {
          const key = getSelectionKey(productId, variantId);
          return applySelection(state, key, stepId, Math.max(0, quantity));
        }),

      toggleProduct: (product, stepId) =>
        set((state) => {
          const variantId = getActiveVariantId(state, product);
          const key = getSelectionKey(product.id, variantId);
          const currentQuantity = state.selectedProducts[key] ?? 0;
          const nextQuantity = currentQuantity > 0 ? 0 : 1;
          return applySelection(state, key, stepId, nextQuantity);
        }),

      setVariant: (productId, variantId) =>
        set((state) => ({
          selectedVariants: {
            ...state.selectedVariants,
            [productId]: variantId,
          },
        })),

      getActiveVariant: (product) => {
        if (!product.variants?.length) return undefined;
        const variantId = getActiveVariantId(get(), product);
        return product.variants.find((variant) => variant.id === variantId);
      },

      saveConfiguration: () => {
        toast.success("Configuration saved successfully");
      },

      resetConfiguration: () =>
        set({
          activeStep: initialBundle.steps[0]?.id ?? "",
          selectedProducts: DEFAULT_SELECTED_PRODUCTS,
          selectedVariants: DEFAULT_SELECTED_VARIANTS,
        }),

      getStepProducts: (stepId) =>
        get().bundle.steps.find((step) => step.id === stepId)?.products ?? [],

      getSelectedItems: () => {
        const { bundle, selectedProducts } = get();

        return bundle.steps.flatMap((step) =>
          step.products.flatMap((product) => {
            if (product.variants?.length) {
              return product.variants.flatMap((variant) => {
                const quantity =
                  selectedProducts[getSelectionKey(product.id, variant.id)] ??
                  0;
                return quantity > 0
                  ? [{ product, quantity, stepId: step.id, variant }]
                  : [];
              });
            }

            const quantity = selectedProducts[product.id] ?? 0;
            return quantity > 0 ? [{ product, quantity, stepId: step.id }] : [];
          }),
        );
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? noopStorage : window.localStorage,
      ),
      partialize: (state) => ({
        activeStep: state.activeStep,
        selectedProducts: state.selectedProducts,
        selectedVariants: state.selectedVariants,
      }),
    },
  ),
);
