export async function getAllEvents() {
  try {
    const res = await fetch("https://eventmakers-api.fly.dev/events", {
      method: "GET",
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to get event data.");
    }
    const { data } = await res.json();
    return data.reverse();
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getDetailEvent(eventId) {
  try {
    const res = await fetch(
      `https://eventmakers-api.fly.dev/events/${eventId}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to get data detail event.");
    }
    const { data } = await res.json();
    return { data, isLoading: false };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCreateEvent(
  token,
  author,
  title,
  description,
  image,
  dateTime
) {
  try {
    const res = await fetch("https://eventmakers-api.fly.dev/events/", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        image,
        dateTime,
        author,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event. Please try again later.");
  }
}

export async function uploadImageToCloudinary(imageFile) {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

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

export async function getDeleteEvent(token, eventId) {
  const res = await fetch(`https://eventmakers-api.fly.dev/events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(data.message);
  }
  return res;
}

export async function getEditEvent(
  token,
  author,
  eventId,
  title,
  description,
  image,
  dateTime
) {
  console.log(
    "PAY",
    token,
    author,
    eventId,
    title,
    description,
    image,
    dateTime
  );
  const res = await fetch(`https://eventmakers-api.fly.dev/events/${eventId}`, {
    method: "PATCH",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      image,
      dateTime,
      author,
    }),
  });
  console.log("BODY", title, description, image, dateTime, author);

  const data = await res.json();
  console.log("DATT", data);

  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}
