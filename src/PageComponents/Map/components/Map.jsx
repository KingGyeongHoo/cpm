import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Pallete from "../../../Pallete";

const MapDiv = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
`
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
const Loading = styled.div`
    position: absolute;
    display: ${(props) => (props.isLoading ? "flex" : "none")};
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.5);
    color: ${Pallete.main_color_dark};
    font-size: 3rem;
    top: 0;
    left: 0;
    z-index: 50;
`
const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: center;
  align-items: center;
  background-color: ${Pallete.main_font_white};
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
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2%;
  color: ${Pallete.main_font_dark};
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
  width: 45%;
  justify-content: center;
  align-items: baseline;
  margin: 2% 2% 0 2%;
`;
const ModalList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  padding: 2% 5%;
  z-index: 150;
  border-radius: 20px;
  color: ${Pallete.main_color_dark};
  &:hover {
    background-color: ${Pallete.main_color_dark};
    color: ${Pallete.main_font_white};
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
  width: 75%;
`;
const TypeMark = styled.div`
    width: 15%;
    color: ${props => props.slow ? '#4db34d' : '#e6c404'};
    font-size: 0.9rem;
`
const UseableMark = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 1% 0 2%;
  background-color: #78d278;
  border-radius: 100%;
`;
const { kakao } = window;

const Map = ({ data }) => {
    const dispatch = useDispatch()

    const [curChargerLocation, setCurChargerLocation] = useState();
    const filteredData = data.filter((el) => el.location === curChargerLocation);
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [level, setLevel] = useState(5);
    const [curLocation, setCurLocation] = useState([
        33.50678335808446, 126.49279871079412,
    ]);

    const setInfo = (el) => {
        dispatch({ type: 'updateInfo', info: el })
    }

    useEffect(() => {
        setIsLoading(true)
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(curLocation[0], curLocation[1]),
            level: level,
        };
        const map = new kakao.maps.Map(container, options);

        var geocoder = new kakao.maps.services.Geocoder();
        data.forEach((el, idx) => {
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
                            content: `
                                <div class='infowindow'>
                                    <span class='location'>
                                        ${el.location}
                                    </span>
                                    <div class='available'>
                                        이용 가능 대수 : ${data.filter((item) => item.location === el.location).length}
                                    </div>
                                </div>
                            `,
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
                        dispatch({ type: "SETADDRESS", address: (result[i].address_name) });
                        break;
                    }
                }
            }
        }
        setTimeout(() =>{
            setIsLoading(false)
        }, 4000)
    }, [data]);
    return (
        <MapDiv id="map">
            <Loading isLoading={isLoading}>로딩중...</Loading>
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
                                            {el.charger_name.includes("완속")
                                                ? (
                                                    <>
                                                        <LocationName>
                                                            {el.charger_name.replace("완속", "").trim()}
                                                        </LocationName>
                                                        <TypeMark slow={true}>완속</TypeMark>
                                                    </>
                                                )
                                            : (
                                                <>
                                                    <LocationName>
                                                    {el.charger_name.replace("급속", "").trim()}
                                                    </LocationName>
                                                    <TypeMark slow={false}>급속</TypeMark>
                                                </>
                                            )
                                            }
                                            <UseableMark></UseableMark>
                                        </ModalList>
                                    );
                                })}
                            </ModalListDiv>
                    ) : (
                        <ModalDivided overTwenty={filteredData.length >= 18 ? true : false}>
                            <ModalListDividedDiv>
                                {filteredData.slice(0, parseInt(filteredData.length / 2)).map((el) => {
                                    return (
                                        <ModalList onClick={() => setInfo(el)}>
                                            {el.charger_name.includes("완속")
                                                ? (
                                                    <>
                                                        <LocationName>
                                                            {el.charger_name.replace("완속", "").trim()}
                                                        </LocationName>
                                                        <TypeMark slow={true}>완속</TypeMark>
                                                    </>
                                                )
                                            : (
                                                <>
                                                    <LocationName>
                                                    {el.charger_name.replace("급속", "").trim()}
                                                    </LocationName>
                                                    <TypeMark slow={false}>급속</TypeMark>
                                                </>
                                            )
                                            }
                                            <UseableMark></UseableMark>
                                        </ModalList>
                                    );
                                })}
                            </ModalListDividedDiv>
                            <ModalListDividedDiv>
                                {filteredData.slice(parseInt(filteredData.length / 2)).map((el) => {
                                    return (
                                        <ModalList onClick={() => setInfo(el)}>
                                            {el.charger_name.includes("완속")
                                                ? (
                                                    <>
                                                        <LocationName>
                                                            {el.charger_name.replace("완속", "").trim()}
                                                        </LocationName>
                                                        <TypeMark slow={true}>완속</TypeMark>
                                                    </>
                                                )
                                            : (
                                                <>
                                                    <LocationName>
                                                    {el.charger_name.replace("급속", "").trim()}
                                                    </LocationName>
                                                    <TypeMark slow={false}>급속</TypeMark>
                                                </>
                                            )
                                            }
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
    )

}
export default Map
