import { useCallback } from 'react';
import styled from 'styled-components';

export function FilterInput({
  filterKey = '',
  value,
  onChange,
  placeholder = 'Placeholder'
}) {
  const handleChange = useCallback(
    (event) => {
      onChange(filterKey, event.target.value);
    },
    [filterKey, onChange]
  );

  return (
    <StyledFilterInput
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}

const StyledFilterInput = styled.input`
  background: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  color: #f5f5f5;
  padding: 12px 16px;
  outline: none;
  width: 100%;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: background 0.2s;

  &::placeholder {
    color: #b3b3b3;
  }

  &:hover,
  &:focus {
    background: #334466;
  }
`;
