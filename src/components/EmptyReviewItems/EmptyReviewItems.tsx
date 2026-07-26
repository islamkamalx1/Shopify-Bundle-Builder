export default function EmptyReviewItems() {
  return (
    <section className="bg-sky rounded-[10px] min-w-99.75 h-fit">
      <h5 className="text-xs uppercase tracking-widest text-tertiary2 px-3.75 pt-3.75 pb-1.25">
        review
      </h5>
      <div className="px-5 py-5 pb-7.75 space-y-4">
        <div className="space-y-1.25">
          <h4 className="text-secondary tracking-wide text-[22px]">
            Your security system
          </h4>
          <p className="text-sm text-secondary-alpha max-w-87.5 tracking-wide leading-tight">
            Select your cameras, plan, and accessories to build your bundle.
          </p>
        </div>
        <div className="rounded-[10px] border border-dashed border-[#CED6DE] bg-white/60 p-4 text-center text-sm text-secondary-alpha">
          No items selected yet.
        </div>
      </div>
    </section>
  );
}
