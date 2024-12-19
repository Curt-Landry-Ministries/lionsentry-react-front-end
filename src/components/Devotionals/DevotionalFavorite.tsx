"use client";

import { useUserStore } from "@/app/providers/userContext";
import { fetchDevotionals, updateDevotional } from "@/lib/app/actions";
import { useEffect, useState } from "react";
import Heart from "../Global/Heart";

const DevotionalFavorite = ({
  isFavorite,
  doc_id,
}: {
  isFavorite: boolean | undefined;
  doc_id: string | undefined;
}) => {
  const { updateDevotionals } = useUserStore((s) => s);

  const [favorite, setFavorite] = useState(false);

  const handleFavorite = async () => {
    setFavorite(!favorite);

    if (doc_id) {
      await updateDevotional({
        doc_id: doc_id,
        isFavorite: !isFavorite,
      });

      const refetchDevotionals = await fetchDevotionals();

      if (refetchDevotionals.success) {
        updateDevotionals(refetchDevotionals.value);
      }
    }
  };
  useEffect(() => setFavorite(!!isFavorite ? isFavorite : false), [isFavorite]);
  return (
    <button
      onClick={handleFavorite}
      className="rounded-full hover:bg-white hover:bg-opacity-10 hover:before:content-['Favorite'] hover:before:text-white hover:before:bg-black hover:before:py-1 hover:before:px-2 hover:before:rounded-sm hover:before:text-xs hover:before:absolute hover:before:-top-3/4 relative w-11 h-11 flex justify-center items-center"
    >
      <Heart isActive={favorite} />
    </button>
  );
};

export default DevotionalFavorite;
