import { styled } from "styled-components";
import { useSelector } from "react-redux";

import Pallete from '../../../Pallete'
import { InfoContainer } from "./InfoDailyUsage";

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 1%;
`
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Info = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 3% 0;
  background-color: ${Pallete.main_font_light};
  &:nth-child(even){
    background-color: ${Pallete.side_color_light};
  }
`
const InfoText = styled.span`
  width: 10%;
  margin: 0 3% 0 1%;
  padding: 1%;
  background-color: ${Pallete.main_color_dark};
  color: ${Pallete.main_font_white};
  font-weight: bold;
  border-radius: 20px;
  text-align: center;
`
const InfoDetail = styled.div`
  width: 70%;
  font-size: 1.1rem;
  color: ${Pallete.side_color_dark};
`
const InfoType = styled.div`
  width: 3%;
  text-align: center;
  border-radius: 100%;
  padding: 1%;
  background-color: ${props => props.slow ? '#4db34d' : '#e6c404'};
  color: #000000;
`
export default function InfoInformation() {
  const info = useSelector(state => state.infoReducer)
  return (
    <InfoContainer>
      <RightDiv>
        <InfoDiv>
          <ul>
            <Info>
              <InfoText>충전소명</InfoText>
              {
                info.charger_name !== undefined ? (
                  info.charger_name.includes("완속")
                  ? (
                    <>
                      <InfoDetail>
                        {info.charger_name.replace("완속", "").trim()}
                      </InfoDetail>
                      <InfoType slow={true}>완속</InfoType>
                    </>
                  ) : (
                    <>
                      <InfoDetail>
                        {info.charger_name.replace("급속", "").trim()}
                      </InfoDetail>
                      <InfoType slow={false}>급속</InfoType>
                    </>
                  )
                ) : ''
                }
            </Info>
            <Info>
              <InfoText>충전기 ID</InfoText>
              <InfoDetail>{info.id}</InfoDetail>
            </Info>
            <Info>
              <InfoText>충전소 위치</InfoText>
              <InfoDetail>{info.charger_address}</InfoDetail>
            </Info>
            <Info>
              <InfoText>충전유형</InfoText>
              <InfoDetail>{info.type}</InfoDetail>
            </Info>
            <Info>
              <InfoText>시설구분</InfoText>
              <InfoDetail>{info.sub_category}</InfoDetail>
            </Info>
          </ul>
        </InfoDiv>
      </RightDiv>
    </InfoContainer>

  )
}