"use client";

import React, { useState, useEffect } from "react";
import { getAllEvents } from "@/lib/fetching";
import Link from "next/link";
import { Loader } from "./Loader";

export const AllEvents = () => {
  const [dataEvents, setDataEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllEvents();
        setDataEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching event list:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-20 gap-4 mb-4">
      <div className="divider leading-tight tracking-wide text-[#5621B6] font-medium">
        Events For You
      </div>
      <div className="animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            stroke="#5621B6"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.5"
            d="M12 6h2.67c3.31 0 4.67 2.35 3.01 5.22l-1.34 2.31L15 15.84c-1.66 2.87-4.37 2.87-6.03 0l-1.34-2.31-1.34-2.31C4.66 8.35 6.01 6 9.33 6H12z"
          ></path>
        </svg>
      </div>
      {isLoading && <Loader />}
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-4 gap-y-6 pb-10">
        {!isLoading &&
          dataEvents.map((item) => (
            <div
              key={item.events.id}
              className="card card-compact w-96 bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  className="object-cover w-full h-44"
                  src={item.events.image}
                  alt="Thumbnail"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://images.pexels.com/photos/3866658/pexels-photo-3866658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
                  }}
                />
              </figure>
              <div className="card-body">
                <div className="badge badge-ghost">
                  {new Date(item.events.dateTime).getFullYear()}
                </div>
                <h2 className="card-title">{item.events.title}</h2>
                <p className="truncate">{item.events.description}</p>
                <div className="card-actions justify-end">
                  <Link href={`/event/${item.events.id}`} passHref>
                    <button className="btn btn-ghost text-[#5621B6] hover:btn hover:rounded-badge">
                      Get Info
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
