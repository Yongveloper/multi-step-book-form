import styled from '@emotion/styled';

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

const BaseButton = styled.button<{ variant?: 'secondary' }>`
  padding: 12px 24px;
  background-color: ${(props) =>
    props.variant === 'secondary' ? '#6c757d' : '#007bff'};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  flex: 1;

  &:hover {
    opacity: 0.9;
  }
`;

const Button = BaseButton as typeof BaseButton & {
  Group: typeof ButtonGroup;
};

Button.Group = ButtonGroup;

export default Button;
