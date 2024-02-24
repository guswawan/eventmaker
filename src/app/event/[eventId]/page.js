import DetailViewEvent from "@/components/DetailViewEvent";

export default async function Home({ params }) {
  return (
    <div>
      <DetailViewEvent params={params} />
    </div>
  );
}
