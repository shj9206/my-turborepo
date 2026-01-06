import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Radio } from "./index";

const meta: Meta<typeof Radio> = {
  title: "Elements/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "라디오 크기",
    },
    checked: {
      control: "boolean",
      description: "선택 상태",
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
    checked: false,
    size: "small",
  },
};

export const Large: Story = {
  args: {
    checked: false,
    size: "large",
  },
};

export const WithLabel: Story = {
  args: {
    checked: false,
    size: "medium",
  },
  render: (args: Story["args"]) => (
    <label className="inline-flex items-center gap-2">
      <Radio {...args} />
      <span className="text-sm text-gray-700">라디오 라벨</span>
    </label>
  ),
};
