import DevotionalFavorite from "@/components/Devotionals/DevotionalFavorite";

const DevotionalTools = ({ devotional }: { devotional: Devotional }) => {
  return (
    <div>
      <DevotionalFavorite
        isFavorite={devotional?.isFavorite}
        doc_id={devotional?.doc_id}
      />
    </div>
  );
};

export default DevotionalTools;
