import { BookCard } from "../../bookCard";

export const BookCardSection = ({ items }: { items: any[] }) => {
  return (
    <section className="w-full mx-auto flex flex-row gap-2 ">
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
