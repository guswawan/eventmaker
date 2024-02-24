import React from "react";
import ClientComponent from "@/components/ClientComponent";
import { session } from "@/lib/session";
import { getAllEvents } from "@/lib/fetching";

async function Page() {
  const { userData } = session();
  const authorID = userData.id;
  let events;

  try {
    const data = await getAllEvents();
    const userEvent = data?.filter((item) => item.events.author === authorID);
    events = userEvent;
  } catch (error) {
    console.error("Error fetching event list:", error);
  }

  return (
    <section>
      <ClientComponent events={events} userData={userData} />
    </section>
  );
}

export default Page;
