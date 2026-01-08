import type { Meta, StoryObj } from "@storybook/react";
import { Spiner } from "./Component";

const meta: Meta<typeof Spiner> = {
  title: "Components/Spiner",
  component: Spiner,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 - 전체 화면 오버레이와 스피너
export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="relative w-full h-screen bg-gray-100">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">콘텐츠 영역</h1>
          <p className="text-gray-600 mb-4">
            이 영역은 Spiner가 표시될 때 딤 처리됩니다.
          </p>
          <div className="bg-white p-4 rounded-lg shadow">
            <p>스피너가 화면 중앙에 표시됩니다.</p>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
};

// 긴 콘텐츠가 있는 경우
export const WithLongContent: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="relative w-full h-screen bg-gray-100 overflow-auto">
        <div className="p-8 space-y-4">
          <h1 className="text-2xl font-bold">긴 콘텐츠 예제</h1>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold mb-2">섹션 {i + 1}</h2>
              <p className="text-gray-600">
                이것은 스크롤 가능한 긴 콘텐츠입니다. Spiner는 화면을 고정하고
                중앙에 표시됩니다.
              </p>
            </div>
          ))}
        </div>
        <Story />
      </div>
    ),
  ],
};

// 다크 배경 위에서
export const OnDarkBackground: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="relative w-full h-screen bg-gray-900 text-white">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">다크 배경 예제</h1>
          <p className="text-gray-300 mb-4">
            다크 배경 위에서도 Spiner가 잘 보입니다.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p>스피너와 텍스트가 흰색으로 표시됩니다.</p>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
};
