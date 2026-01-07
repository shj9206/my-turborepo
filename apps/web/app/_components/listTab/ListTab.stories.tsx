import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ListTab } from "./index";
import { ViewProvider } from "@/app/_provider/viewProvider";
import React from "react";

const meta: Meta<typeof ListTab> = {
  title: "Components/ListTab",
  component: ListTab,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ViewProvider>
        <Story />
      </ViewProvider>
    ),
  ],
  argTypes: {
    tabList: {
      control: "object",
      description: "탭 리스트 배열",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabList = [
  {
    name: "통합검색",
    value: "All",
    onClick: fn(),
  },
  {
    name: "국내도서",
    value: "Book",
    onClick: fn(),
  },
  {
    name: "외국도서",
    value: "Foreign",
    onClick: fn(),
  },
  {
    name: "eBook",
    value: "eBook",
    onClick: fn(),
  },
];

export const Default: Story = {
  args: {
    tabList: defaultTabList,
  },
};

export const TwoTabs: Story = {
  args: {
    tabList: [
      {
        name: "통합검색",
        value: "All",
        onClick: fn(),
      },
      {
        name: "국내도서",
        value: "Book",
        onClick: fn(),
      },
    ],
  },
};

export const ThreeTabs: Story = {
  args: {
    tabList: [
      {
        name: "전체",
        value: "All",
        onClick: fn(),
      },
      {
        name: "진행중",
        value: "InProgress",
        onClick: fn(),
      },
      {
        name: "완료",
        value: "Completed",
        onClick: fn(),
      },
    ],
  },
};

