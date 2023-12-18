import { useEffect, useState } from "react";
import { styled } from "styled-components";
import charger from "../data/data";

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
`;
const SeveralChargers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 2px solid black;
`;
const SeveralTypeDiv = styled.div`
  width: 40%;
  border: 1px solid purple;
`;
const SeveralAmountDiv = styled.div`
  width: 60%;
  border: 1px solid indigo;
`;
const ChargerSpan = styled.span`
  font-size: ${(props) => props.size}rem;
  color: ${(props) => props.color};
`;
const MapDiv = styled.div`
  width: 100%;
  height: 40vh;
`;
const InfoContainer = styled.div`
  width: 80%;
  text-align: center;
  padding: 10% 0;
`;

const { kakao } = window;

export default function Center({ data, setData, setInfo }) {
  const [type, setType] = useState();
  const clickButton = (e) => {
    if (e.target.innerHTML === "완속") {
      setType("slow");
    } else {
      setType("fast");
    }
  };

  const [level, setLevel] = useState(5);
  const [curLocation, setCurLocation] = useState([
    33.50678335808446, 126.49279871079412,
  ]);
  const [curAddress, setCurAddress] = useState('제주특별자치도 제주시 용담2동')

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(curLocation[0], curLocation[1]),
      level: level,
    };
    const map = new kakao.maps.Map(container, options);

    var geocoder = new kakao.maps.services.Geocoder();
    data.forEach((el) => {
      geocoder.addressSearch(
        `${el.charger_address}`,
        function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
              content: `<div class='infowindow'>
                <span class='location'>
                  ${el.location}
                </span>
                <div>
                  사용 가능 대수 : ${
                    data.filter((item) => item.location === el.location).length
                  }
                </div>
              </div>`,
            });

            kakao.maps.event.addListener(marker, "mouseover", function () {
              // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
              infowindow.open(map, marker);
              console.log(map.getLevel());
            });

            // 마커에 마우스아웃 이벤트를 등록합니다
            kakao.maps.event.addListener(marker, "mouseout", function () {
              // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
              infowindow.close();
            });
            kakao.maps.event.addListener(marker, "click", function () {
              // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
              setInfo(el)
            });
          }
        }
      );
    });
    // 줌 할때마다 현재 레벨 가져오기
    kakao.maps.event.addListener(map, "zoom_changed", function () {
      setLevel(map.getLevel());
    });
    //클릭할 때 마다 위도 경도 정보 가져오기
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      var latlng = mouseEvent.latLng;
      setCurLocation([latlng.getLat(), latlng.getLng()]);
    });
    kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {

          for(var i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === 'H') {
                  setCurAddress(result[i].address_name)
                  break;
              }
          }
      }    
  }
  }, [data]);
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
          <AddressDiv>{curAddress}</AddressDiv>
        </UpperLeftDiv>
        <UpperRightDiv>
          <Chargers>
            <ChargerSpan size="0.8" color="black">
              충전기 대수
            </ChargerSpan>
            <ChargerSpan size="1.2" color="blue">
              {data.length}
            </ChargerSpan>
          </Chargers>
          <Chargers>
            <SeveralChargers>
              <SeveralTypeDiv>완속</SeveralTypeDiv>
              <SeveralAmountDiv>{data.filter(el => el.type ==='완속').length}</SeveralAmountDiv>
            </SeveralChargers>
            <SeveralChargers>
              <SeveralTypeDiv>급속</SeveralTypeDiv>
              <SeveralAmountDiv>{data.filter(el => el.type.includes('급속')).length}</SeveralAmountDiv>
            </SeveralChargers>
          </Chargers>
        </UpperRightDiv>
      </UpperDiv>
      <MapDiv id="map"></MapDiv>
    </CenterDiv>
  );
}
