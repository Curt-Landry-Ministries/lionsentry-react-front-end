import { createContext, useCallback, useContext, useState } from "react";
import getCroppedImg from "@/lib/helpers/cropImage";

export const ImageCropContext = createContext({
  image: null,
  setImage: (image: any) => {},
  zoom: 0,
  setZoom: (zoom: number) => {},
  crop: { x: 0, y: 0 },
  setCrop: ({ x, y }: { x: number; y: number }) => {},
  croppedAreaPixels: null,
  setCroppedAreaPixels: (area: any) => {},
  onCropComplete: (_croppedArea: any, croppedAreaPixels: any) => {},
  getProcessedImage: (): any => {},
  handleZoomIn: () => {},
  handleZoomOut: () => {},
  max_zoom: 0,
  min_zoom: 0,
  zoom_step: 0,
  max_rotation: 0,
  min_rotation: 0,
  rotation_step: 0,
  resetStates: () => {},
});

type ImageCropProviderType = {
  children: React.ReactNode;
  max_zoom?: number;
  min_zoom?: number;
  zoom_step?: number;
  max_rotation?: number;
  min_rotation?: number;
  rotation_step?: number;
};

const defaultImage = null;
const defaultCrop = { x: 0, y: 0 };
const defaultZoom = 1.5;
const defaultCroppedAreaPixels = null;

const ImageCropProvider = ({
  children,
  max_zoom = 3,
  min_zoom = 1,
  zoom_step = 0.1,
  max_rotation = 360,
  min_rotation = 0,
  rotation_step = 5,
}: ImageCropProviderType) => {
  const [image, setImage] = useState(defaultImage);
  const [crop, setCrop] = useState(defaultCrop);
  const [zoom, setZoom] = useState(defaultZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(
    defaultCroppedAreaPixels
  );

  const onCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleZoomIn = () => {
    if (zoom < max_zoom) {
      setZoom(zoom + zoom_step * 2);
    }
  };

  const handleZoomOut = () => {
    if (zoom > min_zoom) {
      setZoom(zoom - zoom_step * 2);
    }
  };

  const getProcessedImage = async () => {
    if (image && croppedAreaPixels) {
      const croppedImage: any = await getCroppedImg(image, croppedAreaPixels);
      const imageFile = new File([croppedImage.file], `img-${Date.now()}.png`, {
        type: "image/png",
      });
      return imageFile;
    }
  };

  const resetStates = () => {
    setImage(defaultImage);
    setCrop(defaultCrop);
    setZoom(defaultZoom);
    setCroppedAreaPixels(defaultCroppedAreaPixels);
  };

  return (
    <ImageCropContext.Provider
      value={{
        image,
        setImage,
        zoom,
        setZoom,
        crop,
        setCrop,
        croppedAreaPixels,
        setCroppedAreaPixels,
        onCropComplete,
        getProcessedImage,
        handleZoomIn,
        handleZoomOut,
        max_zoom,
        min_zoom,
        zoom_step,
        max_rotation,
        min_rotation,
        rotation_step,
        resetStates,
      }}
    >
      {children}
    </ImageCropContext.Provider>
  );
};

export const useImageCropContext = () => useContext(ImageCropContext);

export default ImageCropProvider;
