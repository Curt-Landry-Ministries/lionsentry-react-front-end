"use client";
import Link from "next/link";
import Button from "../Global/Button";
import Image from "next/image";
import useWindowSize from "@/lib/hooks/useWindowSize";
import { MaxWindowSize } from "@/lib/constants";

export type CTAContentImageType = {
  title: string;
  content: string;
  image: string | any;
  buttonText?: string;
  buttonLink?: string;
};

const CTAContentImage: React.FC<CTAContentImageType> = ({
  title,
  content,
  image,
  buttonText,
  buttonLink,
}) => {
  const windowSize = useWindowSize();

  return (
    <div className="flex px-5 md:max-w-[90vw] lg:max-w-[75vw] mx-auto items-center gap-24 py-12 md:py-32 flex-wrap md:flex-nowrap">
      <div className="w-full md:w-1/2">
        <h1 className="mb-4">{title}</h1>
        <div
          className="[&>p]:mb-5"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {windowSize.width < MaxWindowSize.Mobile ? (
          <Image
            className="pb-6 w-full h-auto rounded-full"
            src={image}
            alt={`${title} image`}
            width={0}
            height={0}
            sizes="100vw"
            unoptimized={true}
          />
        ) : (
          ""
        )}

        {!!buttonText && !!buttonLink ? (
          <Button
            className="mx-auto md:ml-0 block mt-8"
            standardBtn={"primary"}
          >
            <Link href={buttonLink}>{buttonText}</Link>
          </Button>
        ) : (
          ""
        )}
      </div>

      {windowSize.width > MaxWindowSize.Mobile ? (
        <div className="w-full md:w-1/2">
          <Image
            className="w-full h-auto rounded-full"
            src={image}
            alt={`${title} image`}
            width={0}
            height={0}
            sizes="100vw"
            unoptimized={true}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CTAContentImage;
