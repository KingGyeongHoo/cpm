import { styled } from "styled-components";

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  padding: 1%;
  border: 1px solid pink;
`
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid green;
`
const Info = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 5% 0;
  border: 1px solid aqua;
`
const InfoText = styled.span`
  width: 30%;
`
const InfoDetail = styled.div`
  width: 60%;
  border: 1px solid blue;
`
export default function Right(){
  return(
    <RightDiv>
      <InfoDiv>
        <ul>
          <li>
            <Info>
              <InfoText>충전기 ID</InfoText>
              <InfoDetail>142314123423</InfoDetail>
            </Info>
          </li>
          <li>
            <Info>
              <InfoText>충전소 위치</InfoText>
              <InfoDetail>제주도 서귀포시 어딘가</InfoDetail>
            </Info>
          </li>
          <li>
            <Info>
              <InfoText>충전소명</InfoText>
              <InfoDetail>서귀포귀때기</InfoDetail>
            </Info>
          </li>
          <li>
            <Info>
              <InfoText>충전유형</InfoText>
              <InfoDetail>완속</InfoDetail>
            </Info>
          </li>
          <li>
            <Info>
              <InfoText>시설구분</InfoText>
              <InfoDetail>상업시설</InfoDetail>
            </Info>
          </li>
        </ul>
      </InfoDiv>
    </RightDiv>
  )
}