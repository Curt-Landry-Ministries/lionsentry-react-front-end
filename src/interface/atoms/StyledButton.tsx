import styled, { css } from "styled-components";
import { COLORS, FONTS } from "../theme";

export enum ButtonSize {
  SMALL = "small",
  LARGE = "large",
}

interface StyledButtonProps {
  $isDisabled?: boolean;
  size?: ButtonSize;
}

const StyledButton = styled.button<StyledButtonProps>`
  font-family: ${FONTS.BODY};
  font-size: 20px;
  color: ${COLORS.MORNING_MIST};
  background-color: ${COLORS.FOREST_GREEN};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  // Default small button styles
  padding: 10px 20px;

  // Styles for large button
  ${(props) =>
    props.size === ButtonSize.LARGE &&
    css`
      width: 301px;
      height: 60px;
      flex-shrink: 0;
    `}

  &:hover {
    background-color: ${COLORS.DAPPLED_SUNLIGHT};
    color: ${COLORS.MYSTIC_NIGHT_SKY};
  }

  ${(props) =>
    props.$isDisabled &&
    css`
      background-color: ${COLORS.MAJESTIC_LION};
      cursor: not-allowed;
      pointer-events: none; // Prevent any kind of interaction, including click events
      &:hover {
        background-color: ${COLORS.MAJESTIC_LION};
        color: ${COLORS.MORNING_MIST};
      }
    `}
`;

StyledButton.defaultProps = {
  size: ButtonSize.SMALL,
};

export default StyledButton;
