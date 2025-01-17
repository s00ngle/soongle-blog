import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-gray-50">
      {children}
    </div>
  );
};

export default PageContainer;
