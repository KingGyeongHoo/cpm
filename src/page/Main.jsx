import { styled } from "styled-components";
import Title from "../PageComponents/Title/Title";
import Left from "../PageComponents/Left/Left";
import Center from "../PageComponents/Map/Center";
import ChargerInfo from "../PageComponents/ChargerInfo/ChargerInfo";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import getData from "../functions/getData";
import Pallete from "../Pallete";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 96%;
  padding: 0% 2%;
  background-color: ${Pallete.main_font_white};
  border-bottom: 10px solid ${Pallete.main_color_light};
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  background-color: ${Pallete.side_color_light};
`;
const Loading = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  color: ${Pallete.main_color_dark};
  font-size: 3rem;
  top: 0;
  left: 0;
  z-index: 50;
`;
const Error = styled(Loading)`
  color: ${Pallete.main_font_dark};
`;
export default function Main() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all"],
    queryFn: getData,
  });

  if (isLoading) return <Loading>로딩중</Loading>;
  if (isError) return <Error>에러가 발생했습니다!</Error>;

  const allInfo = {
    average_cost: Math.round(
      data.reduce((acc, cur) => acc + cur.cost / 1, 0) / data.length
    ),
    average_usage: Math.round(
      data.reduce((acc, cur) => acc + cur.useage / 1, 0) / data.length
    ),
  };
  dispatch({ type: "SETINFO", figure: allInfo });

  const category = [...new Set(data.map((el) => el.main_category))];
  const town = [...new Set(data.map((el) => el.town))];

  return (
    <>
      <Title></Title>
      <MainContainer>
        <Left category={category} town={town} />
        <Center serverData={data} />
      </MainContainer>
      <InformationContainer>
        <ChargerInfo chargerIdArray={data.map((el) => el.id.toString())} />
      </InformationContainer>
    </>
  );
}
