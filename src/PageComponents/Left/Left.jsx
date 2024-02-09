import { styled } from "styled-components";
import { useSelector } from "react-redux";

import SearchBar from "./components/SearchBar";
import FilterBox from "./components/FilterBox";
import TimeComponent from "./components/TimeComponent";
import Pallete from "../../Pallete";

const LeftDiv = styled.div`
  font-family: 'TheJamsil5Bold';
  font-weight: 300;
  display: flex;
  flex-direction: column;
  width: 20%;
  padding: 1%;
`;
const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1% 0;
`;
export const FilterCombobox = styled.select`
  width: 100%;
  margin: 5% 0;
  padding: 5% 3%;
  border: 1px solid black;
  border-radius: 20px;
  &:focus{
    outline: none;
  }
`;
export const FilterComboOption = styled.option`
  color: black;
  border: 1px solid #015aae;
  &:focus{
    outline: 1px solid #015aae;
  }
`

export default function Left({category, town}) {
  const filter = useSelector(state => state.filterReducer)

  const categorySetting = {
    type:"시설구분",
    selectAll: "AllCategory",
    selectSomething: "SelectCategory",
    changeValue: "category"
  }
  const townSetting = {
    type:"위치",
    selectAll: "AllTown",
    selectSomething: "SelectTown",
    changeValue: "town"
  }

  return (
    <LeftDiv>
      <SearchBar filter={filter}></SearchBar>
      <FilterDiv>
        <FilterBox data={category} settingInfo={categorySetting} filter={filter}></FilterBox>
        <FilterBox data={town} settingInfo={townSetting} filter={filter}></FilterBox>
      </FilterDiv>
      <TimeComponent></TimeComponent>
    </LeftDiv>
  );
}
