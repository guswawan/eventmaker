import EditViewEvent from "@/components/EditViewEvent";

export default async function Home({ params }) {
  return (
    <div>
      <EditViewEvent params={params} />
    </div>
  );
}
