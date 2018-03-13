const defaultState = {
  categories: {
    count: 0,
    results: [],
  },
  productions: {
    count: 0,
    results: [],
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_ARRAY_PRODUCTION':
      return { ...state, productions: action.arrProduction };
    case 'SET_ARRAY_CATEGORY':
      return { ...state, categories: action.arrCategory };
    default:
      return state;
  }
};
