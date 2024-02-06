import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSelector, dispatch } from "react-redux";
import Information from './Information'
import { FilterCombobox, FilterComboOption } from "./Left";
import { BarChart, Line, Bar, AreaChart, Area, ReferenceLine, XAxis, YAxis, Tooltip, LabelList, ResponsiveContainer, CartesianGrid, ComposedChart } from "recharts";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  border: 1px solid green;
`
const GraphComboBox = styled(FilterCombobox)`
  width: 20%;
  margin: 2% 1%;
  padding: 1% 0;
`
const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid pink;
`
const GraphDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 1%;
  margin: 1%;
  border: 1px solid blue;
`;
const TitleDiv = styled.div`
    width: 100%;
    text-align: center;
`

export default function TabInformation({ data }) {
    const idx = useSelector(state => state.idxReducer)
    const [selectedDay, setSelectedDay] = useState("월요일")
    const [dataPerTime, setDataPerTime] = useState([])
    const setDataByDay = (e) => {
        setSelectedDay(e.target.value)
    }

    useEffect(() => {
        const dayFilterdData = data.filter(el => el.date === selectedDay)
        setDataPerTime(Array.from({ length: 24 }, (_, i) => i + 1).map(time => {
            return ({
                time: time.toString() + "시",
                충전대수: dayFilterdData.filter(el => parseInt(el.start_time.slice(0, 3)) === time).length

            }
            )
        }))
    }, [selectedDay, data, idx])

    const dataPerDay = ["월요일", "화요일", "수요일", "목요일", "금요일"].map(
        (day) => {
            return {
                day: day,
                충전시간: Math.round(
                    data
                        .filter((el) => el.date === day)
                        .reduce((acc, cur) => acc + cur.minute, 0)
                ),
                충전대수: data.filter((el) => el.date === day).length
            }
        }
    );
    const monthDay = Array.from({ length: 15 }, (_, i) => i + 1).map(
        (day) => {
            const dayData = data.filter(el => parseInt(el.start_date.slice(5, 7)) === day)
            return {
                day: day.toString() + "일",
                이용률: dayData.length > 0 ?
                    Math.round(
                        dayData.reduce((acc, cur) => acc + cur.minute, 0) / (dayData.length * 1440) * 100
                    ) : 0
            }
        }
    )
    console.log(dataPerDay.day)
    switch (idx) {
        case 0:
            return (
                <InfoContainer>
                    <Information></Information>
                </InfoContainer>
            )
        case 1:
            return (
                <InfoContainer>
                    <GraphComboBox id='select_day' onChange={setDataByDay}>
                        {["월요일", "화요일", "수요일", "목요일", "금요일"].map(el => {
                            return (
                                <FilterComboOption value={el} key={el}>{el}</FilterComboOption>
                            )
                        })}

                    </GraphComboBox>
                    <InfoDiv>
                        <GraphDiv>
                            <ResponsiveContainer width='100%' aspect={4.0 / 3.0}>
                                <TitleDiv>
                                    <h2>충전기 총 이용 시간(단위 : 분)</h2>
                                </TitleDiv>
                                <ComposedChart data={dataPerDay}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                    <Bar
                                        yAxisId="left"
                                        dataKey="충전시간"
                                        fill="#b3b3b3"
                                        shape={(props) => (
                                            <rect
                                                {...props}
                                                fill={props.payload.day === selectedDay ? "#b157bd" : "#f0cc20"}
                                            />
                                        )}
                                    >
                                    </Bar>
                                    <Tooltip></Tooltip>
                                    <Line yAxisId="right" dataKey="충전대수" stroke="#ff7300" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </GraphDiv>
                        <GraphDiv>
                            <ResponsiveContainer width='100%' aspect={4.0 / 3.0}>
                                <TitleDiv>
                                    <h2>{selectedDay} 시간별 이용 대수</h2>
                                </TitleDiv>
                                <AreaChart data={dataPerTime}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <ReferenceLine x={50} stroke="red" label="Max PV PAGE" />
                                    <Area type="monotone" dataKey="충전대수" fill="#0a955b">
                                    </Area>
                                </AreaChart>
                            </ResponsiveContainer>
                        </GraphDiv>
                    </InfoDiv>
                </InfoContainer>
            )
    }
}
