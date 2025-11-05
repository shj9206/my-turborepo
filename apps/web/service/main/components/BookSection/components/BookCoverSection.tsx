import { BookCover } from "@repo/ui";

export const BookCoverSection = ({items}: {items: any[]}) => {
  return (
    <section className="flex flex-row gap-4">
    {items.map((item: any) => (
      <BookCover key={item.id} imageUrl={item.cover} size="sm" />
    ))}
  </section>
  );
};