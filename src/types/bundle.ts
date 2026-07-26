import type { BundleData } from "./bundle";
import type { BundleProduct } from "./bundle";
import type { BundleVariant } from "./bundle";

export type {
  BundleData,
  BundleProduct,
  BundleVariant,
  BundleStep,
} from "@/lib/bundle-schema";

export interface SelectedItem {
  product: BundleProduct;
  quantity: number;
  stepId: string;
  variant?: BundleVariant;
}

export interface BundleState {
  bundle: BundleData;
  activeStep: string;
  selectedProducts: Record<string, number>;
  selectedVariants: Record<string, string>;
  setActiveStep: (stepId: string) => void;
  setQuantity: (
    productId: string,
    quantity: number,
    stepId?: string,
    variantId?: string,
  ) => void;
  toggleProduct: (product: BundleProduct, stepId: string) => void;
  setVariant: (productId: string, variantId: string) => void;
  getActiveVariant: (product: BundleProduct) => BundleVariant | undefined;
  saveConfiguration: () => void;
  resetConfiguration: () => void;
  getStepProducts: (stepId: string) => BundleProduct[];
  getSelectedItems: () => SelectedItem[];
}
