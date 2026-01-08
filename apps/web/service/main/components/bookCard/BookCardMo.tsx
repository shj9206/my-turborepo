import { cn } from "@repo/util";
import { IBookCardProps } from "./interface";
import { BookCover } from "@/app/_components";

export const BookCardMo = ({
  imageUrl,
  title,
  author,
  bgColor,
}: IBookCardProps & { bgColor: string }) => {
  return (
    <section
      className={cn(
        "w-[320px] h-[196px] flex flex-row gap-4 p-4 rounded-lg flex-shrink-0",
        bgColor
      )}
    >
      <BookCover src={imageUrl} alt={title} size="xs" />
      <div className="w-full h-full flex flex-col gap-3 min-w-0">
        <div className="flex flex-col gap-2 min-w-0">
          <span className="text-lg font-bold line-clamp-2">{title}</span>
          <span className="text-lg text-gray-500 line-clamp-2">{author}</span>
        </div>
      </div>
    </section>
  );
};
