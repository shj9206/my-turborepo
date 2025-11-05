import { BookCard } from "../../bookCard";

export const BookCardSection = ({ items }: { items: any[] }) => {
  return (
    <section className="flex w-full flex-row gap-2">
      {items.map((item: any) => (
        <BookCard
          key={item.id}
          imageUrl={item.cover}
          title={item.title}
          author={item.author}
        />
      ))}
    </section>
  );
};
