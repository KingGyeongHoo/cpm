
const initialState = { category: "", town: "", type: "", keyword: "" };
export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "showAllType":
      return action.payload;
    case "onlySlowType":
      return action.payload;
    case "onlyFastType":
      return action.payload;
    case "SelectCategory":
      return action.payload;
    case "AllCategory":
      return action.payload;
      case "SelectTown":
        return action.payload;
      case "AllTown":
        return action.payload;
      case "Search":
      return action.payload;
    default:
      return initialState;
  }
};
