import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import ReviewItem from "@/components/ReviewItem";
import { useBundleStore } from "@/lib/store";
import Checkout from "@/components/Chcekout";
import EmptyReviewItems from "@/components/EmptyReviewItems";
import ShippingRow from "@/components/ShippingRow";
import { getSelectionKey } from "@/lib/bundle-selectors";
import type { SelectedItem } from "@/types/bundle";

const STEP_ORDER = ["cameras", "sensor", "accessories", "plan"];

export default function ReviewSection() {
  const { bundle, selectedProducts, saveConfiguration } = useBundleStore(
    useShallow((state) => ({
      bundle: state.bundle,
      selectedProducts: state.selectedProducts,
      saveConfiguration: state.saveConfiguration,
    })),
  );

  const selectedItems = useMemo<SelectedItem[]>(() => {
    return bundle.steps.flatMap((step) =>
      step.products.flatMap((product) => {
        if (product.variants?.length) {
          return product.variants.flatMap((variant) => {
            const quantity =
              selectedProducts[getSelectionKey(product.id, variant.id)] ?? 0;

            return quantity > 0
              ? [
                  {
                    product,
                    quantity,
                    stepId: step.id,
                    variant,
                  },
                ]
              : [];
          });
        }

        const quantity = selectedProducts[product.id] ?? 0;

        return quantity > 0
          ? [
              {
                product,
                quantity,
                stepId: step.id,
              },
            ]
          : [];
      }),
    );
  }, [bundle.steps, selectedProducts]);

  const stepGroups = useMemo(
    () =>
      bundle.steps
        .map((step) => ({
          step,
          items: selectedItems.filter((item) => item.stepId === step.id),
        }))
        .filter((group) => group.items.length > 0)
        .sort(
          (a, b) =>
            STEP_ORDER.indexOf(a.step.id) - STEP_ORDER.indexOf(b.step.id),
        ),
    [bundle.steps, selectedItems],
  );

  if (selectedItems.length === 0) {
    return <EmptyReviewItems />;
  }

  return (
    <section className="bg-sky rounded-[10px] w-full xl:w-99.75 h-fit">
      <h5 className="text-xs uppercase tracking-widest text-tertiary2 px-3.75 pt-3.75 pb-1.25 font-medium">
        review
      </h5>
      <div className="px-5 py-5 pb-7.75 space-y-2.5 flex xl:flex-col flex-col md:flex-row gap-13 xl:gap-0">
        <div className="md:w-[50%] w-full xl:w-full">
          <h4 className="text-secondary tracking-wide text-[22px] font-semibold">
            Your security system
          </h4>
          <p className="text-sm text-secondary-alpha max-w-87.5 tracking-wide leading-tight font-medium mt-1.25 pb-2.5">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>

          {stepGroups.map(({ step, items }) => (
            <div key={step.id} className="space-y-2.5">
              <div className="pt-3.75 pb-2.5 border-t border-[#CED6DE]">
                <h6 className="text-[#A8B2BD] uppercase text-xs leading-4 tracking-wide mb-2">
                  {step.id}
                </h6>
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <ReviewItem
                      key={getSelectionKey(item.product.id, item.variant?.id)}
                      product={item.product}
                      quantity={item.quantity}
                      stepId={item.stepId}
                      variant={item.variant}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}

          <ShippingRow bundle={bundle} />
        </div>

        <Checkout
          bundle={bundle}
          selectedItems={selectedItems}
          saveConfiguration={saveConfiguration}
        />
      </div>
    </section>
  );
}
