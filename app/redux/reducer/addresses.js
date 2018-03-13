const defaultState = {
  addresses: {
    count: 0,
    results: []
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_ARRAY_PRODUCTION':
      return { ...state, addresses: action.arrProduction }
    default:
      return state
  }
}
