"use client";
import { useUserStore } from "@/app/providers/userContext";
import DevotionalFull from "@/components/Devotionals/DevotionalFull";
import AlertBanner from "@/components/Global/AlertBanner";
import Button from "@/components/Global/Button";
import GoalCompleteModal from "@/components/Goals/GoalCompleteModal";
import GoalEditModal from "@/components/Goals/GoalEditModal";
import GoalTag from "@/components/Goals/GoalTag";
import { AuthedPaths, GoalTypeAsset } from "@/lib/constants";
import { formatDate } from "@/lib/utils-global";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const SingleDevotional = ({ params }: { params: { slug: string } }) => {
  const { devotionals } = useUserStore((s) => s);

  const devotional = useMemo(() => {
    return devotionals.filter(
      (_, index) => index === parseInt(params.slug.replace("devotional-", ""))
    );
  }, [devotionals, params.slug]);

  return (
    devotional &&
    devotional[0] && (
      <div className="container-xl">
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
    )
  );
};

export default SingleDevotional;
