import { useState } from 'react';
import useDataFetch from '../utils/useDataFetch';
import Stats from './Stats';

export default function CountrySelector() {
  const { stats: countries, loading, error } = useDataFetch(
    'https://covid19.mathdro.id/api/countries'
  );
  const [selectedCountry, setSelectedCountry] = useState('USA');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <h2>Currently Showing {selectedCountry}</h2>
      <select
        onChange={e => {
          setSelectedCountry(e.target.value);
        }}
      >
        {Object.entries(countries.countries).map(([country, code], i) => (
          <option
            selected={selectedCountry === countries.iso3[code]}
            key={`${code}${i}`}
            value={countries.iso3[code]}
          >
            {country}
          </option>
        ))}
      </select>
      <Stats
        url={`https://covid19.mathdro.id/api/countries/${selectedCountry}`}
      ></Stats>
    </div>
  );
}