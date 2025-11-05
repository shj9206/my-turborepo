import { BookCover } from "@repo/ui";
import { cn } from "@repo/util";
import { IBookCardProps } from "./interface";

export const BookCardMok = ({
  imageUrl,
  title,
  author,
  bgColor,
}: IBookCardProps & { bgColor: string }) => {
  return (
    <section
      className={cn(
        "w-full max-w-[348px] h-[196px] flex flex-row gap-4 p-4 rounded-lg flex-shrink-0",
        bgColor
      )}
    >
      <BookCover imageUrl={imageUrl} size="xs" />
      <div className="w-full h-full flex flex-col gap-3 min-w-0">
        <div className="flex flex-col gap-2 min-w-0">
          <span className="text-lg font-bold line-clamp-2">{title}</span>
          <span className="text-lg text-gray-500 line-clamp-2">{author}</span>
        </div>
      </div>
    </section>
  );
};
