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
    <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={imageUrl}
            alt={title}
          />
        </div>
        <div className="p-8">
          <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
            {title}
          </div>
          {link && (
            <a
              href={link}
              className="mt-1 block text-lg leading-tight font-medium text-black hover:underline"
            >
              {subTitle}
            </a>
          )}
          <p className="mt-2 text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};
