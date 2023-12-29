import React, { ReactNode } from "react";

// Define the type for the props
interface ScreenTemplateProps {
  children: ReactNode;
}

// Use the type with React.FC
const ScreenTemplate: React.FC<ScreenTemplateProps> = ({ children }) => {
  return <>{children}</>;
};

export default ScreenTemplate;
