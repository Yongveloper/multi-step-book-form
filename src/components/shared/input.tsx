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

const Input = InputField as typeof InputField & {
  Group: typeof InputGroup;
  Label: typeof InputLabel;
  Description: typeof InputDescription;
};

Input.Group = InputGroup;
Input.Label = InputLabel;
Input.Description = InputDescription;

export default Input;
