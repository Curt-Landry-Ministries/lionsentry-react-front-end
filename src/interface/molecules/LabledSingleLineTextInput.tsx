import React from "react";
import styled from "styled-components";
import { COLORS, FONTS } from "../theme";

const Label = styled.label`
  font-family: ${FONTS.BODY};
  color: ${COLORS.MORNING_MIST};
  font-size: 25px;
  margin-bottom: 8px;
  display: block; // Ensures the label is on a new line above the input
`;

const Input = styled.input`
  width: 574px;
  height: 40px;
  padding: 10px;
  border: 2px solid ${COLORS.MYSTIC_NIGHT_SKY};
  border-radius: 4px;
  font-family: ${FONTS.BODY};
  font-size: 20px;
  color: ${COLORS.MYSTIC_NIGHT_SKY};
  background-color: ${COLORS.MORNING_MIST};
  &::placeholder {
    color: #828282;
  }
  &:focus {
    border-color: ${COLORS.DAPPLED_SUNLIGHT};
    outline: none;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  display: flex; // This will allow for more control if needed
  flex-direction: column; // Ensures label is on top and input is below
`;

interface LabelledSingleLineInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const LabelledSingleLineInput: React.FC<LabelledSingleLineInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputContainer>
  );
};

export default LabelledSingleLineInput;
