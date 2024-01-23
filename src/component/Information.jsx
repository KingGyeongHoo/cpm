import { styled } from "styled-components";
import { useSelector } from "react-redux";

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
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
  width: 100%;
  margin: 5% 0;
  padding: 3% 0;
  border-bottom: 2px solid #015aae;
`
const InfoText = styled.span`
  width: 30%;
  color: #176ab8;
  font-weight: bold;
`
const InfoDetail = styled.div`
  width: 60%;
  font-size: 1.1rem;
`
export default function Information(){
  const info = useSelector(state => state.infoReducer)
  return(
    <RightDiv>
      <InfoDiv>
        <ul>
            <Info>
              <InfoText>충전기 ID</InfoText>
              <InfoDetail>{info.id}</InfoDetail>
            </Info>
            <Info>
              <InfoText>충전소 위치</InfoText>
              <InfoDetail>{info.charger_address}</InfoDetail>
            </Info>
            <Info>
              <InfoText>충전소명</InfoText>
              <InfoDetail>{info.charger_name}</InfoDetail>
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
  )
}