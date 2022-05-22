import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../actions/User/UserActions";

const initialState = {
    message:'',
    error_msg:''

  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SUCCESS_MESSAGE: {
          return {
              ...state,
            message: action.success_title,
            
          };
        }
        case  ERROR_MESSAGE:
            {
                return{
                    ...state,
                    error_msg:action.error_title
                }
            }
      

      
    }
  
    return state;
  };
  