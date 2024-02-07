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
const DescH5 = styled.h5`
    color: ${props => props.color};
    text-align: right;
`
export default function TabInformation({ data }) {
  const idx = useSelector((state) => state.idxReducer);
  const chargerName = useSelector((state) => state.infoReducer.charger_name);
  const [selectedDate, setSelectedDate] = useState("월요일");
  const [selectedMonth, setSelectedMonth] = useState(1);
//   const [dataPerTime, setDataPerTime] = useState([]);
  const setDataByDate = (e) => {
    setSelectedDate(e.target.value);
  };
  const setDataByMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

    const dayFilterdData = data.filter((el) => el.date === selectedDate);
    const dataPerTime = 
      Array.from({ length: 24 }, (_, i) => i + 1).map((time) => {
        return {
          time: time.toString() + "시",
          이용대수: dayFilterdData.filter(
            (el) => parseInt(el.start_time.slice(0, 3)) === time
          ).length,
        };
      })

  const dataPerDay = ["월요일", "화요일", "수요일", "목요일", "금요일"].map(
    (day) => {
        const dayData = data.filter((el) => el.date === day)
      return {
        day: day,
        충전시간: Math.round(
            dayData.reduce((acc, cur) => acc + cur.minute, 0)
        ),
        이용대수: data.filter((el) => el.date === day).length,
        이용률:
        dayData.length > 0
              ? Math.round(
                  (dayData.reduce((acc, cur) => acc + cur.minute, 0) /
                      (dayData.length * 1440)) *
                  100
              )
              : 0,
      };
    }
  );
  const daytaPerMonth = Array.from({ length: 12 }, (_, i) => i + 1).map(month => {
    const monthData = data.filter((el) => (new Date(el.start_date).getMonth()+1)/1 === month)
    return{
        month: month+"월",
        충전시간: Math.round(
            monthData.reduce((acc, cur) => acc + cur.minute, 0)
          ),
          이용률:
          monthData.length > 0
              ? Math.round(
                  (monthData.reduce((acc, cur) => acc + cur.minute, 0) /
                      (monthData.length * 1440)) *
                  100
              )
              : 0,
    }
  })

    const monthDay = Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
        const monthData = data.filter(el => (new Date(el.start_date).getMonth() + 1)/1 === selectedMonth / 1)
        return {
            day: day.toString() + "일",
            이용대수: monthData.filter(el => (new Date(el.start_date).getDate())/1 === day).length,
            이용시간: Math.round(
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
      const time = payload[0] ? payload[0].value : 0
      const amount = payload[1] ? payload[1].value : 0

      return (
        <CustomTooltipDiv>
          <CustumTooltipP>{label}</CustumTooltipP>
          <CustumTooltipP color="#6561bd">{`이용시간: ${time.toLocaleString()}분`}</CustumTooltipP>
          <CustumTooltipP color="#63b382">{`이용률: ${amount.toLocaleString()}%`}</CustumTooltipP>
        </CustomTooltipDiv>
      );
    }

    return null;
  };
  const CustomMonthlyTooltip = ({ active, payload, label }) => {
    if (active) {
      // payload는 데이터 포인트에 대한 정보를 가지고 있습니다.
      const time = payload[0] ? payload[0].value : 0
      const amount = payload[1] ? payload[1].value : 0

      return (
        <CustomTooltipDiv>
          <CustumTooltipP>{label}</CustumTooltipP>
          <CustumTooltipP color="#6561bd">{`이용시간: ${time.toLocaleString()}분`}</CustumTooltipP>
          <CustumTooltipP color="#63b382">{`이용률: ${amount.toLocaleString()}%`}</CustumTooltipP>
        </CustomTooltipDiv>
      );
    }

    return null;
  };
  const CustomUsageTooltip = ({ active, payload, label }) => {
    if (active) {
      // payload는 데이터 포인트에 대한 정보를 가지고 있습니다.
      const amount = payload[0] ? payload[0].value : 0

      return (
        <CustomTooltipDiv>
          <CustumTooltipP>{label}</CustumTooltipP>
          <CustumTooltipP color="#63b382">{`이용대수: ${amount.toLocaleString()}대`}</CustumTooltipP>
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
  const CustomMonthBar = ({ x, y, width, height, selectedMonth, payload }) => {
    const backgroundColor = selectedMonth+"월" === payload.month ? "#aba6f6" : "#eaeaea";
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
                  <DescH5 color="#ffffff">black</DescH5>
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
                    tickFormatter={(value) => value.toLocaleString() + "%"}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="충전시간"
                    fill="#8884d8"
                    shape={<CustomBar selectedDate={selectedDate}></CustomBar>}
                  ></Bar>
                  <Line
                    yAxisId="right"
                    dataKey="이용률"
                    stroke="#82ca9d"
                    activeDot={{ r: 7 }}
                    strokeWidth={3}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </GraphDiv>
            <GraphDiv>
              <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
                <TitleDiv>
                  <h2>{selectedDate} 시간별 이용 대수</h2>
                  <DescH5>Total : {dataPerTime.reduce((acc, cur) => acc + cur.이용대수, 0)}대</DescH5>
                </TitleDiv>
                <AreaChart data={dataPerTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis
                    tickFormatter={(value) => Number.isInteger(value) ? value.toLocaleString() + "대" : ''}
                  />
                  <Tooltip content={<CustomUsageTooltip />} />
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
    case 2:
      return (
          <InfoContainer>
              <GraphComboBox id="select_day" onChange={setDataByMonth}>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map((el) => {
                      return (
                          <FilterComboOption value={el} key={el}>
                              {el}월
                          </FilterComboOption>
                      );
                  })}
              </GraphComboBox>
          <InfoDiv>
            <GraphDiv>
              <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
                <TitleDiv>
                  <h2>{chargerName} 월별 이용률</h2>
                  <DescH5 color="#ffffff">black</DescH5>
                </TitleDiv>
                <ComposedChart data={daytaPerMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
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
                    tickFormatter={(value) => value.toLocaleString() + "%"}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="충전시간" fill="#8884d8" shape={<CustomMonthBar selectedMonth={selectedMonth}></CustomMonthBar>}></Bar>
                  <Tooltip content={<CustomMonthlyTooltip />}></Tooltip>
                  <Line
                    yAxisId="right"
                    dataKey="이용률"
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
                  <h2>{selectedMonth}월 일별 이용 대수</h2>
                  <DescH5>Total : {monthDay.reduce((acc, cur) => acc + cur.이용대수, 0)}대</DescH5>
                </TitleDiv>
                <AreaChart data={monthDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis
                    tickFormatter={(value) => Number.isInteger(value) ? value.toLocaleString() + "대" : ''}
                  />
                  <Tooltip content={<CustomUsageTooltip />} />
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
