import { BookCardMok } from "./BookCardMok";
import { IBookCardProps } from "./interface";

export const BookCard = ({ imageUrl, title, author }: IBookCardProps) => {
  const Component = BookCardMok;
  return <Component imageUrl={imageUrl} title={title} author={author} />;
};
