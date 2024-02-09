import { useState } from "react";
import { styled } from "styled-components";

import AllChargerInfo from "./components/AllChargersInfo";
import Map from "./components/Map";

const CenterDiv = styled.div`
  font-family: 'TheJamsil5Bold';
  font-weight: 300;
  width: 80%;
  padding: 1%;
`;

export default function Center({ serverData }) {
  const originData = serverData
  const [data, setData] = useState(originData);

  return (
    <CenterDiv>
      <AllChargerInfo originData={originData} setData={setData}></AllChargerInfo>
      <Map data={data}></Map>
    </CenterDiv>
  );
}
