import PageContainer from "@/components/PageContainer";
import SignatureCanvas from "@/components/SignatureCanvas";
import Image from "next/image";

export default function TechPage() {
  return (
    <PageContainer>
      {/* 서명 캔버스 */}
      <div className="mt-8">
        <h3 className="text-3xl font-medium text-gray-700">Sign Below</h3>
        <p className="text-gray-500 mt-2">
          Draw your signature in the canvas below:
        </p>
        <SignatureCanvas />
      </div>
    </PageContainer>
  );
}
