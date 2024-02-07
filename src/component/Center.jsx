import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const CenterDiv = styled.div`
  width: 80%;
  padding: 1%;
  box-shadow: 0px 2px 1px #015aae;
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
`;
const TypeDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
`;
const TypeButton = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  background-color: ${(props) => (props.selected ? "#015aae" : "white")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border: 1px solid #015aae;
`;
const AddressDiv = styled.div`
  width: 90%;
  padding: 2% 0;
  font-size: 1.2rem;
  color: #015aae;
  font-weight: bold;
`;
const UpperRightDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
`;
const Chargers = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #015aae;
`;
const SeveralChargers = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  border: 1px solid #015aae;
`;
const SeveralTypeDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  border: 1px solid #015aae;
`;
const SeveralAmountDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  border: 1px solid #015aae;
`;
const ChargerSpan = styled.span`
  margin-bottom: 3%;
  font-size: ${(props) => props.size}rem;
  color: ${(props) => props.color};
`;
const MapDiv = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
`;
const ModalContainer = styled.div`
  position: absolute;
  display: ${(props) => (props.openModal ? "flex" : "none")};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 50;
`;
const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 30px;
  padding: 1% 5% 2% 5%;
  z-index: 100;
`;
const ModalCloseDiv = styled.div`
  width: 5%;
  height: 5%;
  margin-left: 100%;
`;
const ModalCloseButton = styled.img`
  width: 100%;
`;
const ModalNameDiv = styled.div`
  display: flex;
  width: 60%;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;
`;
const ModalListDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  align-items: center;
  margin-top: 1%;
`;
const ModalDivided = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: baseline;
  margin-top: 2%;
`
const ModalListDividedDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-items: baseline;
  margin: 2% 2% 0 2%;
`;
const ModalList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2% 5%;
  z-index: 150;
  border-radius: 20px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.127);
  }
`;
const NoChargerDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 3% 5%;
  z-index: 150;
`
const LocationName = styled.div`
  width: 90%;
`;
const UseableMark = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 1% 0 2%;
  background-color: #35ec35;
  border-radius: 100%;
`;
const { kakao } = window;

export default function Center({ serverData }) {
  const originData = serverData

  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filterReducer);
  const clickButton = (e) => {
    if (e.target.innerHTML === "전체") {
      dispatch({type: 'showAllType', payload:{ ...filter, type: "" }})
    } else if(e.target.innerHTML === "완속"){
      dispatch({type: 'onlySlowType', payload:{ ...filter, type: "완속" }})
    } else {
      dispatch({type: 'onlyFastType', payload:{ ...filter, type: "급속" }})
    }
  };
  const [data, setData] = useState(originData);
  useEffect(() => {
    if (filter.category === "" && filter.town === "" && filter.type === '' && filter.keyword === '') {
      setData(originData);
    } else {
      setData(originData.filter(el => el.main_category.includes(filter.category) && 
      el.town.includes(filter.town) && el.type.includes(filter.type) && el.location.includes(filter.keyword)));
    }
  }, [originData, filter]);

  const [level, setLevel] = useState(5);
  const [curLocation, setCurLocation] = useState([
    33.50678335808446, 126.49279871079412,
  ]);
  const [curAddress, setCurAddress] = useState("제주특별자치도 제주시 용담2동");
  const [curChargerLocation, setCurChargerLocation] = useState();

  const setInfo = (el) => {
    dispatch({type: 'updateInfo', info: el})
  }

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
            });

            // 마커에 마우스아웃 이벤트를 등록합니다
            kakao.maps.event.addListener(marker, "mouseout", function () {
              // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
              infowindow.close();
            });
            kakao.maps.event.addListener(marker, "click", function () {
              // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
              setCurChargerLocation(el.location);
              setOpenModal(true);
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
        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            setCurAddress(result[i].address_name);
            break;
          }
        }
      }
    }
  }, [data]);

  const filteredData = data.filter((el) => el.location === curChargerLocation);
  const [openModal, setOpenModal] = useState(false);
  return (
    <CenterDiv>
      <UpperDiv>
        <UpperLeftDiv>
          <TypeDiv>
          <TypeButton
              selected={filter.type === "" ? true : false}
              onClick={clickButton}
            >
              전체
            </TypeButton>
            <TypeButton
              selected={filter.type === "완속" ? true : false}
              onClick={clickButton}
            >
              완속
            </TypeButton>
            <TypeButton
              selected={filter.type === "급속" ? true : false}
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
            <ChargerSpan size="1.5" color="#015aae">
              {data.length}
            </ChargerSpan>
          </Chargers>
          <Chargers>
            <SeveralChargers>
              <SeveralTypeDiv>완속</SeveralTypeDiv>
              <SeveralAmountDiv>
                {data.filter((el) => el.type === "완속").length}
              </SeveralAmountDiv>
            </SeveralChargers>
            <SeveralChargers>
              <SeveralTypeDiv>급속</SeveralTypeDiv>
              <SeveralAmountDiv>
                {data.filter((el) => el.type.includes("급속")).length}
              </SeveralAmountDiv>
            </SeveralChargers>
          </Chargers>
        </UpperRightDiv>
      </UpperDiv>
      <MapDiv id="map">
        <ModalContainer openModal={openModal}>
          <ModalDiv>
            <ModalCloseDiv onClick={() => setOpenModal(!openModal)}>
              <ModalCloseButton src="https://www.svgrepo.com/show/521564/close.svg"></ModalCloseButton>
            </ModalCloseDiv>
            <ModalNameDiv>{curChargerLocation}</ModalNameDiv>
            {filteredData.length < 6 ? (
              filteredData.length === 0 ? <NoChargerDiv>충전기 정보가 없습니다</NoChargerDiv> :
              <ModalListDiv>
                {filteredData.map((el) => {
                  return (
                    <ModalList onClick={() => setInfo(el)}>
                      <LocationName>{el.charger_name}</LocationName>
                      <UseableMark></UseableMark>
                    </ModalList>
                  );
                })}
              </ModalListDiv>
            ) : (
              <ModalDivided overTwenty={filteredData.length >= 18 ? true : false}>
                <ModalListDividedDiv>
                  {filteredData.slice(0, parseInt(filteredData.length/2)).map((el) => {
                    return (
                      <ModalList onClick={() => setInfo(el)}>
                        <LocationName>{el.charger_name}</LocationName>
                        <UseableMark></UseableMark>
                      </ModalList>
                    );
                  })}
                </ModalListDividedDiv>
                <ModalListDividedDiv>
                {filteredData.slice(parseInt(filteredData.length/2)).map((el) => {
                  return (
                    <ModalList onClick={() => setInfo(el)}>
                      <LocationName>{el.charger_name}</LocationName>
                      <UseableMark></UseableMark>
                    </ModalList>
                  );
                })}
              </ModalListDividedDiv>
            </ModalDivided>
            )}
          </ModalDiv>
        </ModalContainer>
      </MapDiv>
    </CenterDiv>
  );
}
