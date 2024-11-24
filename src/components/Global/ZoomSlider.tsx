import { useImageCropContext } from "@/app/providers/imageCropContext";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import classNames from "classnames";

const ZoomSlider = ({ className }: { className?: string }) => {
  const {
    zoom,
    setZoom,
    handleZoomIn,
    handleZoomOut,
    max_zoom,
    min_zoom,
    zoom_step,
  } = useImageCropContext();

  return (
    <div
      className={classNames(
        className,
        "flex items-center justify-center gap-2"
      )}
    >
      <button onClick={handleZoomOut}>
        <MinusIcon />
      </button>
      <input
        type="range"
        min={min_zoom}
        max={max_zoom}
        step={zoom_step}
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
      />
      <button onClick={handleZoomIn}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default ZoomSlider;
