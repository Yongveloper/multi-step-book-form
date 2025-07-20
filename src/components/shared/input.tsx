import styled from '@emotion/styled';

const Input = styled.input`
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
  }
`;

export default Input;
