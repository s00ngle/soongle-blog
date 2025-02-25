import PageContainer from "@/components/PageContainer";
import PaintingCanvas from "@/components/PaintingCanvas";

export default function TechPage() {
  return (
    <PageContainer>
      <div className="p-4">
        <h2 className="text-3xl font-semibold text-gray-900 text-center">
          Painting Canvas
        </h2>
        <PaintingCanvas />
        {/* <SignatureCanvas /> */}
      </div>
    </PageContainer>
  );
}
