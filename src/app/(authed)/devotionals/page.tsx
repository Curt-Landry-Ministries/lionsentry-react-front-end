"use client";

import React, { useEffect, useMemo, useState } from "react";

import DevotionalCard from "@/components/Devotionals/DevotionalCard";
import { useUserStore } from "@/app/providers/userContext";
import Pagination from "@/components/Global/Pagination";
import Button from "@/components/Global/Button";
import { fetchDevotionals, generateDevotional } from "@/lib/app/actions";
import LoadingScreen from "@/components/Global/LoadingScreen";

const pageSize = 7;

const Devotionals: React.FC = () => {
  const { devotionals, updateDevotionals, isLoading } = useUserStore(
    (state) => state
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const currentDevotionalData = useMemo(() => {
    const firstPageIdx = (currentPage - 1) * pageSize;
    const lastPageIdx = firstPageIdx + pageSize;
    return devotionals.slice(firstPageIdx, lastPageIdx);
  }, [currentPage, devotionals]);

  const handleGenerateDevotionals = async () => {
    setLoading(true);
    await generateDevotional();

    const refetchDevotionals = await fetchDevotionals();

    updateDevotionals(refetchDevotionals);
    setLoading(false);
  };

  return (
    <div className="mx-4 max-w-[800px] md:mx-auto flex flex-col space-y-5">
      {isLoading ? (
        <LoadingScreen message="Loading Your Devotionals" size="sm" />
      ) : (
        <>
          <div className="flex justify-between">
            <h1>Daily Devotionals</h1>

            {process.env.LOCAL_TESTING === "true" && (
              <Button
                standardBtn={"primary"}
                onClick={handleGenerateDevotionals}
                disabled={loading}
              >
                Generate Devotional
              </Button>
            )}
          </div>

          {loading && (
            <LoadingScreen message="Generating Devotional" size="sm" />
          )}

          {devotionals.length === 0 ? (
            <DevotionalCard showNone={true} />
          ) : (
            <>
              {currentDevotionalData.map((devotional, index) => (
                <DevotionalCard
                  devotional={devotional}
                  key={`devotional-${index}`}
                />
              ))}

              <Pagination
                currentPage={currentPage}
                totalCount={devotionals.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Devotionals;
