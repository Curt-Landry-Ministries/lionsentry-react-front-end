import LionBackground from "../../../assets/images/LionBackground.png";

const BackgroundImage: React.FC = () => (
  <img
    src={LionBackground}
    alt="Background"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      objectFit: "cover",
      zIndex: -1,
    }}
  />
);

export default BackgroundImage;
