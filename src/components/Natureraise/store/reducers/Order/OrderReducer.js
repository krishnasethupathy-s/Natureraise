import {
  GET_ORDER_LIST,
  GET_ORDER_DETAIL,
  GET_ORDER_DETAIL_PRODUCTS,
  RESERT_ORDER_DETAIL,
} from "../../actions/Order/OrderActions";

const INITIAL_STATE = {
  orders: [],
  orderDetail: {
    items: [],
    detail: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ORDER_LIST: {
      return {
        ...state,
        orders: action.data,
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

    default: {
      return state;
    }
  }
};
