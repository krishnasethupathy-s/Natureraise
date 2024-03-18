import {
  GET_ORDER_LIST,
  GET_ORDER_DETAIL,
  GET_ORDER_DETAIL_PRODUCTS,
  RESERT_ORDER_DETAIL,
  GET_ORDER_DETAIL_STATUS,
  GETORDERRETURNREASON,
} from "../../actions/Order/OrderActions";

const INITIAL_STATE = {
  orders: [],
  hasMore: true,
  reason: [],
  orderDetail: {
    items: [],
    detail: null,
    status: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ORDER_LIST: {
      const { data } = action;

      if (data.length === 0) {
        return {
          ...state,
          hasMore: false,
        };
      }

      return {
        ...state,
        orders: [...state.orders, ...action.data],
      };
    }

    case "RESET_ORDER_LIST": {
      return {
        ...state,
        orders: [],
      };
    }

    case GET_ORDER_DETAIL: {
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          detail: action.data,
        },
      };
    }

    case GET_ORDER_DETAIL_PRODUCTS: {
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          items: action.data,
        },
      };
    }

    case GET_ORDER_DETAIL_STATUS: {
      const { data } = action;
      console.log(data.at(-1));

      const status = data.at(-1);

      if (
        status["current_status"] === "0" ||
        status["current_status"] === "1" ||
        status["current_status"] === "2"
      ) {
        status.status = "ordered";
        status.stepper = 0;
      } else if (
        status["current_status"] === "3" ||
        status["current_status"] === "4" ||
        status["current_status"] === "5" ||
        status["current_status"] === "6"
      ) {
        status.status = "Processing";
        status.stepper = 1;
      } else if (status["current_status"] === "7") {
        status.status = "Packed";
        status.stepper = 2;
      } else if (status["current_status"] === "8") {
        status.status = "Shiped";
        status.stepper = 3;
      } else if (status["current_status"] === "9") {
        status.status = "Delivered";
        status.stepper = 4;
      } else {
        status.status = "Cancelled";
        status.stepper = 0;
      }

      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          status,
        },
      };
    }

    case GETORDERRETURNREASON: {
      const { data } = action;

      return {
        ...state,
        reason: data,
      };
    }

    default: {
      return state;
    }
  }
};
