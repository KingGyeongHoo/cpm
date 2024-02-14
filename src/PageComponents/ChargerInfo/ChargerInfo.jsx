import { useEffect, useState, useMemo } from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import TabInformation from "./components/TabInformation";
import Pallete from "../../Pallete";

import AWS from "aws-sdk";

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 100%;
  padding: 2% 1%;
  color: ${Pallete.side_color_dark};
`
const TabList = styled.div`
  width: 90%;
  padding: 5%;
  margin: 3% 0;
  border-left: 5px solid ${props => props.selected ? '' : '{Pallete.side_color_dark}'};
  font-weight: ${props => props.selected ? 'bold' : ''};
  &:hover{
    background-color: ${Pallete.side_color_dark};
    color: ${Pallete.main_font_white};
    border-radius: 10px;
  }
`

export default function ChargerInfo({chargerIdArray}) {
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([])
  const info = useSelector(state => state.infoReducer)
  
  useEffect(() => {
    // AWS 설정
    AWS.config.update({
      region: process.env.REACT_APP_region,
      accessKeyId: process.env.REACT_APP_accessKeyId,
      secretAccessKey: process.env.REACT_APP_secretAccessKey,
    });

    // S3 객체 생성
    const s3 = new AWS.S3();

    // S3에서 파일 읽기
    const params = { Bucket: "chargers-list/useage-record", Key: "ChargerUseData.json" };

    s3.getObject(params, (err, result) => {
      if (err) {
        console.error("Error fetching data from S3:", err);
      } else {
        const fileContent = result.Body.toString("utf-8");
        const data = JSON.parse(fileContent)
        setAllData(data)
        const allInfo = {
          average_cost: Math.round(data.reduce((acc, cur) => acc + cur.cost/1, 0) / data.length),
          average_usage: Math.round(data.reduce((acc, cur) => acc + cur.useage/1, 0) / data.length)
        }
        dispatch({type:'SETINFO', figure:allInfo})
      }
    });
  }, []);

  const charger_sorted = useMemo(() => {
    return chargerIdArray.map(id => {
      const filtered = allData.filter(el => el.id.toString() === id.toString())
      return {
        id: id,
        cost: filtered.length > 0 ? 
        Math.round(filtered.reduce((acc, cur) => acc +cur.cost, 0) / filtered.length) : 0,
        usage: filtered.length > 0 ? 
        Math.round(filtered.reduce((acc, cur) => acc + cur.useage, 0) / filtered.length) : 0
      }
    })
  }, [allData, chargerIdArray])

  useEffect(() => {
    setData(allData.filter((el) => parseInt(el.id) === info.id))
  }, [info])
  const selectedIndex = useSelector(state => state.idxReducer)
  return (
    <>
      <TabContainer>
        {["충전소 정보", "요일별 이용률", "일별 이용률", "통계"].map((el, idx) => {
          return(
            <TabList
              key={idx}
              onClick={() => dispatch({ type: idx.toString()})}
              selected={selectedIndex === idx ? true : false}
            >{el}</TabList>
          )
        })}
      </TabContainer>
      <TabInformation data={data} charger_sorted={charger_sorted}></TabInformation>
    </>
  );
}
