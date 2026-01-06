import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Toggle } from "./index";

const meta: Meta<typeof Toggle> = {
  title: "Elements/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "토글 상태",
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
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const WithCustomLabel: Story = {
  args: {
    checked: false,
  },
  render: (args: Story["args"]) => (
    <div className="flex items-center gap-3">
      <Toggle {...args} />
      <span className="text-sm text-gray-700">알림 받기</span>
    </div>
  ),
};

export const CheckedWithLabel: Story = {
  args: {
    checked: true,
  },
  render: (args: Story["args"]) => (
    <div className="flex items-center gap-3">
      <Toggle {...args} />
      <span className="text-sm text-gray-700">알림 활성화</span>
    </div>
  ),
};

export const CustomStyle: Story = {
  args: {
    checked: true,
    className: "opacity-75",
  },
  render: (args: Story["args"]) => (
    <div className="flex items-center gap-3">
      <Toggle {...args} />
      <span className="text-sm text-gray-700">커스텀 스타일</span>
    </div>
  ),
};
