import useStats from '../utils/useStats';

export default function Stats({ url }) {
  const { stats, loading, error } = useStats(url);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  return (
    <div>
      <div>
        <h3>Confirmed:</h3>
        <span>{stats.confirmed.value}</span>
      </div>
      <div>
        <h3>Deaths:</h3>
        <span>{stats.deaths.value}</span>
      </div>
      <div>
        <h3>Recovered:</h3>
        <span>{stats.recovered.value}</span>
      </div>
    </div>
  );
}