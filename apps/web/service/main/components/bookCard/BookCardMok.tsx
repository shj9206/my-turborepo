import { BookCover } from "@repo/ui/components/bookCover";
import { IBookCardProps } from "./interface";

export const BookCardMok = ({
  imageUrl,
  title,
  author,
  children,
}: IBookCardProps) => {
  return (
    <section className="w-full flex flex-row gap-2 p-2">
      <BookCover imageUrl={imageUrl} size="sm" />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold">{title}</span>
          <span className="text-lg text-gray-500">{author}</span>
        </div>
        {children}
      </div>
    </section>
  );
};
