import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tailwind 커스텀 컬러 데모",
  description: "Turborepo UI 패키지의 커스텀 Tailwind 컬러 데모",
};

export default function ColorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
