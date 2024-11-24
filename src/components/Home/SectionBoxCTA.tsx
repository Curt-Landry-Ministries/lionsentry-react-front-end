"use client";
import Image from "next/image";
import type { CTAContentImageType } from "./CTAContentImage";
import useWindowSize from "@/lib/hooks/useWindowSize";
import { MaxWindowSize } from "@/lib/constants";
import Button from "../Global/Button";
import Link from "next/link";
import CenterGradient from "../Global/Gradients/CenterGradient";

const SectionBoxCTA: React.FC<CTAContentImageType> = ({
  title,
  content,
  image,
  buttonText,
  buttonLink,
}) => {
  const windowSize = useWindowSize();
  return (
    <CenterGradient>
      <div className="py-24 md:py-36 text-black dark:text-white">
        <div className="bg-white dark:bg-black md:max-w-[70vw] flex overflow-hidden items-center gap-10 p-5 md:p-10 rounded-3xl flex-wrap md:flex-nowrap mx-5">
          <div className="w-full md:w-2/3">
            <h1 className="mb-4">{title}</h1>
            <div
              className="[&>p]:mb-5"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {windowSize.width < MaxWindowSize.Mobile ? (
              <Image
                className="mt-4 w-full h-auto rounded-3xl"
                src={image}
                alt={`${title} image`}
                width={0}
                height={0}
                sizes="100vw"
              />
            ) : (
              ""
            )}

            {!!buttonText && !!buttonLink ? (
              <Button className="block mt-8" standardBtn={"primary"}>
                <Link href={buttonLink}>{buttonText}</Link>
              </Button>
            ) : (
              ""
            )}
          </div>

          {windowSize.width > MaxWindowSize.Mobile ? (
            <div className="w-full md:w-1/3">
              <Image
                className="w-full h-auto rounded-3xl"
                src={image}
                alt={`${title} image`}
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </CenterGradient>
  );
};

export default SectionBoxCTA;
