import { cn } from "@repo/util";
import { IBookCoverProps } from "./interface";

export const BookCover = ({ imageUrl, size = "md" }: IBookCoverProps) => {
  const sizeClass = {
    sm: "w-[128px] h-[178px]",
    md: "w-[248px] h-[364px]",
  };

  return (
    <div
      className={cn(
        sizeClass[size as keyof typeof sizeClass],
        "relative overflow-hidden rounded-lg flex-shrink-0 bg-gray-100 flex items-center justify-center"
      )}
    >
      <img
        src={imageUrl}
        alt="Book Cover"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    </div>
  );
}
