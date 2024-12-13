"use client";
import { useUserStore } from "@/app/providers/userContext";
import DevotionalFull from "@/components/Devotionals/DevotionalFull";
import Button from "@/components/Global/Button";
import TopBottomGradient from "@/components/Global/Gradients/TopBottomGradient";
import { AuthedPaths } from "@/lib/constants";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useMemo } from "react";

const SingleDevotional = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const { devotionals } = useUserStore((s) => s);

  const devotional = useMemo(() => {
    return devotionals.filter((devotional) => devotional.doc_id === slug);
  }, [devotionals, slug]);

  return (
    devotional &&
    devotional[0] && (
      <TopBottomGradient hasBottom={false} className="py-32">
        <div className="max-w-6xl mx-auto">
          <Link href={AuthedPaths.Devotionals}>
            <Button
              standardBtn={"text"}
              hasIcon={true}
              className="text-inactive dark:text-inactive-dark ml-4 mb-8"
            >
              <ChevronLeftIcon /> All Devotionals
            </Button>
          </Link>
          <DevotionalFull devotional={devotional[0]} />
        </div>
      </TopBottomGradient>
    )
  );
};

export default SingleDevotional;
