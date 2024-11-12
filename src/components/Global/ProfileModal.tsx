"use client";

import { useImageCropContext } from "@/app/providers/imageCropContext";
import Modal from "./Modal";
import { readFile } from "@/lib/helpers/cropImage";
import ImageCropper from "./ImageCropper";
import Button from "./Button";
import { useState } from "react";
import Image from "next/image";
import { useUserStore } from "@/app/providers/userContext";
import ProfilePhoto from "./ProflePhoto";
import { TrashIcon } from "@radix-ui/react-icons";
import ZoomSlider from "./ZoomSlider";
import { uploadProfilePhoto } from "@/lib/app/actions";

const ProfileModal = ({
  isOpen,
  updateOpen,
}: {
  isOpen: boolean;
  updateOpen: (state: boolean) => void;
}) => {
  const { profile_photo, name, updateProfilePhoto } = useUserStore((s) => s);
  const { getProcessedImage, setImage, resetStates } = useImageCropContext();

  const [triggerChooser, setTriggerChoose] = useState(false);
  const [preview, setPreview] = useState(profile_photo);

  const handleFileChange = async ({ target: { files } }: any) => {
    const file = files && files[0];
    const imageDataUrl = await readFile(file);
    setImage(imageDataUrl);
  };

  const handleDone = async () => {
    const avatar = await getProcessedImage();
    setPreview(window.URL.createObjectURL(avatar));

    const formData = new FormData();
    formData.append("photo", avatar);

    const resp = await uploadProfilePhoto(formData);

    if (resp.success) updateProfilePhoto(resp.value.photo_url);

    setTriggerChoose(false);
    resetStates();
  };

  const handleCancel = () => {
    resetStates();
    updateOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => updateOpen(false)}>
      <div className="text-center relative flex flex-col items-center min-w-[700px]">
        <h3 className="mb-12">Profile Picture</h3>

        {triggerChooser ? (
          <div className="mx-auto w-60 h-60 rounded-full relative [&_.reactEasyCrop\_CropArea]:!text-white [&_.reactEasyCrop\_CropArea]:border-inactive [&_.reactEasyCrop\_CropArea]:border-1 [&_.reactEasyCrop\_CropArea]:!bg-opacity-0.8">
            <ImageCropper />
          </div>
        ) : (
          <ProfilePhoto src={preview} name={name} />
        )}

        {preview}
        <Button
          className="text-sm text-primary"
          onClick={() => setTriggerChoose(true)}
          standardBtn={"text"}
          hasIcon={true}
        >
          <Image
            src="/icons/edit-icon.svg"
            width={24}
            height={24}
            alt="Edit Icon"
          />
          <label htmlFor="avatarInput">Choose Photo</label>
        </Button>

        <ZoomSlider />

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="avatarInput"
          accept="image/*"
        />

        <div className="gap-3 flex mt-12 w-full justify-between">
          <Button standardBtn={"tertiary"} onClick={handleCancel}>
            Cancel
          </Button>

          <Button
            standardBtn={"primary"}
            onClick={handleDone}
            className="ml-auto"
          >
            Save Photo
          </Button>

          <Button standardBtn={"text"} hasIcon className="text-primary">
            <TrashIcon width={24} height={24} /> Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
