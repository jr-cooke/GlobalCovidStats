import styled from "styled-components";
import dayjs from "dayjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { textColor, chartTooltipBackground } from "../../../theme";
import abbreviate from "number-abbreviate";

import { formatNumber } from "../../../helpers/numbers";

function CustomTickX(props) {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <CustomTickText
        x={0}
        y={0}
        dy={12}
        textAnchor="start"
        fill="#666"
        transform="rotate(45)"
      >
        {dayjs(payload.date).format("MMM DD")}
      </CustomTickText>
    </g>
  );
}

function CustomTickY(props) {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <CustomTickText x={0} y={0} dy={0} textAnchor="end" fill="#666">
        {abbreviate(payload.value)}
      </CustomTickText>
    </g>
  );
}

function CustomTooltip({ active, payload }) {
  if (active) {
    return (
      <ToolTipWrapper>
        <ToolTipLabel>
          {dayjs(payload[0].payload.date).format("MMM DD, YYYY")}
        </ToolTipLabel>
        <ToolTipLabel color="#fb8c00">
          Confirmed: {formatNumber(payload[0].payload.confirmed)}
        </ToolTipLabel>
        <ToolTipLabel color="#757575">
          Fatalities: {formatNumber(payload[0].payload.deaths)}
        </ToolTipLabel>
      </ToolTipWrapper>
    );
  }

  return null;
}

export default function CountryDailyBarChart({ daily }) {
  console.log("CountryDailyBarChart -> daily", daily)
  const dateRange = Object.keys(daily.timeline.cases);
  const perDayData = [];
  for (let i = 0; i < dateRange.length; i++) {
    const confirmed = daily.timeline.cases[dateRange[i]];
    const deaths = daily.timeline.deaths[dateRange[i]];
    const pastConfirmed = i - 1 < 0 ? 0 : daily.timeline.cases[dateRange[i - 1]];
    const pastDeaths = i - 1 < 0 ? 0 : daily.timeline.deaths[dateRange[i - 1]];
    perDayData.push({
      date: dateRange[i],
      confirmed: confirmed - pastConfirmed,
      deaths: deaths - pastDeaths
    });
  }
  return (
    <TotalsTimeline>
      <ResponsiveContainer>
        <BarChart
          data={perDayData}
          strokeWidth={1.5}
          margin={{ left: 15, right: 15, bottom: 30, top: 10 }}
        >
          <YAxis tick={<CustomTickY />} width={30} />
          <XAxis
            dataKey="reportDate"
            interval={7}
            axisLine={false}
            tick={<CustomTickX />}
          />
          <Tooltip offset={0} cursor={false} content={<CustomTooltip />} />
          <Bar dataKey="confirmed" fill="#fb8c00" barSize={5} />
          <Bar dataKey="deaths" fill="#757575" barSize={5} />
        </BarChart>
      </ResponsiveContainer>
    </TotalsTimeline>
  );
}

const TotalsTimeline = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
`;

const CustomTickText = styled.text`
  font-size: 12px;
  fill: ${textColor};
  animation: all 0.5s ease;
`;

const ToolTipWrapper = styled.div`
  opacity: 0.8;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 150px;
  background-color: ${chartTooltipBackground};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
`;

const ToolTipLabel = styled.span`
  margin-bottom: 3px;
  color: ${({ color }) => color};
`;
