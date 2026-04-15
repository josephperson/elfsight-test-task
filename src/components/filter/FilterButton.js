import styled, { css } from 'styled-components';

export function FilterButton({ children, variant = 'apply', onClick }) {
  return (
    <StyledFilterButton variant={variant} onClick={onClick}>
      {children}
    </StyledFilterButton>
  );
}

const variants = {
  apply: css`
    border-color: #83bf46;
    color: #83bf46;

    &:hover {
      background: #83bf46;
      color: #f5f5f5;
    }
  `,

  reset: css`
    border-color: #ff5152;
    color: #ff5152;

    &:hover {
      background: #ff5152;
      color: #f5f5f5;
    }
  `
};

const StyledFilterButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  ${({ variant }) => variants[variant]}
`;
