const InitialState = {
  searchingCategory: "Product",
  isPriceLowToHigh: 0,
};

const CategoryReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "CHANGE_CATEGORY":
      state.searchingCategory = action.payload;
      return state;
    case "CHANGE_PRICE_SORT":
      return {
        ...state,
        isPriceLowToHigh: action.payload,
      };
    default:
      return state;
  }
};

export default CategoryReducer;
