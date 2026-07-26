import type { BundleState } from "@/types/bundle";
import { getPlanProductIds } from "./bundle-selectors";

export const applySelection = (
  state: BundleState,
  selectionKey: string,
  stepId: string | undefined,
  quantity: number,
) => {
  if (stepId !== "plan") {
    return {
      selectedProducts: {
        ...state.selectedProducts,
        [selectionKey]: quantity,
      },
    };
  }

  const planProductIds = getPlanProductIds(state.bundle);

  const otherSelections = Object.fromEntries(
    Object.entries(state.selectedProducts).filter(
      ([id]) => !planProductIds.includes(id),
    ),
  );

  return {
    selectedProducts: {
      ...otherSelections,
      [selectionKey]: quantity > 0 ? 1 : 0,
    },
  };
};
