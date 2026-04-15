import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { FilterButton } from './FilterButton';
import { FilterInput } from './FilterInput';
import { FilterSelect } from './FilterSelect';
import { useData } from '../providers';

const STATUS_OPTIONS = ['Alive', 'Dead', 'unknown'];

const GENDER_OPTIONS = ['Female', 'Male', 'Genderless', 'unknown'];

const SPECIES_OPTIONS = [
  'Human',
  'Alien',
  'Humanoid',
  'Poopybutthole',
  'Mythological Creature',
  'Animal',
  'Robot',
  'Cronenberg',
  'Disease',
  'unknown'
];

const API_CHARACTERS_URL = 'https://rickandmortyapi.com/api/character';

const defaultFilters = {
  status: '',
  gender: '',
  species: '',
  name: '',
  type: ''
};

export function Filter() {
  const { setApiURL, setActivePage } = useData();
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const initialFilters = { ...defaultFilters };

    Object.keys(defaultFilters).forEach((key) => {
      initialFilters[key] = params.get(key) || '';
    });

    return initialFilters;
  });

  const handleChange = useCallback((key, value) => {
    setFilters((prev) => {
      return {
        ...prev,
        [key]: value
      };
    });
  }, []);

  const handleApply = useCallback(() => {
    const apiUrl = new URL(API_CHARACTERS_URL);
    const browserUrl = new URL(window.location.href);

    browserUrl.search = '';

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        apiUrl.searchParams.set(key, value);
        browserUrl.searchParams.set(key, value);
      }
    });

    window.history.pushState({}, '', browserUrl.href);

    setActivePage(0);
    setApiURL(apiUrl.href);
  }, [filters, setApiURL, setActivePage]);

  const handleReset = useCallback(() => {
    setFilters(defaultFilters);
    setActivePage(0);

    const browserUrl = new URL(window.location.href);
    browserUrl.search = '';

    window.history.pushState({}, '', browserUrl.origin + browserUrl.pathname);

    setApiURL(API_CHARACTERS_URL);
  }, [setActivePage, setApiURL]);

  const syncApiWithUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const queryString = params.toString();

    setApiURL(
      queryString ? `${API_CHARACTERS_URL}?${queryString}` : API_CHARACTERS_URL
    );
  }, [setApiURL]);

  useEffect(() => {
    syncApiWithUrl();
  }, [syncApiWithUrl]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const newFilters = { ...defaultFilters };

      Object.keys(defaultFilters).forEach((key) => {
        newFilters[key] = params.get(key) || '';
      });

      setFilters(newFilters);
      syncApiWithUrl();
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [setApiURL, syncApiWithUrl]);

  return (
    <FilterContainer>
      <FilterSelect
        filterKey="status"
        options={STATUS_OPTIONS}
        value={filters.status}
        placeholder="Status"
        onValueChange={handleChange}
      />
      <FilterSelect
        filterKey="gender"
        options={GENDER_OPTIONS}
        value={filters.gender}
        placeholder="Gender"
        onValueChange={handleChange}
      />
      <FilterSelect
        filterKey="species"
        options={SPECIES_OPTIONS}
        value={filters.species}
        placeholder="Species"
        onValueChange={handleChange}
      />
      <FilterInput
        filterKey="name"
        value={filters.name}
        placeholder="Name"
        onChange={handleChange}
      />
      <FilterInput
        filterKey="type"
        value={filters.type}
        placeholder="Type"
        onChange={handleChange}
      />
      <ButtonsContainer>
        <FilterButton onClick={handleApply}>Apply</FilterButton>
        <FilterButton variant="reset" onClick={handleReset}>
          Reset
        </FilterButton>
      </ButtonsContainer>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 180px);
  gap: 10px;

  @media (max-width: 950px) {
    grid-template-columns: repeat(3, 150px);
    gap: 15px;
  }

  @media (max-width: 530px) {
    grid-template-columns: repeat(1, 240px);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 950px) {
    gap: 15px;
  }

  @media (max-width: 530px) {
    flex-direction: column;
  }
`;
