import satisfactionBadge from "@/assets/images/satisfaction-badge.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { getNumericPrice } from "@/lib/utils";
import type { BundleData, SelectedItem } from "@/types/bundle";
import CheckoutSuccess from "@/components/CheckoutSuccess";

interface CheckoutProps {
  bundle: BundleData;
  selectedItems: SelectedItem[];
  saveConfiguration: () => void;
}

export default function Checkout(props: CheckoutProps) {
  const { bundle, selectedItems, saveConfiguration } = props;

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const subtotal = useMemo(
    () =>
      selectedItems.reduce((sum, item) => {
        const numericPrice = getNumericPrice(item.product.price);
        return sum + numericPrice * item.quantity;
      }, 0),
    [selectedItems],
  );

  const total = useMemo(
    () => subtotal + bundle.shipping,
    [subtotal, bundle.shipping],
  );

  const savings = useMemo(
    () =>
      selectedItems.reduce((sum, item) => {
        const numericPrice = getNumericPrice(item.product.price);
        const numericCompareAtPrice = getNumericPrice(
          item.product.compareAtPrice,
        );

        return (
          sum +
          (numericCompareAtPrice
            ? (numericCompareAtPrice - numericPrice) * item.quantity
            : 0)
        );
      }, 0),
    [selectedItems],
  );

  const insteadOf = useMemo(() => savings + subtotal, [savings, subtotal]);

  const handleCheckout = () => {
    setIsSuccessOpen(true);
  };

  return (
    <div className="md:w-[40%] w-full xl:w-full">
      <div className="flex items-center justify-between mb-1">
        <img
          src={satisfactionBadge}
          alt="Satisfaction Badge"
          className="h-32.75 w-32.75 md:h-19.5 md:w-19.5"
        />
        <div className="flex items-end flex-col">
          <Badge className="rounded-[3px] text-xs tracking-tight font-medium">
            {bundle.financing}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-lg leading-5 line-through text-tertiary3 tracking-wide font-medium">
              ${insteadOf.toFixed(2)}
            </span>
            <span className="text-2xl leading-8 text-primary tracking-tight font-semibold">
              {total === 0 ? "Free" : "$" + total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-1 text-[#0AA288] text-xs tracking-tight text-center font-semibold">
          Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
        </p>
        <Button
          className="w-full h-12 cursor-pointer font-semibold"
          onClick={handleCheckout}
        >
          Check Out
        </Button>
        <Button
          variant="link"
          className="cursor-pointer mx-auto w-full text-tertiary2 italic underline"
          onClick={() => saveConfiguration()}
        >
          Save my system for later
        </Button>
      </div>

      <CheckoutSuccess
        isSuccessOpen={isSuccessOpen}
        setIsSuccessOpen={setIsSuccessOpen}
        savings={savings}
      />
    </div>
  );
}
