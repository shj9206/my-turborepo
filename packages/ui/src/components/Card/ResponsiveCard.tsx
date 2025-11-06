export interface IResponsiveCardProps {
  imageUrl: string; // 이미지 URL
  title: string; // 제목
  subTitle?: string; // 부제목
  description: string; // 설명
  link?: string; // 링크
}

export const ResponsiveCard = ({
  imageUrl,
  title,
  subTitle,
  description,
  link,
}: IResponsiveCardProps) => {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-6xl h-[500px] md:h-80">
      <div className="md:flex h-full">
        <div className="md:shrink-0">
          <img
            className="h-64 w-full object-cover md:h-full md:w-48"
            src={imageUrl}
            alt={title}
          />
        </div>
        <div className="p-8 h-[436px] md:h-full overflow-hidden flex flex-col">
          <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase line-clamp-1 md:line-clamp-2 overflow-hidden">
            {title}
          </div>
          {link && (
            <a
              href={link}
              className="mt-1 text-lg tracking-wide font-medium text-black hover:underline line-clamp-1 md:line-clamp-2 overflow-hidden"
            >
              {subTitle}
            </a>
          )}
          <p className="mt-2 text-gray-500 line-clamp-5 overflow-hidden">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
