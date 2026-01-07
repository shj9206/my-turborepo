import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Select } from "./index";

const meta: Meta<typeof Select> = {
  title: "Elements/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
      description: "선택 옵션 목록",
    },
    value: {
      control: "text",
      description: "현재 선택된 값",
    },
    onChange: {
      control: false,
      description: "값 변경 핸들러",
    },
  },
  args: { onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: "option1", label: "옵션 1" },
  { value: "option2", label: "옵션 2" },
  { value: "option3", label: "옵션 3" },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    value: "option1",
    onChange: fn(),
  },
};

export const WithManyOptions: Story = {
  args: {
    options: [
      { value: "1", label: "첫 번째 옵션" },
      { value: "2", label: "두 번째 옵션" },
      { value: "3", label: "세 번째 옵션" },
      { value: "4", label: "네 번째 옵션" },
      { value: "5", label: "다섯 번째 옵션" },
      { value: "6", label: "여섯 번째 옵션" },
    ],
    value: "1",
    onChange: fn(),
  },
};

export const EmptyState: Story = {
  args: {
    options: [],
    value: "",
    onChange: fn(),
  },
};
