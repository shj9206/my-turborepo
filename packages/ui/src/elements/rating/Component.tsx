import { cn } from "@repo/util";
import Icon from "../icon/Component";
import { IRatingProps } from "./interface";

const Rating = ({ count = 5, className }: IRatingProps) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: 5 }).map((_, index) => {
        const isFilled = index < Math.floor(count);
        return (
          <Icon
            key={index}
            name="star"
            className={cn(
              isFilled
                ? "fill-current text-blue-600 stroke-blue-600 stroke-0"
                : "text-white stroke-blue-600 stroke-[1px]"
            )}
          />
        );
      })}
    </div>
  );
};

export default Rating;
