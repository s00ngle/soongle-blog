import PageContainer from "@/components/PageContainer";
import SignatureCanvas from "@/components/SignatureCanvas";

export default function TechPage() {
  return (
    <PageContainer>
      {/* 서명 캔버스 */}
      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-gray-900 text-center">
          Sign Below
        </h2>
        <SignatureCanvas />
      </div>
    </PageContainer>
  );
}
