import { BANNER_DATA } from "../../actions/Sitedata/Banner";

const initialState = {
  banner_list:[]

  };
  
  export default (state = initialState, action) => {
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
  