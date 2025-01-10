import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import TabInformation from "./components/TabInformation";
import Pallete from "../../Pallete";
import getUsageData from "../../functions/getUsageData";

import { useQuery } from "@tanstack/react-query";

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 100%;
  padding: 2% 1%;
  color: ${Pallete.side_color_dark};
`;
const TabList = styled.div`
  width: 90%;
  padding: 5%;
  margin: 3% 0;
  border-left: 5px solid
    ${(props) => (props.selected ? "" : "{Pallete.side_color_dark}")};
  font-weight: ${(props) => (props.selected ? "bold" : "")};
  &:hover {
    background-color: ${Pallete.side_color_dark};
    color: ${Pallete.main_font_white};
    border-radius: 10px;
  }
`;

export default function ChargerInfo({ chargerIdArray }) {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.infoReducer);
  const selectedIndex = useSelector((state) => state.idxReducer);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["charge"],
    queryFn: getUsageData,
  });
  if (isLoading) return <></>;
  if (isError) return <></>;

  const charger_sorted = () => {
    return chargerIdArray.map((id) => {
      const filtered = data.filter((el) => el.id.toString() === id.toString());
      return {
        id: id,
        cost:
          filtered.length > 0
            ? Math.round(
                filtered.reduce((acc, cur) => acc + cur.cost, 0) /
                  filtered.length
              )
            : 0,
        usage:
          filtered.length > 0
            ? Math.round(
                filtered.reduce((acc, cur) => acc + cur.useage, 0) /
                  filtered.length
              )
            : 0,
      };
    });
  };

  const allInfo = {
    average_cost: Math.round(
      data.reduce((acc, cur) => acc + cur.cost / 1, 0) / data.length
    ),
    average_usage: Math.round(
      data.reduce((acc, cur) => acc + cur.useage / 1, 0) / data.length
    ),
  };
  dispatch({ type: "SETINFO", figure: allInfo });

  const filteredData = data.filter((el) => parseInt(el.id) === info.id);
  return (
    <>
      <TabContainer>
        {["충전소 정보", "요일별 이용률", "일별 이용률", "통계"].map(
          (el, idx) => {
            return (
              <TabList
                key={idx}
                onClick={() => dispatch({ type: idx.toString() })}
                selected={selectedIndex === idx ? true : false}
              >
                {el}
              </TabList>
            );
          }
        )}
      </TabContainer>
      <TabInformation
        data={filteredData}
        charger_sorted={charger_sorted()}
      ></TabInformation>
    </>
  );
}
