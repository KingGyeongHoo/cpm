
const filterState = { category: "", town: "", type: "", keyword: "" };
export const filterReducer = (state = filterState, action) => {
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
      return state;
  }
};

const infoState = {}
export const infoReducer = (state = infoState, action) => {
  switch (action.type) {
    case 'updateInfo':
      return action.info
    default:
      return state
  }
}

const idxState = 0
export const idxReducer = (state = idxState, action) => {
  switch (action.type) {
    case '0':
      return 0
    case '1':
      return 1
    case '2':
      return 2
    case '3':
      return 3
    default:
      return state
  }
}

const figureState = {}
export const figureReducer = (state = figureState, action) => {
  switch(action.type){
    case 'SETINFO':
      return action.figure
    default:
      return state
  }
}

const addressState = '제주특별자치도 제주시 용담2동'
export const addressReducer = (state = addressState, action) => {
  switch(action.type){
    case 'SETADDRESS':
      return action.address
    default:
      return state
  }
}