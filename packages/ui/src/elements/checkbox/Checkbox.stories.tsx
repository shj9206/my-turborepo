import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "@storybook/test";

import { Checkbox } from "./index";

const meta: Meta<typeof Checkbox> = {
  title: "Elements/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "체크박스 크기",
    },
    checked: {
      control: "boolean",
      description: "체크 상태",
    },
    icon: {
      control: "select",
      options: ["check", "star", "heart", "fill", "search", "close"],
      description: "체크 시 표시할 아이콘",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
  },
  args: { onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    size: "medium",
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    size: "medium",
  },
};

export const Small: Story = {
  args: {
    checked: true,
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    checked: true,
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    checked: true,
    size: "large",
  },
};

export const WithLabel: Story = {
  args: {
    checked: false,
    size: "medium",
    className: "gap-3",
  },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Checkbox {...args} />
      <span className="text-sm text-gray-700">체크박스 라벨</span>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    checked: true,
    size: "medium",
    className: "opacity-50 cursor-not-allowed",
  },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Checkbox {...args} />
      <span className="text-sm text-gray-500">비활성화된 체크박스</span>
    </div>
  ),
};

export const WithStarIcon: Story = {
  args: {
    checked: true,
    size: "medium",
    icon: "star",
  },
};

export const WithHeartIcon: Story = {
  args: {
    checked: true,
    size: "medium",
    icon: "heart",
  },
};

export const CustomStyle: Story = {
  args: {
    checked: true,
    size: "medium",
    className: "border-2 border-red-500",
  },
};
