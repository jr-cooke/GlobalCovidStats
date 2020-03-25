import Dashboard from '../components/Dashboard/Dashboard';

export default function IndexPage({ totals, history, countries, countryStats }) {
  return <Dashboard totals={totals} history={history} countries={countries} countryStats={countryStats} />;
}