import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { PageNation } from "./Component";

const meta: Meta<typeof PageNation> = {
  title: "Components/PageNation",
  component: PageNation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    totalPages: {
      control: { type: "number", min: 1, max: 100 },
      description: "전체 페이지 수",
    },
    currentPage: {
      control: { type: "number", min: 1 },
      description: "현재 페이지 번호",
    },
    onPageChange: {
      action: "page changed",
      description: "페이지 변경 시 호출되는 콜백 함수",
    },
  },
  args: {
    onPageChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 - 적은 페이지 수
export const Default: Story = {
  args: {
    totalPages: 5,
    currentPage: 1,
  },
};

// 많은 페이지 - 생략 표시
export const ManyPages: Story = {
  args: {
    totalPages: 20,
    currentPage: 10,
  },
};

// 첫 페이지
export const FirstPage: Story = {
  args: {
    totalPages: 15,
    currentPage: 1,
  },
};

// 중간 페이지
export const MiddlePage: Story = {
  args: {
    totalPages: 15,
    currentPage: 8,
  },
};

// 마지막 페이지
export const LastPage: Story = {
  args: {
    totalPages: 15,
    currentPage: 15,
  },
};

// 페이지 1개 (렌더링 안 됨)
export const SinglePage: Story = {
  args: {
    totalPages: 1,
    currentPage: 1,
  },
};

// 매우 많은 페이지
export const VeryManyPages: Story = {
  args: {
    totalPages: 100,
    currentPage: 50,
  },
};
