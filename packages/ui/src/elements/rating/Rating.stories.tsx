import type { Meta, StoryObj } from "@storybook/react";

import { Rating } from "./index";

const meta: Meta<typeof Rating> = {
  title: "Elements/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: { type: "number", min: 1, max: 5, step: 1 },
      description: "별점 개수",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 5,
  },
};

export const ThreeStars: Story = {
  args: {
    count: 3,
  },
};

export const FiveStars: Story = {
  args: {
    count: 5,
  },
};
