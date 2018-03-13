const defaultState = {
  category: null
}

const filterReducer = (state = defaultState, action) => {
  if (action.type === 'UPDATE_FILTER') {
    return { ...state, category: action.category }
  }
  return state
}

export default filterReducer
