"use client";

import { getCreateEvent, getEditEvent } from "@/lib/fetching";
import { session } from "@/lib/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const EditEvent = ({ event }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [image, setImage] = useState(event.image);
  const [datetime, setDatetime] = useState(event.dateTime);
  const [author, setAuthor] = useState(event.author);
  async function uploadImageToCloudinary(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "xmncqgxf");

    const cloudinaryResponse = await fetch(
      "https://api.cloudinary.com/v1_1/asdfghj/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (cloudinaryResponse.ok) {
      return await cloudinaryResponse.json();
    } else {
      throw new Error("Gagal mengunggah gambar ke Cloudinary");
    }
  }
  async function handleEditEvent() {
    try {
      setIsLoading(true);
      const { user, token } = session();
      // const formData = new FormData(e.target);
      // const title = formData.get("title");
      // const description = formData.get("description");
      // const dateTime = formData.get("eventdate");
      // const image = formData.get("image");

      const cloudinaryResponse = await uploadImageToCloudinary(image);
      if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
        console.error("Gagal mengunggah gambar ke Cloud");
        return;
      }

      // Dapatkan URL gambar dari respons Cloudinary
      const imageUrl = cloudinaryResponse.secure_url;

      await getEditEvent(
        token,
        author,
        event.id,
        title,
        description,
        image,
        datetime
      );

      toast.success("Event Update successfully");
      router.replace("/dashboard");
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.error("ERR", error);
      toast.error(`Failed to create event : ${error.message}`);
      setIsLoading(false);
    }
  }
  // Handler untuk input tanggal
  const handleDateTimeInput = (e) => {
    setDatetime(e.target.value);
  };
  return (
    <div className="flex flex-col items-center gap-4 max-w-sm m-auto">
      {/* <form className="flex flex-col gap-6" onSubmit={handleCreateEvent}> */}
      <div className="text-3xl font-bold self-start border-t-0 border-y-0 border-b-2 border-primary pb-2 w-full">
        Update Your Event
      </div>
      {/* <div className="divider divider-primary"></div> */}
      <fieldset className="flex flex-col items-center justify-start w-full max-x-sm">
        <label className="self-start">Event Name</label>
        <input
          type="text"
          placeholder="What event is it?"
          className="input input-bordered w-full max-w-sm"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          // required
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
          // required
        />
      </fieldset>

      {/* <fieldset className="flex flex-col items-center justify-start w-full max-x-sm">
        <label className="self-start">Banner Image</label>
        <input
          placeholder="Event Image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="file-input file-input-bordered w-full max-w-sm"
          src={URL.createObjectURL(image)}
        />
      </fieldset> */}

      <fieldset className="flex flex-col items-center justify-start w-full max-x-sm">
        <label className="self-start">Event date</label>
        <input
          type="date"
          className="input input-bordered w-full max-w-sm"
          placeholder="Event Date"
          onChange={handleDateTimeInput}
          value={datetime}
          // required
        />
      </fieldset>

      <button
        onClick={handleEditEvent}
        className="self-end relative overflow-hidden rounded-btn bg-[#5621B6] px-5 py-2.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110"
      >
        {isLoading ? "Updating..." : "Update"}
      </button>
      {/* </form> */}
    </div>
  );
};
