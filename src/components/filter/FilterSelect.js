import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ChevronDown } from '../../assets/select-icons/chevron-down.svg';
import { ReactComponent as ChevronUp } from '../../assets/select-icons/chevron-up.svg';
import { ReactComponent as X } from '../../assets/select-icons/cross.svg';

export const FilterSelect = memo(function FilterSelect({
  filterKey = '',
  options = [],
  value,
  onValueChange,
  placeholder = 'Select'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (option) => {
      onValueChange(filterKey, option);
      setIsOpen(false);
    },

    [filterKey, onValueChange]
  );

  const handleClear = useCallback(
    (event) => {
      event.stopPropagation();

      onValueChange(filterKey, '');
      setIsOpen(false);
    },
    [filterKey, onValueChange]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <FilterSelectContainer ref={containerRef}>
      <SelectField _isOpen={isOpen} _hasValue={!!value} onClick={handleToggle}>
        <SelectValue>{value || placeholder}</SelectValue>
        <SelectIcon
          _isOpen={isOpen}
          _hasValue={!!value}
          onClick={value && !isOpen ? handleClear : undefined}
        >
          {value && !isOpen ? <X /> : isOpen ? <ChevronUp /> : <ChevronDown />}
        </SelectIcon>
      </SelectField>
      {isOpen && (
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option}
              option={option}
              isSelected={option === value}
              onSelect={handleSelect}
            />
          ))}
        </SelectContent>
      )}
    </FilterSelectContainer>
  );
});

const SelectItem = memo(function SelectItem({ option, isSelected, onSelect }) {
  const handleClick = useCallback(() => {
    onSelect(option);
  }, [option, onSelect]);

  return (
    <StyledSelectItem _isSelected={isSelected} onClick={handleClick}>
      {option}
    </StyledSelectItem>
  );
});

const FilterSelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectField = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: ${({ _isOpen }) => (_isOpen ? '#334466' : '#263750')};
  border: 1px solid #83bf46;
  border-radius: 8px;
  color: ${({ _hasValue }) => (_hasValue ? '#fff' : '#b3b3b3')};
  transition: background 0.2s;

  &:hover,
  &:focus {
    background: #334466;
  }
`;

const SelectValue = styled.span``;

const SelectIcon = styled.span`
  width: 16px;
  height: 16px;
  color: ${({ _isOpen, _hasValue }) =>
    _isOpen || _hasValue ? '#fff' : '#B2B2B2'};
  cursor: ${({ _hasValue }) => (_hasValue ? 'pointer' : 'default')};
  transition: color 0.2s;

  ${({ _hasValue }) =>
    _hasValue &&
    css`
      &:hover {
        color: #83bf46;
      }
    `}
`;

const SelectContent = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  max-height: 200px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  z-index: 100;
`;

const StyledSelectItem = styled.div`
  width: 100%;
  padding: 10px 8px;
  font-weight: ${({ _isSelected }) => (_isSelected ? 600 : 400)};
  transition: background 0.2s;

  &:hover {
    background: rgba(131, 191, 70, 0.2);
  }
`;
