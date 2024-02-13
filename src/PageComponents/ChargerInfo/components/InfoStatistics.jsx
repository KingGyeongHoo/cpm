import { styled } from 'styled-components'
import { useSelector } from "react-redux";
import {
  Legend,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { InfoContainer, InfoDiv, GraphDiv, TitleDiv, TitleSpan, CustomTooltipDiv, CustumTooltipP, DescH5 } from './InfoDailyUsage'
import Pallete from "../../../Pallete";

const IndexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`
const IndexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 48%;
  border-radius: 10px;
  border: 2px solid ${props => props.color};
`
const IndexTitleDiv = styled.div`
  text-align: center;
  width: 100%;
  padding: 2% 0;
  border: 2px solid ${props => props.color};
  border-radius: 10px 10px 0 0;
  background-color: ${props => props.color};
  color: white;
  font-size: 1.5rem;
`
const IndexDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2%;
  align-items: baseline;
`
const IndexSpan = styled.span`
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
  margin: 3% 0;
`

const CustomUsageTooltip = ({ active, payload, label }) => {
  if (active) {
      const allAvg = payload[0] ? payload[0] : 0
      const curAvg = payload[1] ? payload[1] : 0

      if (allAvg.payload.name === "가격") {
        return (
          <CustomTooltipDiv>
            <CustumTooltipP>{label}</CustumTooltipP>
            <CustumTooltipP color={Pallete.main_color_light}>
              {`전체 평균: ${allAvg.value.toLocaleString()}원`}
            </CustumTooltipP>
            <CustumTooltipP color={Pallete.side_color_light}>
              {`현재 평균: ${curAvg.value.toLocaleString()}원`}
            </CustumTooltipP>
          </CustomTooltipDiv>
        );
      } else {
        return (
          <CustomTooltipDiv>
            <CustumTooltipP>{label}</CustumTooltipP>
            <CustumTooltipP color={Pallete.main_color_light}>
              {`전체 평균: ${allAvg.value.toLocaleString()}kW`}
            </CustumTooltipP>
            <CustumTooltipP color={Pallete.side_color_light}>
              {`현재 평균: ${curAvg.value.toLocaleString()}kW`}
            </CustumTooltipP>
          </CustomTooltipDiv>
        );
      }
    }
    
    return null;
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        const avg = payload[0] ? payload[0] : 0
  
        if (avg.dataKey === "cost") {
          return (
            <CustomTooltipDiv>
              <CustumTooltipP>{label}</CustumTooltipP>
              <CustumTooltipP color={Pallete.graph_color_dark_purple}>
                {`평균 가격: ${avg.value.toLocaleString()}원`}
              </CustumTooltipP>
            </CustomTooltipDiv>
          );
        } else {
          return (
            <CustomTooltipDiv>
              <CustumTooltipP>{label}</CustumTooltipP>
              <CustumTooltipP color={Pallete.graph_color_dark_green}>
                {avg ? `평균 이용량: ${avg.value.toLocaleString()}kW` : ''}
              </CustumTooltipP>
            </CustomTooltipDiv>
          );
        }
      }
      
      return null;
    };

const CustomScatter = ({ cx, cy, payload, chargerId }) => {
    let color = Pallete.main_color_light; // Default color
    if (payload.id.toString() === chargerId) {
      return <circle cx={cx} cy={cy} r={4} fill="red" />
    }
    return (
      <circle cx={cx} cy={cy} r={3} fill={color} />
    );
  }
  const CustomScatterTooltip = ({ active, payload, chargerId, chargerName }) => {
    const pld = payload[0] ? payload[0].payload : ''
    if (active && pld.id === chargerId) {
      // payload는 데이터 포인트에 대한 정보를 가지고 있습니다.

      return (
        <CustomTooltipDiv>
          <CustumTooltipP>{chargerName}</CustumTooltipP>
          <CustumTooltipP color={Pallete.graph_color_dark_purple}>{pld.cost ? `평균 가격: ${pld.cost.toLocaleString()}원` : ''}</CustumTooltipP>
          <CustumTooltipP color={Pallete.graph_color_dark_green}>{pld.usage ? `평균 이용량: ${pld.usage.toLocaleString()}kw` : ''}</CustumTooltipP>
        </CustomTooltipDiv>
      );
    }

    return null;
  };


const Info_statistics = ({ data, charger_sorted }) => {
    const chargerName = useSelector((state) => state.infoReducer.charger_name);
    let chargerId = useSelector((state) => state.infoReducer.id)
    chargerId = chargerId ? chargerId.toString() : ''
    const figure = useSelector(state => state.figureReducer)
    const cost_rank = charger_sorted.sort((a, b) => b.cost - a.cost).findIndex(el => el.id === chargerId) + 1
    const usage_rank = charger_sorted.sort((a, b) => b.usage - a.usage).findIndex(el => el.id === chargerId) + 1
    const avg_cost = Math.round(data.reduce((acc, cur) => acc + cur.cost/1, 0) / data.length)
  const avg_usage = Math.round(data.reduce((acc, cur) => acc + cur.useage/1, 0) / data.length)
  const average = [
    { name: "가격", 전체평균: figure.average_cost, 현재평균: data.length < 1 ? 0 : avg_cost},
    { name: "이용량", 전체평균: figure.average_usage, 현재평균: data.length < 1 ? 0 : avg_usage}
  ]
  const reArrange = (array) => {
    const idx = array.findIndex(el => el.id === chargerId) + 1
    const slicedPart = array.slice(idx); // 39번째 요소부터 끝까지 추출
    const rest = array.slice(0, idx); // 0번째부터 38번째까지 추출

    return slicedPart.concat(rest);
  }
  const sortedDate = data.map(el => el).sort((a,b) => new Date(a.start_date) - new Date(b.start_date))
  const scatterArr = reArrange(charger_sorted)
  
    return(
        <InfoContainer>
          <InfoDiv>
            <GraphDiv>
              <h1><TitleSpan>{chargerName}</TitleSpan></h1>
              <IndexContainer>
                <IndexBox color={Pallete.graph_color_dark_purple}>
                  <IndexTitleDiv color={Pallete.graph_color_dark_purple}>평균 가격</IndexTitleDiv>
                  <IndexDiv color={Pallete.graph_color_dark_purple}>
                    <IndexSpan
                      color={Pallete.graph_color_dark_purple}
                      fontSize='3rem'
                    >
                      {cost_rank}
                    </IndexSpan>
                    <IndexSpan
                      color={Pallete.graph_color_dark_purple}
                      fontSize='1.5rem'
                    >
                      {
                        cost_rank % 10 === 1 ? 'st' : 
                        cost_rank % 10 === 2 ? 'nd':
                        cost_rank % 10 === 3 ? 'rd' : 'th'
                      }
                    </IndexSpan>
                    <IndexSpan>
                      /{charger_sorted.length}
                    </IndexSpan>
                  </IndexDiv>
                </IndexBox>
                <IndexBox color={Pallete.graph_color_area_fill}>
                  <IndexTitleDiv color={Pallete.graph_color_area_fill}>평균 사용량</IndexTitleDiv>
                  <IndexDiv>
                    <IndexSpan
                      color={Pallete.graph_color_area_fill}
                      fontSize='3rem'
                    >
                      {usage_rank}
                    </IndexSpan>
                    <IndexSpan
                      color={Pallete.graph_color_area_fill}
                      fontSize='1.5rem'
                    >
                      {
                        usage_rank % 10 === 1 ? 'st' : 
                        usage_rank % 10 === 2 ? 'nd':
                        usage_rank % 10 === 3 ? 'rd' : 'th'
                      }
                    </IndexSpan>
                    <IndexSpan>
                      /{charger_sorted.length}
                    </IndexSpan>
                  </IndexDiv>
                </IndexBox>
              </IndexContainer>
              <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
                <Scatter figure={figure} ></Scatter>
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis type="number" dataKey="cost" tick={{fontSize: 10}} name="cost" unit="원" />
                  <YAxis type="number" dataKey="usage" tick={{fontSize: 10}} name="usage" unit="kW" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomScatterTooltip chargerId={chargerId} chargerName={chargerName}/>} />
                  <Scatter name="scatter" data={scatterArr} fill={Pallete.main_color_light} shape={<CustomScatter chargerId={chargerId} />} />
                </ScatterChart>
              </ResponsiveContainer>
            </GraphDiv>
            <GraphDiv>
              <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
                <TitleDiv>
                  <h2>평균 가격/이용량 비교</h2>
                  <DescH5 color={Pallete.main_font_white}>Total : black</DescH5>
                </TitleDiv>
                <BarChart
                  width={500}
                  height={300}
                  data={average}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Legend />
                  <Tooltip content={<CustomUsageTooltip></CustomUsageTooltip>}/>  
                  <Bar dataKey="전체평균" fill={Pallete.side_color_light}/>
                  <Bar dataKey="현재평균" fill={Pallete.main_color_light}/>
                </BarChart>
              </ResponsiveContainer>
            </GraphDiv>
          </InfoDiv>
          <InfoDiv>
            <GraphDiv width='100%'>
              <TitleDiv>
                <h2>연간 가격/이용량 변동</h2>
                <DescH5 color={Pallete.main_font_white}>Total : black</DescH5>
              </TitleDiv>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                  width={500}
                  height={200}
                  data={sortedDate}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="start_date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="cost" stroke={Pallete.graph_color_dark_purple} fill={Pallete.graph_color_dark_purple} />
                </AreaChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                  width={500}
                  height={200}
                  data={sortedDate}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="start_date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="useage" stroke={Pallete.graph_color_area_fill} fill={Pallete.graph_color_area_fill} />
                </AreaChart>
              </ResponsiveContainer>
            </GraphDiv>
          </InfoDiv>
        </InfoContainer>
    )
}
export default Info_statistics