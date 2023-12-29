import styled from "styled-components";
import { COLORS } from "../theme";

interface DotProps {
  $status: "answered" | "current" | "unanswered";
}

const Dot = styled.span<DotProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin: 0 5px;
  background-color: ${({ $status }) => {
    switch ($status) {
      case "answered":
        return `${COLORS.DAPPLED_SUNLIGHT}66`;
      case "current":
        return COLORS.DAPPLED_SUNLIGHT;
      case "unanswered":
      default:
        return COLORS.MORNING_MIST;
    }
  }};
`;

export default Dot;
