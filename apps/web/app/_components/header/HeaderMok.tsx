import { IHeaderProps } from "./interface";

const HeaderMok = ({ title }: IHeaderProps) => {
  return (
    <section className="w-full mx-auto flex flex-row items-center px-6 py-4 justify-between">
      <h1 className="text-2xl font-bold items-center justify-start">{title}</h1>
      <div className="flex flex-row items-center gap-4 justify-end">
   
      </div>
    </section>
  );
};

export default HeaderMok;
