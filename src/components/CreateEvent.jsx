"use client";

import { getCreateEvent, uploadImageToCloudinary } from "@/lib/fetching";
import { session } from "@/lib/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const CreateEvent = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [datetime, setDatetime] = useState("");

  async function handleCreateNewEvent() {
    try {
      setIsLoading(true);
      const { user, token } = session();
      const cloudinaryResponse = await uploadImageToCloudinary(image);

      if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
        console.error("Gagal mengunggah gambar ke Cloud");
        return;
      }

      // Dapatkan URL gambar dari respons Cloudinary
      const imageUrl = cloudinaryResponse.secure_url;

      await getCreateEvent(
        token,
        user.id,
        title,
        description,
        imageUrl,
        datetime
      );

      toast.success("Event created successfully");
      router.replace("/dashboard");
      setIsLoading(false);
      router.refresh();
      setTitle("");
      setDescription("");
      setImage("");
      setDatetime("");
    } catch (error) {
      console.error("ERR", error);
      toast.error(`Failed to create event : ${error.message}`);
      setIsLoading(false);
    }
  }
  const handleDateTimeInput = (e) => {
    setDatetime(e.target.value);
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-3xl font-bold self-start border-t-0 border-y-0 border-b-2 border-primary pb-1 w-full">
        Create Your Event
      </div>
      <fieldset className="flex flex-col items-center justify-start w-full max-x-sm">
        <label className="self-start">Event Name</label>
        <input
          type="text"
          placeholder="What event is it?"
          className="input input-bordered w-full max-w-sm"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </fieldset>
      <fieldset className="flex flex-col items-center justify-start w-full max-x-sm">
        <label className="self-start">Description</label>
        <textarea
          placeholder="Describe your event..."
          className="textarea textarea-bordered w-full max-w-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </fieldset>

      <fieldset className="flex flex-col items-center justify-start w-full max-x-sm">
        <label className="self-start">Event date</label>
        <input
          type="date"
          className="input input-bordered w-full max-w-sm"
          placeholder="Event Date"
          onChange={handleDateTimeInput}
          value={datetime}
        />
      </fieldset>

      <fieldset className="flex flex-col items-center justify-start w-full max-x-sm">
        <label className="self-start">Banner Image</label>
        <input
          placeholder="Event Image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="file-input file-input-bordered w-full max-w-sm"
        />
      </fieldset>

      <button
        onClick={handleCreateNewEvent}
        className="self-end relative overflow-hidden rounded-btn bg-[#5621B6] px-5 py-2.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110"
      >
        {isLoading ? "Creating..." : "Create Event"}
      </button>
    </div>
  );
};
