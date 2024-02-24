"use client";

import React, { useEffect, useState, useRef } from "react";
import { TopBar } from "./TopBar";
import Cookies from "js-cookie";
import { CreateEvent } from "./CreateEvent";
import Link from "next/link";
import { getDeleteEvent } from "@/lib/fetching";
import toast from "react-hot-toast";
import { session } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { EditEvent } from "./EditEvent";

export default function ClientComponent({ events }) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    const parsedUserData = JSON.parse(userFromLocalStorage);
    setUser(parsedUserData);
  }, []);

  const noToken = Cookies.get("token");

  const handleDelete = async (eventId) => {
    try {
      setIsLoading(true);
      const { token } = session();
      await getDeleteEvent(token, eventId);
      setIsLoading(false);
      toast.success("Event successfully deleted");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete event: ", error);
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/edit/event/${id}`);
  };

  return (
    <section>
      <div className="sticky top-0 z-50">
        <TopBar token={noToken} />
      </div>

      <div className="w-full max-w-sm p-4 m-auto">
        <div className="pb-10 flex justify-between sticky top-40">
          <div>
            <div>Dashboard</div>
            <div>Welcome Back, {user?.name}!</div>
          </div>
          <div>
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="group relative h-10 overflow-hidden overflow-x-hidden rounded-btn bg-neutral-950 px-3 text-neutral-50"
            >
              <span className="relative z-10">+ New Event</span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-[#5621B6] transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
              </span>
            </button>
          </div>
        </div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box max-w-sm">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <CreateEvent />
            </form>
          </div>
        </dialog>
      </div>
      <div className="divider px-[84px]"></div>
      {events?.length > 0 ? (
        <div className="flex gap-5 max-h-6xl justify-center">
          <div className="overflow-x-auto mb-[100px]">
            <div className="flex justify-between">
              <div className="font-semibold text-xl self-start border-t-0 border-y-0 border-b-2 border-primary pb-1 max-w-[180px] mb-4">
                Your Events
              </div>
              <div className="form-control">
                <Link href={"/"}>
                  <button className="btn btn-ghost rounded-full">
                    See All Events
                  </button>
                </Link>
              </div>
            </div>
            <table className="table">
              <tbody>
                {!isLoading &&
                  events.map((item) => (
                    <tr key={item.events.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
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
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.events.title}</div>
                            <div className="text-sm opacity-50">
                              {item.events.dateTime}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="max-w-xs truncate">
                        {item.events.description}
                      </td>
                      <td>{item.participants.length} Participants</td>
                      <th>
                        <button
                          onClick={() => handleEdit(item.events.id)}
                          className="btn btn-accent btn-xs"
                        >
                          update
                        </button>{" "}
                        <button
                          onClick={() => handleDelete(item.events.id)}
                          className="btn btn-error btn-xs"
                        >
                          delete
                        </button>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="font-semibold text-6xl pt-24">
            You have not created any events yet!
          </p>
          <div className="form-control pt-9">
            <Link href={"/"}>
              <button className="btn btn-ghost rounded-full">
                See All Events
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
