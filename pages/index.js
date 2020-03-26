import Dashboard from '../components/Dashboard/Dashboard';
import { useEffect } from 'react';

export default function IndexPage({ totals, history, countries, countryStats }) {
  return <Dashboard totals={totals} history={history} countries={countries} countryStats={countryStats} />;
}