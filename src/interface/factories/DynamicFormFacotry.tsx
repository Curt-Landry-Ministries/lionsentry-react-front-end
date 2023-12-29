import React from 'react';
import StyledButton, { ButtonSize } from '../atoms/StyledButton';
import LabelledSingleLineInput from '../molecules/LabledSingleLineTextInput';

export interface DFFInputField {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export interface DFFButtonField {
  text: string;
  onClick: () => void;
}

interface DynamicFormFactoryProps {
  inputFields: DFFInputField[];
  buttonFields: DFFButtonField[];
}

export const DynamicFormFactory: React.FC<DynamicFormFactoryProps> = ({ inputFields, buttonFields }) => {
  return (
    <div>
      {inputFields.map((field, index) => (
        <LabelledSingleLineInput
          key={index}
          label={field.label}
          placeholder={field.placeholder}
          value={field.value}
          onChange={field.onChange}
          type={field.type || 'text'}
        />
      ))}
      <div style={{ marginTop: '30px' }}>
        {buttonFields.map((field, index) => (
          <StyledButton
            key={index}
            onClick={field.onClick}
            size={ButtonSize.LARGE}
            style={{ marginBottom: '30px' }}
          >
            {field.text}
          </StyledButton>
        ))}
      </div>
    </div>
  );
};
