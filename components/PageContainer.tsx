import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <main className="flex-grow flex flex-col items-center justify-center bg-gray-50">
      {children}
    </main>
  );
};

export default PageContainer;
