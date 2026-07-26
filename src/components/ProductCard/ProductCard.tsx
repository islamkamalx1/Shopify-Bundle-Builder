import {
  memo,
  useCallback,
  useMemo,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { useShallow } from "zustand/react/shallow";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BundleProduct } from "@/types/bundle";
import { useBundleStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { getSelectionKey } from "@/lib/bundle-selectors";
import Counter from "@/components/Counter";

interface ProductCardProps {
  product: BundleProduct;
  stepId: string;
}

function ProductCard({ product, stepId }: ProductCardProps) {
  const {
    activeVariantId,
    selectedQuantity,
    variantQuantitiesKey,
    toggleProduct,
    setQuantity,
    setVariant,
  } = useBundleStore(
    useShallow((state) => {
      const variantId = product.variants?.length
        ? (state.selectedVariants[product.id] ?? product.variants[0].id)
        : undefined;
      const key = getSelectionKey(product.id, variantId);

      return {
        activeVariantId: variantId,
        selectedQuantity: state.selectedProducts[key] ?? 0,
        variantQuantitiesKey:
          product.variants
            ?.map(
              (variant) =>
                state.selectedProducts[
                  getSelectionKey(product.id, variant.id)
                ] ?? 0,
            )
            .join(",") ?? "",
        toggleProduct: state.toggleProduct,
        setQuantity: state.setQuantity,
        setVariant: state.setVariant,
      };
    }),
  );

  const variantQuantities = useMemo(() => {
    if (!product.variants?.length) return {} as Record<string, number>;
    const values = variantQuantitiesKey.split(",").map(Number);
    return Object.fromEntries(
      product.variants.map((variant, index) => [
        variant.id,
        values[index] ?? 0,
      ]),
    );
  }, [product.variants, variantQuantitiesKey]);

  const isSelected = selectedQuantity > 0;
  const isPlanStep = stepId === "plan";

  const activeVariant = useMemo(() => {
    if (!product.variants?.length) return undefined;
    return (
      product.variants.find((variant) => variant.id === activeVariantId) ??
      product.variants[0]
    );
  }, [product.variants, activeVariantId]);

  const formattedPrice = useMemo(() => {
    if (typeof product.price === "number") {
      return product.price === 0 ? "Free" : `$${product.price.toFixed(2)}`;
    }

    return product.price;
  }, [product.price]);

  const formattedCompareAtPrice = useMemo(() => {
    if (typeof product.compareAtPrice === "number") {
      return product.compareAtPrice === 0
        ? "Free"
        : `$${product.compareAtPrice.toFixed(2)}`;
    }

    return product.compareAtPrice;
  }, [product.compareAtPrice]);

  const handleCardClick = useCallback(() => {
    toggleProduct(product, stepId);
  }, [product, stepId, toggleProduct]);

  const handleCardKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleProduct(product, stepId);
      }
    },
    [product, stepId, toggleProduct],
  );

  const handleCounterChange = useCallback(
    (value: number) => {
      setQuantity(product.id, value, stepId, activeVariantId);
    },
    [product.id, setQuantity, stepId, activeVariantId],
  );

  const handleVariantSelect = useCallback(
    (event: MouseEvent<HTMLButtonElement>, variantId: string) => {
      event.stopPropagation();
      setVariant(product.id, variantId);
    },
    [product.id, setVariant],
  );

  const handleVariantKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      event.stopPropagation();
    },
    [],
  );

  return (
    <Card
      className={`h-full w-full items-start xl:items-center bg-white flex-col xl:flex-row p-2.75 rounded-[10px] gap-4.75 border-2 ${isSelected ? "border-primary" : "border-transparent"} ring-0 shadow-none`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
    >
      <CardHeader className="p-0 xl:w-25.25 w-full h-full relative flex items-center justify-center">
        <img
          src={product.image}
          alt={
            activeVariant
              ? `${product.title} — ${activeVariant.label}`
              : product.title
          }
          loading="lazy"
          decoding="async"
          className="object-cover w-25.25"
        />

        {product.badge ? (
          <Badge className="absolute top-0 left-0 font-semibold">{product.badge.text}</Badge>
        ) : null}
      </CardHeader>

      <div className="flex-1">
        <CardContent className="p-0 pb-2.5">
          <h3 className="text-secondary tracking-wide font-semibold">{product.title}</h3>
          {product.description ? (
            <p className="text-xs text-secondary-alpha my-2 tracking-wide leading-tight max-w-50.5 font-medium">
              {product.description}{" "}
              {product.learnMore ? (
                <a
                  href={product.learnMore}
                  className="text-[#0000EE]"
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                  }}
                >
                  Learn More
                </a>
              ) : null}
            </p>
          ) : null}
          {product.variants && product.variants.length > 0 ? (
            <div
              className="flex items-center gap-2 flex-wrap"
              role="radiogroup"
              aria-label={`${product.title} color`}
            >
              {product.variants.map((variant) => {
                const isActive = variant.id === activeVariant?.id;
                const quantity = variantQuantities[variant.id] ?? 0;

                return (
                  <button
                    key={variant.id}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    aria-label={
                      quantity > 0
                        ? `${variant.label}, ${quantity} selected`
                        : variant.label
                    }
                    title={variant.label}
                    onClick={(event) => handleVariantSelect(event, variant.id)}
                    onKeyDown={handleVariantKeyDown}
                    className={cn(
                      "flex items-center justify-center rounded-sm border-[0.5px] py-px px-0.75 transition-all",
                      isActive
                        ? "border-[#0AA288] bg-[#1DF0BB0A]"
                        : "border-border bg-white",
                    )}
                  >
                    <img
                      src={variant.thumbnail}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-6 w-6 object-cover"
                    />
                    <span className="text-[10px] text-secondary font-medium">
                      {variant.label}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </CardContent>

        <CardFooter className="p-0 flex justify-between items-center gap-2">
          {isPlanStep ? (
            <p className="flex flex-col items-start">
              {formattedCompareAtPrice ? (
                <span className="text-error line-through text-xs">
                  {formattedCompareAtPrice}
                </span>
              ) : null}
              <span className="text-primary tracking-wide">
                {formattedPrice}
              </span>
            </p>
          ) : (
            <>
              <Counter
                value={selectedQuantity}
                onChange={handleCounterChange}
              />
              <p className="flex flex-col items-end">
                {formattedCompareAtPrice ? (
                  <span className="text-error line-through text-xs">
                    {formattedCompareAtPrice}
                  </span>
                ) : null}
                <span className="text-tertiary tracking-wide">
                  {formattedPrice}
                </span>
              </p>
            </>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}

export default memo(ProductCard);
