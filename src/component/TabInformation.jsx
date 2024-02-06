import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSelector, dispatch } from "react-redux";
import Information from "./Information";
import { FilterCombobox, FilterComboOption } from "./Left";
import {
  Legend,
  Line,
  Bar,
  AreaChart,
  Area,
  ReferenceLine,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  CartesianGrid,
  ComposedChart,
} from "recharts";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  border: 1px solid green;
`;
const GraphComboBox = styled(FilterCombobox)`
  width: 20%;
  margin: 2% 1%;
  padding: 1% 0;
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid pink;
`;
const GraphDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "50%")};
  padding: 1%;
  margin: 1%;
  border: 1px solid blue;
`;
const TitleDiv = styled.div`
  width: 100%;
  text-align: center;
`;
const CustomTooltipDiv = styled.div`
  width: 100%;
  padding: 4%;
  background-color: #ffffff;
  border: 1px solid #eaeaea;
`;
const CustumTooltipP = styled.p`
  color: ${(props) => props.color};
`;
export default function TabInformation({ data }) {
  const idx = useSelector((state) => state.idxReducer);
  const chargerName = useSelector((state) => state.infoReducer.charger_name);
  const [selectedDate, setSelectedDate] = useState("월요일");
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [dataPerTime, setDataPerTime] = useState([]);
  const setDataByDate = (e) => {
    setSelectedDate(e.target.value);
  };
  const setDataByMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  useEffect(() => {
    const dayFilterdData = data.filter((el) => el.date === selectedDate);
    setDataPerTime(
      Array.from({ length: 24 }, (_, i) => i + 1).map((time) => {
        return {
          time: time.toString() + "시",
          충전대수: dayFilterdData.filter(
            (el) => parseInt(el.start_time.slice(0, 3)) === time
          ).length,
        };
      })
    );
  }, [selectedDate, data, idx]);

  const dataPerDay = ["월요일", "화요일", "수요일", "목요일", "금요일"].map(
    (day) => {
      return {
        day: day,
        충전시간: Math.round(
          data
            .filter((el) => el.date === day)
            .reduce((acc, cur) => acc + cur.minute, 0)
        ),
        충전대수: data.filter((el) => el.date === day).length,
      };
    }
  );
  const monthDay = Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
    const monthData = data.filter((el) => parseInt(el.start_date.slice(5, 7)) === day);
    return {
        day: day.toString() + "일",
      이용대수: monthData.length,
      이용시간:Math.round(
        (monthData.reduce((acc, cur) => acc + cur.minute, 0))),
      이용률:
      monthData.length > 0
          ? Math.round(
              (monthData.reduce((acc, cur) => acc + cur.minute, 0) /
                (monthData.length * 1440)) *
                100
            )
          : 0,
    };
  });
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      // payload는 데이터 포인트에 대한 정보를 가지고 있습니다.
      const time = payload[0].value;
      const amount = payload[1].value;

      return (
        <CustomTooltipDiv>
          <CustumTooltipP>{label}</CustumTooltipP>
          <CustumTooltipP color="#6561bd">{`이용시간: ${time.toLocaleString()}분`}</CustumTooltipP>
          <CustumTooltipP color="#63b382">{`사용 대수: ${amount.toLocaleString()}대`}</CustumTooltipP>
        </CustomTooltipDiv>
      );
    }

    return null;
  };
  const CustomMonthlyTooltip = ({ active, payload, label }) => {
    if (active) {
      // payload는 데이터 포인트에 대한 정보를 가지고 있습니다.
      const time = payload[1].value;
      const amount = payload[0].value;

      return (
        <CustomTooltipDiv>
          <CustumTooltipP>{label}</CustumTooltipP>
          <CustumTooltipP color="#63b382">{`이용시간: ${time.toLocaleString()}분`}</CustumTooltipP>
          <CustumTooltipP color="#6561bd">{`이용률: ${amount.toLocaleString()}%`}</CustumTooltipP>
        </CustomTooltipDiv>
      );
    }

    return null;
  };

  const CustomBar = ({ x, y, width, height, selectedDate, payload }) => {
    const backgroundColor = selectedDate === payload.day ? "#aba6f6" : "#eaeaea";
    return (
      <rect x={x} y={y} width={width} height={height} fill={backgroundColor} />
    );
  };

  switch (idx) {
    case 0:
      return (
        <InfoContainer>
          <Information></Information>
        </InfoContainer>
      );
    case 1:
      return (
        <InfoContainer>
          <GraphComboBox id="select_day" onChange={setDataByDate}>
            {["월요일", "화요일", "수요일", "목요일", "금요일"].map((el) => {
              return (
                <FilterComboOption value={el} key={el}>
                  {el}
                </FilterComboOption>
              );
            })}
          </GraphComboBox>
          <InfoDiv>
            <GraphDiv>
              <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
                <TitleDiv>
                  <h2>{chargerName} 이용 시간</h2>
                </TitleDiv>
                <ComposedChart data={dataPerDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    stroke="#8884d8"
                    tickFormatter={(value) => value.toLocaleString() + "분"}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#82ca9d"
                    tickFormatter={(value) => value.toLocaleString() + "대"}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="충전시간"
                    fill="#8884d8"
                    shape={<CustomBar selectedDate={selectedDate}></CustomBar>}
                  ></Bar>
                  <Tooltip></Tooltip>
                  <Line
                    yAxisId="right"
                    dataKey="충전대수"
                    stroke="#82ca9d"
                    activeDot={{ r: 7 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </GraphDiv>
            <GraphDiv>
              <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
                <TitleDiv>
                  <h2>{selectedDate} 시간별 이용 대수</h2>
                </TitleDiv>
                <AreaChart data={dataPerTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis
                    tickFormatter={(value) => Number.isInteger(value) ? value.toLocaleString() + "대" : ''}
                  />
                  <Tooltip />
                  <ReferenceLine x={50} stroke="red" label="Max PV PAGE" />
                  <Area
                    type="monotone"
                    dataKey="충전대수"
                    fill="#0a955b"
                  ></Area>
                </AreaChart>
              </ResponsiveContainer>
            </GraphDiv>
          </InfoDiv>
        </InfoContainer>
      );
    case 2:
      return (
        <InfoContainer>
          <InfoDiv>
            <GraphDiv>
              <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
                <TitleDiv>
                  <h2>{chargerName} 일별 이용률</h2>
                </TitleDiv>
                <ComposedChart data={monthDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    stroke="#8884d8"
                    tickFormatter={(value) => value.toLocaleString() + "%"}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#82ca9d"
                    tickFormatter={(value) => value.toLocaleString() + "분"}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="이용률" fill="#8884d8"></Bar>
                  <Tooltip content={<CustomMonthlyTooltip />}></Tooltip>
                  <Line
                    yAxisId="right"
                    dataKey="이용시간"
                    stroke="#82ca9d"
                    strokeWidth={3}
                    activeDot={{ r: 7 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </GraphDiv>
            <GraphDiv>
              <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
                <TitleDiv>
                  <h2>일별 이용 대수</h2>
                </TitleDiv>
                <AreaChart data={monthDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis
                    tickFormatter={(value) => Number.isInteger(value) ? value.toLocaleString() + "대" : ''}
                  />
                  <Tooltip />
                  <ReferenceLine x={50} stroke="red" label="Max PV PAGE" />
                  <Area
                    type="monotone"
                    dataKey="이용대수"
                    fill="#0a955b"
                  ></Area>
                </AreaChart>
              </ResponsiveContainer>
            </GraphDiv>
          </InfoDiv>
        </InfoContainer>
      );
    default:
      <></>;
  }
}
