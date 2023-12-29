import React, { ReactNode } from "react";
import BackgroundImage from "../atoms/BackgroundImage";
import PrimaryContentContainer from "../molecules/PrimaryContentContainer";

interface ImageContentScreenTemplateProps {
  children: ReactNode;
}

const ImageContentScreenTemplate: React.FC<ImageContentScreenTemplateProps> = ({ children }) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <BackgroundImage />
      <PrimaryContentContainer>
        {children}
      </PrimaryContentContainer>
    </div>
  );
};

export default ImageContentScreenTemplate;
