"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import PageContainer from "@/components/PageContainer";
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    publishedAt: string;
  };
}

// interface YouTubeResponse {
//   items: YouTubeVideo[];
//   nextPageToken?: string;
// }

const INITIAL_LOAD_COUNT = 6;
const BATCH_SIZE = 4; // 한 번에 렌더링할 비디오 수

// 스켈레톤 컴포넌트
const SkeletonCard = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg">
    <div className="aspect-w-16 aspect-h-9 bg-gray-200 animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
      </div>
      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/4" />
    </div>
  </div>
);

const VideoCard = ({
  video,
  lazyLoad = true,
}: {
  video: YouTubeVideo;
  lazyLoad?: boolean;
}) => {
  const [isIntersecting, setIsIntersecting] = useState(!lazyLoad);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazyLoad || !iframeRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    observer.observe(iframeRef.current);
    return () => observer.disconnect();
  }, [lazyLoad]);

  useEffect(() => {
    if (!video.snippet.thumbnails.high.url) return;

    const img = new Image();
    img.src = video.snippet.thumbnails.high.url;
    img.onload = () => setIsImageLoaded(true);
  }, [video.snippet.thumbnails.high.url]);

  const decodeHtmlEntities = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <div ref={iframeRef} className="aspect-w-16 aspect-h-9">
        {!isImageLoaded ? (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : isIntersecting ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id.videoId}?modestbranding=1&rel=0&controls=1&showinfo=0`}
            title={decodeHtmlEntities(video.snippet.title)}
            className="w-full h-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="w-full h-full bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${video.snippet.thumbnails.high.url})`,
            }}
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold line-clamp-2 mb-2">
          {decodeHtmlEntities(video.snippet.title)}
        </h3>
        {video.snippet.description && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-2">
            {decodeHtmlEntities(video.snippet.description)}
          </p>
        )}
        <p className="text-gray-500 text-xs">
          {new Date(video.snippet.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

// YouTube API 호출 함수
const fetchYouTubeVideos = async ({ pageParam = undefined }) => {
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const CHANNEL_ID = "UCxVhRBjFWLhqg9plVFrt2yA";

  const pageTokenParam = pageParam ? `&pageToken=${pageParam}` : "";
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=12&type=video${pageTokenParam}`
  );

  if (!response.ok) {
    throw new Error("YouTube API 요청에 실패했습니다");
  }

  const data = await response.json();
  console.log("API 응답:", data); // 응답 로깅
  return data;
};

const LoadingIndicator = () => (
  <div className="col-span-full flex justify-center items-center py-6">
    <div className="flex space-x-2 justify-center items-center">
      <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
      <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
    </div>
  </div>
);

const InfiniteScrollTrigger = ({ onVisible }: { onVisible: () => void }) => {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onVisible();
        }
      },
      { rootMargin: "200px" }
    );

    const currentElement = triggerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [onVisible]);

  return <div ref={triggerRef} className="h-10 w-full" />;
};

const VideoGallery = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);

  // TanStack Query를 사용한 무한 스크롤 데이터 패칭
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["youtubeVideos"],
    queryFn: fetchYouTubeVideos,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    initialPageParam: undefined,
    staleTime: 24 * 60 * 60 * 1000, // 24시간 동안 캐시 유지
  });

  // 모든 페이지의 영상을 평면화
  const allVideos = data?.pages.flatMap((page) => page.items) || [];

  // visibleCount 업데이트를 위한 useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((prev) =>
        prev < allVideos.length ? prev + BATCH_SIZE : prev
      );
    }, 100);

    return () => clearInterval(timer);
  }, [allVideos.length]);

  // 디버깅을 위한 로그
  useEffect(() => {
    console.log("Total videos:", allVideos.length);
    console.log("Pages loaded:", data?.pages.length);
    console.log("Has next page:", hasNextPage);
  }, [allVideos.length, data?.pages.length, hasNextPage]);

  const handleLoadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      console.log("Loading next page...");
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isError) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-xl">
        <p>
          {error instanceof Error
            ? error.message
            : "동영상을 불러오는데 실패했습니다"}
        </p>
      </div>
    );
  }

  const visibleVideos = allVideos.slice(0, visibleCount);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleVideos.map((video, index) => (
          <div
            key={video.id.videoId}
            className="transform transition-opacity duration-500 opacity-100"
          >
            <VideoCard video={video} lazyLoad={index >= INITIAL_LOAD_COUNT} />
          </div>
        ))}

        {isLoading &&
          [...Array(3)].map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="transform transition-opacity duration-500 opacity-100"
            >
              <SkeletonCard />
            </div>
          ))}
      </div>

      {/* 무한 스크롤 트리거 */}
      {visibleCount >= allVideos.length && hasNextPage && (
        <InfiniteScrollTrigger onVisible={handleLoadMore} />
      )}

      {/* 로딩 인디케이터 */}
      {isFetchingNextPage && <LoadingIndicator />}

      {/* 더 이상 로드할 데이터가 없음을 표시 */}
      {!hasNextPage && allVideos.length > 0 && (
        <p className="text-center text-gray-500 py-4">
          모든 동영상을 불러왔습니다.
        </p>
      )}
    </div>
  );
};

// QueryClient 생성 및 기본 옵션 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function MusicPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageContainer>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <h1 className="my-6 text-center text-3xl font-bold">Music Gallery</h1>
          <VideoGallery />
        </div>
      </PageContainer>
    </QueryClientProvider>
  );
}
