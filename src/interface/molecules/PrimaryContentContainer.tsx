import { COLORS } from "../theme";
import { useTranslation } from "react-i18next";

interface PrimaryContentContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const PrimaryContentContainer: React.FC<PrimaryContentContainerProps> = ({
  children,
  style,
}) => {
  return (
    <div
      style={{
        backgroundColor: COLORS.MYSTIC_NIGHT_SKY,
        borderRadius: "10px",
        padding: "40px", // Adjusted from 10px to 40px
        width: "50%",
        height: "70%",
        border: `1px solid ${COLORS.DAPPLED_SUNLIGHT}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: `0px 0px 10px ${COLORS.DAPPLED_SUNLIGHT}`,
        overflow: "auto", // Prevent content overflow by adding scrollbars
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default PrimaryContentContainer;
