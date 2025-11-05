import type { Meta, StoryObj } from "@storybook/react";
import { BookCover } from "./Component";

const meta: Meta<typeof BookCover> = {
  title: "Components/BookCover",
  component: BookCover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    imageUrl:
      "https://image.aladin.co.kr/product/37597/64/coversum/k362032830_1.jpg",
    size: "md",
  },
  argTypes: {
    size: {
      control: { type: "inline-radio" },
      options: ["sm", "md"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BookCover>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: "sm",
  },
};
