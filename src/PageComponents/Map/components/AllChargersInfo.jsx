import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Pallete from "../../../Pallete";

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
  padding: 3%;
  margin: 0 1%;
  border: 2px solid ${Pallete.main_color_dark};
  border-radius: 10px;
  background: ${({ selected }) => selected ? `linear-gradient(to right, ${Pallete.main_color_light}, ${Pallete.main_color_dark})` : ''};
  color: ${(props) => (props.selected ? Pallete.main_font_white : Pallete.main_color_dark)};
`;
const AddressDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
  width: 90%;
  padding: 2% 0;
  font-size: 1.2rem;
  color: ${Pallete.main_color_dark};
  font-weight: bold;
  color:${Pallete.main_font_dark};
`;
const AddressIcon = styled.div`
    width: 7%;
    filter: ${Pallete.filter_main_color_dark};
`
const UpperRightDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 50%;
`;
const Chargers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ChargerInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`
const ChargerAmountDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 100%;
    border-radius: 30px;
    padding: 2%;
    margin-bottom: 2%;
    background-color: ${Pallete.main_font_light};
    color: ${Pallete.main_font_white};
`
const ChargerSpan = styled.span`
  font-size: ${(props) => props.size}rem;
  color: ${(props) => props.color};
  margin-bottom: 1%;
  text-shadow: ${props => props.shadow ? '0 1px 5px #9b9476' :  ''};
`;

const AllChargerInfo = ({ originData, setData }) => {
    const [chargersInfoData, setChargersInfoData] = useState(originData)
    const dispatch = useDispatch()
    const filter = useSelector((state) => state.filterReducer);
    const curAddress = useSelector(state => state.addressReducer)
    const clickButton = (e) => {
        if (e.target.innerHTML === "전체") {
            dispatch({ type: 'showAllType', payload: { ...filter, type: "" } })
        } else if (e.target.innerHTML === "완속") {
            dispatch({ type: 'onlySlowType', payload: { ...filter, type: "완속" } })
        } else {
            dispatch({ type: 'onlyFastType', payload: { ...filter, type: "급속" } })
        }
    };
    useEffect(() => {
        if (filter.category === "" && filter.town === "" && filter.type === '' && filter.keyword === '') {
            setChargersInfoData(originData);
            setData(originData)
        } else {
            setChargersInfoData(originData.filter(el => el.main_category.includes(filter.category) &&
                el.town.includes(filter.town) && el.type.includes(filter.type) && el.location.includes(filter.keyword)));
            setData(originData.filter(el => el.main_category.includes(filter.category) &&
                el.town.includes(filter.town) && el.type.includes(filter.type) && el.location.includes(filter.keyword)))
        }
    }, [originData, filter]);

    return (
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
                <AddressDiv>
                    <AddressIcon>
                        <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </AddressIcon>

                    <span>{curAddress}</span>
                </AddressDiv>
            </UpperLeftDiv>
            <UpperRightDiv>
                <Chargers>
                    <ChargerInfoDiv>
                        <ChargerSpan color={Pallete.main_font_dark}>
                            전체
                        </ChargerSpan>
                        <ChargerAmountDiv>
                            <ChargerSpan size={window.innerWidth / 1000 + 0.5} color={Pallete.main_font_white} shadow={true}>
                                {chargersInfoData.length}
                            </ChargerSpan>
                        </ChargerAmountDiv>

                    </ChargerInfoDiv>
                    <ChargerInfoDiv>
                    <ChargerSpan color={Pallete.main_font_dark}>
                            완속
                        </ChargerSpan>
                        <ChargerAmountDiv>
                            <ChargerSpan size={window.innerWidth / 1000 + 0.5} color={Pallete.main_font_white} shadow={true}>
                                {chargersInfoData.filter((el) => el.type === "완속").length}
                            </ChargerSpan>
                        </ChargerAmountDiv>
                    </ChargerInfoDiv>
                    <ChargerInfoDiv>
                    <ChargerSpan color={Pallete.main_font_dark}>
                            급속
                        </ChargerSpan>
                        <ChargerAmountDiv>
                            <ChargerSpan size={window.innerWidth / 1000 + 0.5} color={Pallete.main_font_white} shadow={true}>
                                {chargersInfoData.filter((el) => el.type.includes("급속")).length}
                            </ChargerSpan>
                        </ChargerAmountDiv>
                    </ChargerInfoDiv>
                </Chargers>
            </UpperRightDiv>
        </UpperDiv>
    )
}
export default AllChargerInfo