import { BookCover } from "@repo/ui";
import { IBookCardProps } from "./interface";

export const BookCardMok = ({
  imageUrl,
  title,
  author,
  children,
}: IBookCardProps) => {
  return (
    <section className="w-full max-w-[348px] h-[196px] flex flex-row gap-4 p-4 rounded-lg bg-blue-300 flex-shrink-0">
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
