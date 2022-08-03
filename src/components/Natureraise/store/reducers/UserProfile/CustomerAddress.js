import {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  GET_CUSTOMER_ADDRESS_LIST,
  FORM_ACTIONS,
} from "../../actions/UserProfile/CustomerAddress";

const initialState = {
  message: "",
  error_msg: "",
  form_action: "",
  address_data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_MESSAGE: {
      return {
        ...state,
        message: action.success_title,
      };
    }

    case FORM_ACTIONS: {
      return {
        ...state,
        form_action: action.form_action,
      };
    }

    case ERROR_MESSAGE: {
      return {
        ...state,
        error_msg: action.error_title,
      };
    }

    case GET_CUSTOMER_ADDRESS_LIST: {
      return {
        ...state,
        address_data: action.address_data_list,
      };
    }

    default: {
      return state;
    }
  }
};
