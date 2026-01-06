import type { Meta, StoryObj } from "@storybook/react";
import { ResponsiveCard } from "./ResponsiveCard";

const meta: Meta<typeof ResponsiveCard> = {
  title: "Components/Card/ResponsiveCard",
  component: ResponsiveCard,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResponsiveCard>;

export const Default: Story = {
  args: {
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    title: "Company retreats",
    subTitle: "Incredible accommodation for your team",
    description:
      "Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.",
    link: "https://www.google.com",
  },
};
