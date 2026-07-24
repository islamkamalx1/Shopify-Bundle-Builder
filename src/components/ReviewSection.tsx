import ReviewItem from "./ReviewItem";
import freeBadge from "@/assets/images/free-badge.png";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function ReviewSection() {
  return (
    <section className="bg-sky rounded-[10px] min-w-99.75">
      <h5 className="text-xs uppercase tracking-widest text-tertiary2 px-3.75 pt-3.75 pb-1.25">
        review
      </h5>
      <div className="px-5 py-5 pb-7.75 space-y-2.5">
        <div className="space-y-1.25">
          <h4 className="text-secondary tracking-wide text-[22px]">
            Your security system
          </h4>
          <p className="text-sm text-secondary-alpha max-w-87.5 tracking-wide leading-tight">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="pt-3.75 border-t border-[#CED6DE]">
            <h6 className="text-[#A8B2BD] uppercase text-xs leading-4 tracking-wide mb-2">
              cameras
            </h6>
            <div className="flex flex-col gap-3">
              <ReviewItem />
              <ReviewItem />
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="pt-3.75 border-t border-[#CED6DE]">
            <h6 className="text-[#A8B2BD] uppercase text-xs leading-4 tracking-wide mb-2">
              sensors
            </h6>
            <div className="flex flex-col gap-3">
              <ReviewItem />
              <ReviewItem />
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="pt-3.75 border-t border-[#CED6DE]">
            <h6 className="text-[#A8B2BD] uppercase text-xs leading-4 tracking-wide mb-2">
              accessories
            </h6>
            <div className="flex flex-col gap-3">
              <ReviewItem />
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="pt-3.75 border-t border-[#CED6DE]">
            <h6 className="text-[#A8B2BD] uppercase text-xs leading-4 tracking-wide mb-2">
              plan
            </h6>
            <div className="flex flex-col gap-3">
              <ReviewItem />
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="pt-3.75 border-t border-[#CED6DE]">
            <div className="flex flex-col gap-3">
              <ReviewItem />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-1">
          <img src={freeBadge} alt="Free Badge" />
          <div className="flex items-end flex-col">
            <Badge className="rounded-[3px] text-xs tracking-tight">
              as low as $19.19/mo
            </Badge>
            <div className="flex items-center gap-2">
              <span className="text-lg leading-5 line-through text-tertiary3 tracking-wide">
                $122.43
              </span>
              <span className="text-2xl leading-8 text-primary tracking-tight">
                $561.50
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-1 text-[#0AA288] text-xs tracking-tight text-center">
            Congrats! You’re saving $50.92 on your security bundle!
          </p>
          <Button className="w-full h-12 cursor-pointer">Check Out</Button>
          <Button variant="link" className="cursor-pointer mx-auto w-full text-tertiary2 italic underline">
            Save my system for later
          </Button>
        </div>
      </div>
    </section>
  );
}
