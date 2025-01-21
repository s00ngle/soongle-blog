const TextExperience = ({
  title = "Default Title",
  description = "Default Description",
}: {
  title: string;
  description: string;
}) => (
  <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out transform">
    <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
    <p className="text-lg text-white opacity-80">{description}</p>
  </div>
);

const VideoGalleryExperience = ({
  youtubeLinks,
  description,
}: {
  youtubeLinks: string[];
  description: string;
}) => (
  <div className="bg-white shadow-xl rounded-xl p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
    <div className="grid grid-cols-1 gap-4 mb-4">
      {youtubeLinks.map((link, index) => (
        <div
          key={index}
          className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg"
        >
          <iframe
            src={`https://www.youtube.com/embed/${new URL(
              link
            ).searchParams.get("v")}`}
            title={`Experience Video ${index + 1}`}
            frameBorder="0"
            className="w-full h-full rounded-xl"
            allowFullScreen
          />
        </div>
      ))}
    </div>
    <p className="text-lg text-gray-700">{description}</p>
  </div>
);

const ImageGalleryExperience = ({
  images,
  description,
}: {
  images: string[];
  description: string;
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
    <div className="overflow-x-auto whitespace-nowrap mb-4">
      <div className="inline-block">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Experience ${index + 1}`}
            className={`w-80 h-auto rounded-xl shadow-lg object-cover inline-block ${
              index !== images.length - 1 ? "mr-4" : ""
            }`}
          />
        ))}
      </div>
    </div>
    <p className="text-lg text-gray-700">{description}</p>
  </div>
);

const FullGalleryExperience = ({
  images,
  youtubeLinks,
  description,
}: {
  images: string[];
  youtubeLinks: string[];
  description: string;
}) => (
  <div className="bg-white shadow-xl rounded-xl p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
    <div className="flex flex-col mb-4">
      <div className="w-full">
        <div className="overflow-x-auto whitespace-nowrap">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Experience Image ${index + 1}`}
              className={`w-80 h-auto rounded-xl shadow-lg object-cover inline-block ${
                index !== images.length - 1 ? "mr-4" : ""
              }`}
            />
          ))}
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-1 gap-4 mb-4">
          {youtubeLinks.map((link, index) => (
            <div
              key={index}
              className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg"
            >
              <iframe
                src={`https://www.youtube.com/embed/${new URL(
                  link
                ).searchParams.get("v")}`}
                title={`Experience Video ${index + 1}`}
                frameBorder="0"
                className="w-full h-full rounded-xl"
                allowFullScreen
              />
            </div>
          ))}
        </div>
        <p className="text-lg text-gray-700">{description}</p>
      </div>
    </div>
  </div>
);

const portfolioItems = [
  {
    type: "text",
    title: "촬영 감독 경력",
    description: "이력에 대한 설명이 들어갑니다.",
  },
  {
    type: "image",
    images: ["portfolio.png", "portfolio.png", "portfolio.png"],
    description: "여러 장의 사진과 설명이 포함된 이력입니다.",
  },
  {
    type: "video",
    youtubeLinks: ["https://www.youtube.com/watch?v=7s_pe9AdPUU"],
    description: "동영상과 설명이 포함된 이력입니다.",
  },
  {
    type: "full",
    images: ["portfolio.png", "portfolio.png"],
    youtubeLinks: [
      "https://www.youtube.com/watch?v=7s_pe9AdPUU",
      "https://www.youtube.com/watch?v=7s_pe9AdPUU",
    ],
    description: "사진, 동영상, 설명이 모두 포함된 이력입니다.",
  },
];

const PortfolioPage = () => (
  <div className="container mx-auto p-6 w-96">
    <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center text-gradient bg-clip-text">
      내 포트폴리오
    </h1>
    <div className="grid grid-cols-1 gap-8">
      {portfolioItems.map((item, index) => (
        <div key={index} className="flex flex-col">
          {item.type === "text" && (
            <TextExperience
              title={item.title ?? "Default Title"}
              description={item.description ?? "Default Description"}
            />
          )}
          {item.type === "image" && (
            <ImageGalleryExperience
              images={item.images ?? []}
              description={item.description}
            />
          )}
          {item.type === "video" && (
            <VideoGalleryExperience
              youtubeLinks={item.youtubeLinks ?? []}
              description={item.description}
            />
          )}
          {item.type === "full" && (
            <FullGalleryExperience
              images={item.images ?? []}
              youtubeLinks={item.youtubeLinks ?? []}
              description={item.description}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default PortfolioPage;
