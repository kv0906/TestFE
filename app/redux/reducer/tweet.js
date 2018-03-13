const settingTweet = {
  results: [],
};

export default (state = settingTweet, action) => {
  switch (action.type) {
    case 'SET_TWEETS':
      return { ...state, results: action.tweets };
    default:
      return state;
  }
};
