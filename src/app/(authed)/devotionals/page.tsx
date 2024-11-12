"use client";

import React, { useMemo, useState } from "react";

import DevotionalCard from "@/components/Devotionals/DevotionalCard";
import { useUserStore } from "@/app/providers/userContext";
import Pagination from "@/components/Global/Pagination";
import Button from "@/components/Global/Button";
import { fetchDevotionals, generateDevotional } from "@/lib/app/actions";
import LoadingScreen from "@/components/Global/LoadingScreen";
import Image from "next/image";
import Dropdown from "@/components/Global/CustomSelect";
import DevotionalGenerateModal from "@/components/Devotionals/DevotionalGenerateModal";

const pageSize = 7;

const Devotionals: React.FC = () => {
  const { devotionals, updateDevotionals, isLoading } = useUserStore(
    (state) => state
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState("All");

  const currentDevotionalData = useMemo(() => {
    const firstPageIdx = (currentPage - 1) * pageSize;
    const lastPageIdx = firstPageIdx + pageSize;
    let filterDevotionals = devotionals;
    if (currentView !== "All") {
      if (currentView === "Favorite")
        filterDevotionals = devotionals.filter(
          (devotional) => devotional.isFavorite
        );
      else
        filterDevotionals = devotionals.filter(
          (devotional) => !devotional.isFavorite
        );
    }
    return filterDevotionals.slice(firstPageIdx, lastPageIdx);
  }, [currentPage, devotionals, currentView]);

  const handleGenerateDevotionals = async () => {
    setLoading(true);
    await generateDevotional();

    const refetchDevotionals = await fetchDevotionals();
    if (refetchDevotionals.success) updateDevotionals(refetchDevotionals.value);

    setLoading(false);
  };

  return (
    <div className="mx-4 max-w-[1200px] md:mx-auto flex flex-col space-y-5 px-2 md:px-8">
      {isLoading ? (
        <LoadingScreen message="Loading Your Devotionals" size="sm" />
      ) : (
        <>
          <div className="flex justify-between mb-8 flex-col lg:flex-row">
            <h1 className="mb-8">Daily Devotionals</h1>

            <div className="flex gap-5 flex-wrap items-center">
              <Dropdown
                id="select-devotionals-view"
                title="View"
                data={[
                  {
                    value: "All",
                    label: "All",
                  },
                  { value: "Favorite", label: "Favorite" },
                  { value: "Unfavorite", label: "Unfavorite" },
                ]}
                selectedId={currentView}
                onSelect={setCurrentView}
              />
              <DevotionalGenerateModal />
            </div>
          </div>

          {loading && (
            <LoadingScreen message="Generating Devotional" size="sm" />
          )}

          {devotionals.length === 0 ? (
            <DevotionalCard showNone={true} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {currentDevotionalData.map((devotional, index) => (
                <DevotionalCard
                  devotional={devotional}
                  key={`devotional-${index}`}
                  index={index}
                />
              ))}

              <Pagination
                currentPage={currentPage}
                totalCount={devotionals.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Devotionals;
