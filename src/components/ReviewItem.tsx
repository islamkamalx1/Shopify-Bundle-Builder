import Counter from "./Counter";
import camera from "@/assets/images/web-cam.png";

export default function ReviewItem() {
  return (
    <div className="flex gap-4">
      <div className="flex gap-3 items-center flex-1">
        <img src={camera} alt="web cam" />
        <h3 className="text-sm leading-4 text-gray flex-1 tracking-wide">
          Wyze Cam v4
        </h3>
        <Counter />
      </div>
      
      <div className="flex flex-col gap-2 items-end">
        <span className="text-sm leading-4 text-tertiary3 line-through tracking-wide">
          $27.98
        </span>
        <span className="text-sm leading-4 text-primary tracking-wide">
          $27.98
        </span>
      </div>
    </div>
  );
}
