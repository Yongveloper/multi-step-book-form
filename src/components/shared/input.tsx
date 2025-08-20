import React from 'react';
import { useFormContext } from 'react-hook-form';

import styled from '@emotion/styled';

const InputGroup = styled.div``;

const InputLabel = styled.label``;

const InputField = styled.input`
  padding: 0 4px;
  height: 32px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 4px;

  &[aria-invalid='true'] {
    border-color: red;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

const InputDescription = styled.p`
  &[aria-invalid='true'] {
    color: red;
    font-size: 12px;
    margin-top: 4px;
    margin-bottom: 0;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid black;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;

  &[aria-invalid='true'] {
    border-color: red;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

interface IRHFInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

interface IRHFTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

interface IRHFDescriptionProps extends React.PropsWithChildren {
  name: string;
}

function RHFInputField({ name, type, ...props }: IRHFInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const registerOptions =
    type === 'number' ? { valueAsNumber: true } : undefined;

  return (
    <InputField
      {...register(name, registerOptions)}
      type={type}
      aria-invalid={errors[name] !== undefined}
      {...props}
    />
  );
}

function RHFTextareaField({ name, ...props }: IRHFTextareaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextArea
      {...register(name)}
      aria-invalid={errors[name] !== undefined}
      {...props}
    />
  );
}

function RHFInputDescription({ name, children }: IRHFDescriptionProps) {
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const errorMessage = error?.message ? String(error.message) : '';

  return (
    <InputDescription aria-invalid={errors[name] !== undefined}>
      {children || errorMessage}
    </InputDescription>
  );
}
const Input = InputField as typeof InputField & {
  Group: typeof InputGroup;
  Label: typeof InputLabel;
  Description: typeof InputDescription;
  TextArea: typeof TextArea;
  RHFInput: typeof RHFInputField;
  RHFTextarea: typeof RHFTextareaField;
  RHFDescription: typeof RHFInputDescription;
};

Input.Group = InputGroup;
Input.Label = InputLabel;
Input.Description = InputDescription;
Input.TextArea = TextArea;
Input.RHFInput = RHFInputField;
Input.RHFTextarea = RHFTextareaField;
Input.RHFDescription = RHFInputDescription;

export default Input;
