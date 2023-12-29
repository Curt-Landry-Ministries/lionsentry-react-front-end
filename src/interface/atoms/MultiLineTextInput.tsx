import React, { useState, useEffect } from "react";
import { COLORS, FONTS } from "../theme";
import styled from "styled-components";

interface StyledTextInputProps {
  $lines?: number;
}

const StyledTextInput = styled.textarea<StyledTextInputProps>`
  width: 100%;
  height: ${({ $lines }) => ($lines ? `${$lines * 20}px` : "40px")};
  padding: 5px 10px;
  border: 2px solid ${COLORS.FOREST_GREEN};
  border-radius: 4px;
  font-family: ${FONTS.BODY};
  color: ${COLORS.FOREST_GREEN};
  background-color: ${COLORS.MORNING_MIST};
  resize: none;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-y: auto;
  &:focus {
    border-color: ${COLORS.DAPPLED_SUNLIGHT};
    outline: none;
  }
`;

interface TextInputProps {
  numberOfLines?: number;
}

const TextInput: React.FC<TextInputProps> = ({ numberOfLines, ...props }) => {
  const [lines, setLines] = useState(1);

  useEffect(() => {
    if (numberOfLines && numberOfLines >= 2) {
      setLines(numberOfLines);
    }
  }, [numberOfLines]);

  return <StyledTextInput $lines={lines} {...props} />;
};

export default TextInput;
