import { memo, useCallback, useMemo } from "react";
import Counter from "@/components/Counter";
import type { BundleProduct, BundleVariant } from "@/types/bundle";
import { useBundleStore } from "@/lib/store";
import { cn, getNumericPrice } from "@/lib/utils";

interface ReviewItemProps {
  product: BundleProduct;
  quantity: number;
  stepId?: string;
  variant?: BundleVariant;
}

function ReviewItem({ product, quantity, stepId, variant }: ReviewItemProps) {
  const setQuantity = useBundleStore((state) => state.setQuantity);
  const isPlanItem = stepId === "plan";

  const displayImage = variant?.thumbnail ?? product.image;

  const displayPrice = useMemo(() => {
    if (typeof product.price === "string") return product.price;

    const numericPrice = getNumericPrice(product.price);
    return numericPrice === 0
      ? "Free"
      : `$${(numericPrice * quantity).toFixed(2)}`;
  }, [product.price, quantity]);

  const displayCompareAtPrice = useMemo(() => {
    if (typeof product.compareAtPrice === "string") {
      return product.compareAtPrice;
    }

    const numericCompareAtPrice = getNumericPrice(product.compareAtPrice);
    return numericCompareAtPrice
      ? `$${(numericCompareAtPrice * quantity).toFixed(2)}`
      : null;
  }, [product.compareAtPrice, quantity]);

  const handleQuantityChange = useCallback(
    (value: number) => setQuantity(product.id, value, stepId, variant?.id),
    [product.id, setQuantity, stepId, variant?.id],
  );

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-1 items-center gap-3">
        <img
          src={displayImage}
          alt={variant ? `${product.title} — ${variant.label}` : product.title}
          loading="lazy"
          className={cn("h-10 w-10 object-cover", isPlanItem && "h-6 w-5")}
        />

        <div className="flex-1">
          <h3 className="text-sm leading-4 tracking-wide text-gray font-medium">
            {product.title}
          </h3>
          {variant ? (
            <span className="text-xs leading-4 tracking-wide text-tertiary3 font-medium">
              {variant.label}
            </span>
          ) : null}
        </div>

        {!isPlanItem && (
          <Counter value={quantity} onChange={handleQuantityChange} />
        )}
      </div>

      <div className="flex flex-col items-end">
        {displayCompareAtPrice && (
          <span className="text-sm leading-4 tracking-wide text-tertiary3 line-through font-medium">
            {displayCompareAtPrice}
          </span>
        )}
        <span className="text-sm leading-4 tracking-wide text-primary font-medium">
          {displayPrice}
        </span>
      </div>
    </div>
  );
}

export default memo(ReviewItem);
