import { Play } from "lucide-react";
import { useState } from "react";

interface VideoPlayerProps {
  url: string;
  title: string;
}

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Detect YouTube URL
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  
  const getYouTubeEmbedUrl = (youtubeUrl: string) => {
    let videoId = "";
    if (youtubeUrl.includes("youtube.com")) {
      videoId = youtubeUrl.split("v=")[1]?.split("&")[0] || "";
    } else if (youtubeUrl.includes("youtu.be")) {
      videoId = youtubeUrl.split("youtu.be/")[1]?.split("?")[0] || "";
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (!url) return null;

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden relative aspect-video">
      {isYouTube ? (
        <iframe
          width="100%"
          height="100%"
          src={getYouTubeEmbedUrl(url)}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      ) : (
        <>
          {!isPlaying ? (
            <div
              onClick={() => setIsPlaying(true)}
              className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground cursor-pointer hover-elevate"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="p-4 bg-primary rounded-full">
                  <Play className="h-8 w-8 text-primary-foreground" />
                </div>
                <span className="text-white font-medium">{title}</span>
              </div>
            </div>
          ) : (
            <video
              controls
              autoPlay
              className="w-full h-full"
              onEnded={() => setIsPlaying(false)}
            >
              <source src={url} type="video/mp4" />
              مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند
            </video>
          )}
        </>
      )}
    </div>
  );
}
