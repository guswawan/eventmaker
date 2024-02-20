export async function getAllEvents() {
  try {
    const res = await fetch("https://eventmakers-api.fly.dev/events", {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to get event data.");
    }
    const { data } = await res.json();
    console.log("RES", data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
