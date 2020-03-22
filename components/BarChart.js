import useDataFetch from '../utils/useDataFetch';
import { ResponsiveBar } from "@nivo/bar";

export default function BarChart() {
  const { data, loading, error } = useDataFetch("https://covid19.mathdro.id/api/confirmed");
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  
  const processData = () => {
    return data
      .map(dp => dp.countryRegion)
      .filter((item, i, ar) => ar.indexOf(item) === i)
      .map((uCR) => {
        const countryStats = data.filter(dp => dp.countryRegion === uCR)
        console.log("processData -> countryStats", countryStats)
        const confirmed = countryStats.reduce((total, stat) => total + stat.confirmed, 0)
        const deaths = countryStats.reduce((total, stat) => total + stat.deaths, 0)
        const recovered = countryStats.reduce((total, stat) => total + stat.recovered, 0)
        return{
          country: uCR,
          confirmed,
          deaths,
          recovered
        }
      })
      .sort((a, b) => b.confirmed - a.confirmed)
      .slice(0, 10);
  }
  console.log("BarChart -> processedData", processData(data))
  
  return (
    // <p>data</p>
    <ResponsiveBar
      data={processData(data)}
      keys={["confirmed", "recovered", "deaths"]}
      indexBy="country"
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      padding={0.1}
      colors={{ scheme: "nivo" }}
      groupMode="grouped"
      height={500}
      enableLabel={false}
    />
  );
}