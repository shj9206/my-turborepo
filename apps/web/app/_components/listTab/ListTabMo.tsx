import { IListTabProps } from "./interface";

export const ListTabMo = (props: IListTabProps) => {
  const { tabList } = props;
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-row gap-4">
        {tabList.map((tab) => (
          <button key={tab.value}>{tab.name}</button>
        ))}
      </div>
    </section>
  );
  return <div>ListTabMobile</div>;
};
