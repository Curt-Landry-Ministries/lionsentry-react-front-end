import { useUserStore } from "@/app/providers/userContext";
import { fetchDevotionals, updateDevotional } from "@/lib/app/actions";
import { useEffect, useState } from "react";
import Heart from "../Global/Heart";
import classNames from "classnames";

const DevotionalFavorite = ({
  isFavorite,
  doc_id,
  isCard = false,
}: {
  isFavorite: boolean | undefined;
  doc_id: string | undefined;
  isCard?: boolean;
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
      className={classNames({
        "absolute top-3 right-3": isCard,
      })}
      onClick={handleFavorite}
    >
      <Heart isActive={favorite} />
    </button>
  );
};

export default DevotionalFavorite;
