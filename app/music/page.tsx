"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import PageContainer from "@/components/PageContainer";

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

interface YouTubeResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
}

interface CacheData {
  videos: YouTubeVideo[];
  pageToken?: string;
  timestamp: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000;
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

const VideoGallery = ({
  videos,
  isLoading,
  error,
  lastElementRef,
}: {
  videos: YouTubeVideo[];
  isLoading: boolean;
  error: string | null;
  lastElementRef: (node: HTMLDivElement) => void;
}) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((prev) =>
        prev < videos.length ? prev + BATCH_SIZE : prev
      );
    }, 100);

    return () => clearInterval(timer);
  }, [videos.length]);

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-xl">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.slice(0, visibleCount).map((video, index) => (
          <div
            key={video.id.videoId}
            ref={index === videos.length - 1 ? lastElementRef : null}
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
    </div>
  );
};

export default function MusicPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const isFirstLoad = useRef(true);

  const fetchYouTubeVideos = async (token?: string) => {
    try {
      const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      const CHANNEL_ID = "UCxVhRBjFWLhqg9plVFrt2yA";

      const pageTokenParam = token ? `&pageToken=${token}` : "";
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=12&type=video${pageTokenParam}`
      );

      if (!response.ok) {
        throw new Error("YouTube API 요청에 실패했습니다");
      }

      const data: YouTubeResponse = await response.json();

      if (isFirstLoad.current) {
        setVideos(data.items);
        isFirstLoad.current = false;
      } else {
        setVideos((prev) => [...prev, ...data.items]);
      }

      setPageToken(data.nextPageToken);
      setHasMore(!!data.nextPageToken);

      const cacheData: CacheData = {
        videos: [...videos, ...data.items],
        pageToken: data.nextPageToken,
        timestamp: Date.now(),
      };
      localStorage.setItem("videoCache", JSON.stringify(cacheData));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "동영상을 불러오는데 실패했습니다"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadCachedData = () => {
      const cachedData = localStorage.getItem("videoCache");
      if (cachedData) {
        const { videos, pageToken, timestamp }: CacheData =
          JSON.parse(cachedData);

        if (Date.now() - timestamp < CACHE_DURATION) {
          setVideos(videos);
          setPageToken(pageToken);
          setIsLoading(false);
          setHasMore(!!pageToken);
          isFirstLoad.current = false;
          return true;
        }
      }
      return false;
    };

    if (!loadCachedData()) {
      fetchYouTubeVideos();
    }
  }, []);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastVideoElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setIsLoading(true);
          fetchYouTubeVideos(pageToken);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore, pageToken]
  );

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="my-6 text-center text-3xl font-bold">Music Gallery</h1>

        <VideoGallery
          videos={videos}
          isLoading={isLoading}
          error={error}
          lastElementRef={lastVideoElementRef}
        />
      </div>
    </PageContainer>
  );
}
