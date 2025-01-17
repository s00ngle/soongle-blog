import InfoTable from "@/components/InfoTable";

const InfoSection = ({
  title,
  headers,
  data,
}: {
  title: string;
  headers: string[];
  data: { [key: string]: string }[];
}) => {
  return (
    <section className="mt-6 w-full max-w-4xl px-3 py-3">
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        {title}
      </h2>
      <InfoTable headers={headers} data={data} />
    </section>
  );
};

export default InfoSection;
