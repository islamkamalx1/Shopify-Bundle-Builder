import type { BundleData } from "@/types/bundle";

export default function ShippingRow({ bundle }: { bundle: BundleData }) {
  return (
    <div className="flex items-center gap-4 border-t border-[#CED6DE] pt-3.75">
      <div className="flex gap-3 items-center flex-1">
        <img
          src={bundle.shippingImage}
          alt="fast shipping"
          className="h-10 w-10 object-cover"
        />
        <h3 className="text-sm leading-4 text-gray flex-1 tracking-wide font-medium">
          Fast Shipping
        </h3>
      </div>

      <div className="flex flex-col">
        <span className="text-sm leading-4 text-tertiary3 line-through tracking-wide font-medium">
          ${(19.45).toFixed(2)}
        </span>

        <span className="text-sm leading-4 text-primary tracking-wide font-medium">
          {bundle.shipping === 0 ? "Free" : "$" + bundle.shipping.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
