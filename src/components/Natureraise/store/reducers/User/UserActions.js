import {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  SET_USER,
  LOGOUT_USER,
  REFRESH_TOKEN,
} from "../../actions/User/UserActions";

const initialState = {
  message: "",
  error_msg: "",
  isAuthenticated: Boolean(localStorage.getItem("Authorization")) || false,
  provider: localStorage.getItem("provider") || "",
  user: {
    email_id: localStorage.getItem("email_id") || "",
    first_name: localStorage.getItem("first_name") || "",
    last_name: localStorage.getItem("last_name") || "",
    image_address: localStorage.getItem("image_address") || "",
    mobile_number1: localStorage.getItem("mobile_number1") || "",
    token: localStorage.getItem("Authorization") || "",
    expiryTime: localStorage.getItem("expiryTime") || 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_MESSAGE: {
      return {
        ...state,
        message: action.success_title,
      };
    }
    case ERROR_MESSAGE: {
      return {
        ...state,
        error_msg: action.error_title,
      };
    }

    case SET_USER: {
      const { data, provider } = action;
      return {
        ...state,
        provider,
        isAuthenticated: true,
        user: data,
      };
    }

    case REFRESH_TOKEN: {
      const { expiryTime, token } = action.data;

      return {
        ...state,
        isAuthenticated: true,
        user: {
          ...state.user,
          token,
          expiryTime,
        },
      };
    }

    case LOGOUT_USER: {
      return {
        ...state,
        isAuthenticated: false,
        provider: "",
        user: {
          email_id: "",
          first_name: "",
          last_name: "",
          image_address: "",
          mobile_number1: "",
          token: "",
          expiryTime: 0,
        },
      };
    }
    default:
      return state;
  }
};
