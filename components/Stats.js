import useDataFetch from '../utils/useDataFetch';
import styled from 'styled-components';

export default function Stats({ url }) {
  const { data, loading, error } = useDataFetch(url);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  return (
    <StatsWrapper>
      <div>
        <h3>Confirmed:</h3>
        <span>{data.confirmed.value}</span>
      </div>
      <div>
        <h3>Deaths:</h3>
        <span>{data.deaths.value}</span>
      </div>
      <div>
        <h3>Recovered:</h3>
        <span>{data.recovered.value}</span>
      </div>
    </StatsWrapper>
  );
}

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;