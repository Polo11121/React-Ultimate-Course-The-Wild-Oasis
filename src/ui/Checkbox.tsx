import { ReactNode } from "react";
import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    cursor: pointer;
    accent-color: var(--color-brand-600);
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;
    cursor: pointer;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  id: string;
  children: ReactNode;
};

export const Checkbox = ({
  checked,
  onChange,
  disabled = false,
  id,
  children,
}: CheckboxProps) => (
  <StyledCheckbox>
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <label htmlFor={!disabled ? id : ""}>{children}</label>
  </StyledCheckbox>
);
