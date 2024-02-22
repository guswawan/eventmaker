"use client";

import { DetailEvent } from "@/components/DetailEvent";
import { Loader } from "@/components/Loader";
import { getDetailEvent } from "@/lib/fetching";
import React, { useEffect, useState } from "react";

export default function Page({ params }) {
  const { eventId } = params;
  const [dataDetailEvent, setDataDetailEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetailEvent(eventId);
        setDataDetailEvent(data.events);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching detail event:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}
      {!isLoading && dataDetailEvent && <DetailEvent event={dataDetailEvent} />}
    </>
  );
}
