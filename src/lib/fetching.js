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
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
