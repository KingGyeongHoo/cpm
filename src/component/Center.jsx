import { useEffect, useState } from "react";
import { styled } from "styled-components";

const CenterDiv = styled.div`
  width: 60%;
  padding: 1%;
  border: 1px solid green;
`;
const UpperDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const UpperLeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border: 1px solid brown;
`;
const TypeDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  border: 1px solid aquamarine;
`;
const TypeButton = styled.div`
  width: 50%;
  background-color: ${(props) => (props.selected ? "blue" : "white")};
  color: ${(props) => (props.selected ? "white" : "black")};
`;
const AddressDiv = styled.div`
  width: 90%;
  border: 1px solid coral;
`;
const UpperRightDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  border: 1px solid brown;
`;
const Chargers = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  border: 1px solid coral;
`
const SeveralChargers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 2px solid black;
`
const SeveralTypeDiv = styled.div`
  width: 40%;
  border: 1px solid purple;
`
const SeveralAmountDiv = styled.div`
  width: 60%;
  border: 1px solid indigo;
`
const ChargerSpan = styled.span`
  font-size: ${props => props.size}rem;
  color: ${props => props.color};
`
const MapDiv = styled.div`
  width: 100%;
  height: 40vh;
`

const {kakao} = window;
export default function Center() {
  const [type, setType] = useState();
  const clickButton = (e) => {
    if (e.target.innerHTML === "완속") {
      setType("slow");
    } else {
      setType("fast");
    }
  };

  useEffect(() => {
    const container = document.getElementById('map')
    const options = {
			center: new kakao.maps.LatLng(33.50678335808446, 126.49279871079412),
			level: 10
		};

		const map = new kakao.maps.Map(container, options);

    //mapData.forEach(el => {
    //   const markerPosition  = new kakao.maps.LatLng(el.x, el.y); 
    //   const marker = new kakao.maps.Marker({
    //     position: markerPosition
    // });
    // marker.setMap(map);
    // }) 데이터 전체를 이용한 마커
    const markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);

  }, [])
  return (
    <CenterDiv>
      <UpperDiv>
        <UpperLeftDiv>
          <TypeDiv>
            <TypeButton
              selected={type === "slow" ? true : false}
              onClick={clickButton}
            >
              완속
            </TypeButton>
            <TypeButton
              selected={type === "fast" ? true : false}
              onClick={clickButton}
            >
              급속
            </TypeButton>
          </TypeDiv>
          <AddressDiv>제주시 재주부리는곰동 공중제비리</AddressDiv>
        </UpperLeftDiv>
        <UpperRightDiv>
          <Chargers>
            <ChargerSpan size='0.8' color='black'>충전기 대수</ChargerSpan>
            <ChargerSpan size='1.2' color='blue'>2200</ChargerSpan>
          </Chargers>
          <Chargers>
            <SeveralChargers>
              <SeveralTypeDiv>완속</SeveralTypeDiv>
              <SeveralAmountDiv>1000</SeveralAmountDiv>
            </SeveralChargers>
            <SeveralChargers>
              <SeveralTypeDiv>급속</SeveralTypeDiv>
              <SeveralAmountDiv>1200</SeveralAmountDiv>
            </SeveralChargers>
          </Chargers>
        </UpperRightDiv>
      </UpperDiv>
      <MapDiv id='map'>
        
      </MapDiv>
    </CenterDiv>
  );
}
