export interface IListTabProps {
  tabList: { name: string; value: string; onClick: () => void }[];
  tagetString: string;
}

export interface IListTabComponentProps {
  tabList: IListTabProps["tabList"];
  handleTabClick: (value: string) => void;
  activeTab: string;
}
