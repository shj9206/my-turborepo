import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./index";

const meta: Meta<typeof Badge> = {
  title: "Elements/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["number", "icon", "empty"],
      description: "Badge 타입",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
    children: {
      control: "text",
      description: "Badge 내용 (number, icon 타입에만 표시)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Number: Story = {
  args: {
    type: "number",
    children: "5",
  },
};

export const NumberWithTwoDigits: Story = {
  args: {
    type: "number",
    children: "99",
  },
};

export const Icon: Story = {
  args: {
    type: "icon",
    children: "★",
  },
};

export const Empty: Story = {
  args: {
    type: "empty",
    children: "",
  },
};

export const CustomColor: Story = {
  args: {
    type: "number",
    children: "3",
    className: "bg-red-600",
  },
};

export const CustomSize: Story = {
  args: {
    type: "number",
    children: "7",
    className: "w-8 h-8",
  },
};
