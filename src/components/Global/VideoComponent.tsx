const VideoComponent = ({
  videoSrc,
  videoTitle,
  className,
}: {
  videoSrc: string;
  videoTitle?: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <iframe
        src={videoSrc}
        title={videoTitle}
        allowFullScreen
        scrolling="no"
      />
    </div>
  );
};

export default VideoComponent;
