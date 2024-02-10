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

const CustomScatter = ({ cx, cy, payload, chargerId }) => {
    let color = '#8884d8'; // Default color
    if (payload.id.toString() === chargerId) {
      return <circle cx={cx} cy={cy} r={4} fill="red" />
    }
    return (
      <circle cx={cx} cy={cy} r={3} fill={color} />
    );
  }
  const CustomScatterTooltip = ({ active, payload, label }) => {
    if (active) {
      // payload는 데이터 포인트에 대한 정보를 가지고 있습니다.
      const cost = payload[0] ? payload[0].value : 0
      const usage = payload[1] ? payload[1].value : 0

      return (
        <CustomTooltipDiv>
          <CustumTooltipP>{payload[0].payload.id}</CustumTooltipP>
          <CustumTooltipP color="#63b382">{`비용: ${cost.toLocaleString()}원`}</CustumTooltipP>
          <CustumTooltipP color="#63b382">{`이용량: ${usage.toLocaleString()}kw`}</CustumTooltipP>
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
              <h2><TitleSpan>{chargerName}</TitleSpan></h2>
              <h3>cost</h3>
              <h4>{cost_rank}/{charger_sorted.length}</h4>
              <h5>usage</h5>
              <h4>{usage_rank}/{charger_sorted.length}</h4>
            </GraphDiv>
            <GraphDiv>
              <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
                <TitleDiv>
                  <h2>평균 이용량 비교</h2>
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
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="전체평균" fill={Pallete.main_color_light} />
                  <Bar dataKey="현재평균" fill={Pallete.side_color_light} />
                </BarChart>
              </ResponsiveContainer>
            </GraphDiv>
          </InfoDiv>
          <InfoDiv>
            <GraphDiv>
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
                  <Tooltip />
                  <Area type="monotone" dataKey="cost" stroke={Pallete.graph_color_dark_purple} fill={Pallete.graph_color_dark_purple} />
                </AreaChart>
              </ResponsiveContainer>
              <p>Maybe some other content</p>

              <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                  width={500}
                  height={200}
                  data={data}
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
                  <Tooltip />
                  <Area type="monotone" dataKey="useage" stroke={Pallete.graph_color_area_fill} fill={Pallete.graph_color_area_fill} />
                </AreaChart>
              </ResponsiveContainer>
            </GraphDiv>
            <GraphDiv>
              <TitleDiv>
                <h2>분산</h2>
              </TitleDiv>
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
                  <XAxis type="number" dataKey="cost" name="cost" unit="won" />
                  <YAxis type="number" dataKey="usage" name="usage" unit="kw" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomScatterTooltip />} />
                  <Scatter name="A school" data={scatterArr} fill={Pallete.graph_color_dark_purple} shape={<CustomScatter chargerId={chargerId} />} />
                </ScatterChart>
              </ResponsiveContainer>
            </GraphDiv>
          </InfoDiv>
        </InfoContainer>
    )
}
export default Info_statistics