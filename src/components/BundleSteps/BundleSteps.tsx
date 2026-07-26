"use client";

import { useCallback, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Camera,
  ShieldCheck,
  Radio,
  Grid2X2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useBundleStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { getSelectionKey } from "@/lib/bundle-selectors";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const stepIcons = {
  cameras: Camera,
  plan: ShieldCheck,
  sensor: Radio,
  accessories: Grid2X2,
};

export default function BundleSteps() {
  const {
    bundle,
    activeStep,
    setActiveStep,
    selectedProducts,
    selectedVariants,
  } = useBundleStore(
    useShallow((state) => ({
      bundle: state.bundle,
      activeStep: state.activeStep,
      setActiveStep: state.setActiveStep,
      selectedProducts: state.selectedProducts,
      selectedVariants: state.selectedVariants,
    })),
  );

  const handleValueChange = useCallback(
    (value: string[] | undefined) => {
      if (value?.[0]) {
        setActiveStep(value[0]);
      }
    },
    [setActiveStep],
  );

  const goToNextStep = useCallback(
    (currentIndex: number) => {
      const nextStep = bundle.steps[currentIndex + 1];
      if (nextStep) {
        setActiveStep(nextStep.id);
      }
    },
    [bundle.steps, setActiveStep],
  );

  const stepSummaries = useMemo(
    () =>
      bundle.steps.map((step, index) => {
        const Icon = stepIcons[step.id as keyof typeof stepIcons] ?? Camera;
        const nextStep = bundle.steps[index + 1];
        const buttonLabel = nextStep && `Next: ${nextStep.title}`;
        const selectedCount = step.products.reduce((count, product) => {
          const variantId = product.variants?.length
            ? (selectedVariants[product.id] ?? product.variants[0].id)
            : undefined;
          const key = getSelectionKey(product.id, variantId);
          const quantity = selectedProducts[key] ?? 0;
          return count + (quantity > 0 ? 1 : 0);
        }, 0);

        return {
          step,
          index,
          Icon,
          nextStep,
          buttonLabel,
          selectedCount,
        };
      }),
    [bundle.steps, selectedProducts, selectedVariants],
  );

  return (
    <Accordion
      value={activeStep ? [activeStep] : []}
      onValueChange={handleValueChange as never}
      className="w-full xl:max-w-3xl gap-3.25"
    >
      {stepSummaries.map(
        ({ step, index, Icon, nextStep, buttonLabel, selectedCount }) => (
          <AccordionItem
            key={step.id}
            value={step.id}
            className={cn("rounded-tr-[10px] rounded-tl-[10px] border-border", {
              "bg-sky not-last:border-b-0 rounded-bl-[10px] rounded-br-[10px]":
                activeStep === step.id,
            })}
          >
            <AccordionTrigger className="group pt-5 pb-0 hover:no-underline flex flex-col">
              <span className="text-xs font-medium pb-1.25 ps-3.75 w-full border-b border-border text-tertiary2 uppercase leading-tight">
                STEP {index + 1} OF {bundle.steps.length}
              </span>
              <div className="flex w-full items-center justify-between gap-2 pt-5 px-3.75">
                <div className="flex items-center gap-2 flex-1">
                  <Icon size={26} className="text-tertiary3" />
                  <span className="xl:text-[22px] sm:text-lg text-base font-semibold text-gray">
                    {step.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-tertiary2">
                  {selectedCount > 0 && (
                    <span className="text-primary font-medium text-sm leading-4">
                      {selectedCount} selected
                    </span>
                  )}
                  {activeStep === step.id ? (
                    <ChevronUp className="text-primary size-4 stroke-3" />
                  ) : (
                    <ChevronDown className="text-primary size-4 stroke-3" />
                  )}
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex items-stretch xl:justify-center p-3 flex-wrap gap-3.75">
                {step.products.length > 0 ? (
                  step.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex w-full sm:w-auto sm:min-w-56 xl:min-w-[361.5px]"
                    >
                      <ProductCard product={product} stepId={step.id} />
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-sm text-secondary-alpha font-medium">
                    No products available for this step yet.
                  </div>
                )}
              </div>
              {nextStep ? (
                <Button
                  variant="outline"
                  className="flex mx-auto font-semibold"
                  onClick={() => goToNextStep(index)}
                >
                  {buttonLabel}
                </Button>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ),
      )}
    </Accordion>
  );
}
