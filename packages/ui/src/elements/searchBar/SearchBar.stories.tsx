import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchBar } from "./Component";
import type { ISearchBarProps } from "./interface";

const SearchBarWrapper = (args: Partial<ISearchBarProps>) => {
  const [value, setValue] = useState(args.value || "");
  return (
    <div className="w-96">
      <SearchBar
        {...args}
        value={value}
        onChange={setValue}
        onSearch={() => {
          console.log("Search:", value);
          alert(`검색어: ${value}`);
        }}
      />
    </div>
  );
};

const meta: Meta<typeof SearchBar> = {
  title: "Elements/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  render: SearchBarWrapper,
  args: {
    placeholder: "Search",
  },
};
