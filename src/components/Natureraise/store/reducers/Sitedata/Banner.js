import { BANNER_DATA } from "../../actions/Sitedata/Banner";

const initialState = {
  banner_list: [],
};

export default (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case BANNER_DATA: {
      return {
        ...state,
        banner_list: action.banner_list,
      };
    }
  }

  return state;
};
