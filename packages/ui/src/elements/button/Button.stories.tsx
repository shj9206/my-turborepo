import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "@storybook/test";

import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "Elements/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "text"],
      description: "버튼 스타일 변형",
    },
    label: {
      control: "text",
      description: "버튼 텍스트",
    },
    leftIcon: {
      control: false,
      description: "왼쪽 아이콘",
    },
    rightIcon: {
      control: false,
      description: "오른쪽 아이콘",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
  },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    label: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    label: "Button",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    label: "Button",
  },
};

export const WithLeftIcon: Story = {
  args: {
    variant: "default",
    label: "Button",
    leftIcon: <span>←</span>,
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: "default",
    label: "Button",
    rightIcon: <span>→</span>,
  },
};

export const WithBothIcons: Story = {
  args: {
    variant: "default",
    label: "Button",
    leftIcon: <span>←</span>,
    rightIcon: <span>→</span>,
  },
};

export const LongText: Story = {
  args: {
    variant: "default",
    label: "This is a long button text",
  },
};

export const CustomStyle: Story = {
  args: {
    variant: "default",
    label: "Custom",
    className: "bg-red-600 hover:bg-red-700",
  },
};
