import { BookCardMo } from "./BookCardMo";
import { IBookCardProps } from "./interface";

export const BookCard = ({
  imageUrl,
  title,
  author,
  index = 0,
}: IBookCardProps) => {
  const bgColors = ["bg-blue-20", "bg-red-20", "bg-purple-20"];
  const bgColor = bgColors[index % 3];
  const Component = BookCardMo;
  return (
    <Component
      bgColor={bgColor ?? "bg-blue-20"}
      imageUrl={imageUrl}
      title={title}
      author={author}
      index={index ?? 0}
    />
  );
};
