/* eslint-disable default-case */
import {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  PRODUCTCATEGORIES,
  GETITEMLISTBYSUBCATEGORY,
  PRODUCT_MASTER_LIST,
  PRODUCT_DETAILS,
  PRODUCT_IMAGES_LIST,
  PRODUCT_DESCRIPTION_LIST,
  ADD_TO_CART,
  ADD_TO_CART_LOCAL,
  ADD_TO_CART_INCREMENT_LOCAL,
  ADD_TO_CART_DECREMENT_LOCAL,
  REMOVE_TO_CART_ITEM_LOCAL,
  GET_CART_LIST,
  RESET_CART,
  GET_PRODUCT_QUNATITY,
  ADD_TO_CART_INCREMENT,
  ADD_TO_CART_DECREMENT,
  REMOVE_TO_CART_ITEM,
  COUPON_VALIDATION,
  IS_LOADING,
  GET_FILTERS,
  GET_HOME_PAGE_PRODUCTS,
  GET_REVIEWS,
  ADD_RECENT_VIEW,
  ADD_STYLE1,
  ADD_STYLE2,
} from "../../actions/Product/ProductActions";

const initialState = {
  success_message: "",
  error_message: "",
  product_categories_list: [],
  product_list: [],
  hasMore: true,
  product_master_list: [],
  product_data: {},
  product_images_full_list: [],
  product_descriptions_list: [],
  cart_product_list: [],
  total_amount: 0,
  save_amount: 0,
  mrp_amount: 0,
  product_quantity: 0,
  coupon_validation_amount: 0,
  is_loading: true,

  cart: {
    items: [],
    save_amount: 0,
    order_amount: 0,
    mrp_amount: 0,
    coupon_validation_amount: 0,
  },

  filters: [],
  homeProducts: {
    topOffers: [],
    newComings: [],
  },
  reviews: [],
  recentView: [],
  style1: [],
  style2: [],
};
export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SUCCESS_MESSAGE: {
      return {
        ...state,
        success_message: action.success_title,
      };
    }
    case ERROR_MESSAGE: {
      return {
        ...state,
        error_message: action.error_title,
      };
    }
    case PRODUCTCATEGORIES: {
      return {
        ...state,
        product_categories_list: action.category_data_list,
      };
    }
    case IS_LOADING: {
      return {
        ...state,
        is_loading: action.is_loading,
      };
    }
    case PRODUCT_MASTER_LIST: {
      return {
        ...state,
        product_master_list: action.product_master_list,
      };
    }

    case GET_FILTERS: {
      return {
        ...state,
        filters: action.data,
      };
    }
    case "LOCAL_FILTERS": {
      return {
        ...state,
        filters: [
          {
            filter_heading: "Discount",
            filter_value: ["10", "30", "50", "80", "90"],
            id: "1",
          },
          {
            filter_heading: "Rating",
            filter_value: ["1", "2", "3", "4", "5"],
            id: "2",
          },
        ],
      };
    }

    case "RESET_FILTERS": {
      return {
        ...state,
        filters: [],
      };
    }

    case GET_HOME_PAGE_PRODUCTS: {
      const { data } = action;

      const topOffers = data.filter(
        (item) => item.item_category_name === "Top Offers"
      );

      const newComings = data.filter(
        (item) => item.item_category_name === "New Comings"
      );

      return {
        ...state,
        homeProducts: {
          topOffers,
          newComings,
        },
      };
    }

    case ADD_RECENT_VIEW: {
      const { data } = action;
      const alreadyExist = state.recentView.some(
        (item) => item.id === data[0].id
      );

      if (alreadyExist) return state;

      return {
        ...state,
        recentView: [...data, ...state.recentView],
      };
    }

    case GETITEMLISTBYSUBCATEGORY: {
      if (action.reset) {
        return {
          ...state,
          hasMore: true,
          product_list: action.get_item_list,
        };
      }

      if (action.get_item_list.length === 0) {
        return {
          ...state,
          hasMore: false,
        };
      }

      return {
        ...state,

        product_list: [...state.product_list, ...action.get_item_list],
      };
    }

    case GET_REVIEWS: {
      if (action.reset) {
        return {
          ...state,
          hasMore: true,
          reviews: action.data,
        };
      }

      if (action.data.length === 0) {
        return {
          ...state,
          hasMore: false,
        };
      }

      return {
        ...state,

        reviews: [...state.reviews, ...action.data],
      };
    }

    case "RESETITEMLISTBYSUBCATEGORY": {
      console.log("HI");
      return {
        ...state,
        hasMore: true,
        product_list: [],
      };
    }

    case PRODUCT_DETAILS: {
      let product_unique_id = action.product_id;

      console.log(product_unique_id);
      console.log(state.product_master_list);
      let product_data_1 = {};
      if (state.product_master_list) {
        if (product_unique_id == "")
          product_unique_id = state.product_master_list[0].id;
        product_data_1 = state.product_master_list.find(
          (item) => item.id === product_unique_id
        );
      }
      console.log(product_data_1);
      return {
        ...state,
        product_data: product_data_1,
        unique_id: product_unique_id,
      };
    }
    case PRODUCT_IMAGES_LIST: {
      let product_unique_id = action.product_id;
      let product_data_1 = {};
      var imagesArray = [];
      if (state.product_master_list) {
        product_data_1 = state.product_master_list.find(
          (item) => item.id === product_unique_id
        );
        // console.log(state.product_master_list);
        // console.log(product_unique_id);
        // console.log(product_data_1)
        // var str1 = product_data_1["productImage"];
        var str1 = state.product_master_list[0]["productImage"];
        console.log(str1);
        if (str1.length > 0) {
          var str2 = str1[0].product_images;
          var temp = str2.split(",");
          for (var i = 0; i < temp.length; i++) {
            imagesArray.push(temp[i]);
          }
        } else {
          imagesArray.push(state.product_master_list[0].image_address);
        }
      }
      return {
        ...state,
        products_image_list: imagesArray,
      };
    }

    case PRODUCT_DESCRIPTION_LIST: {
      let product_unique_id = action.product_id;
      let product_data_1 = {};
      let product_descriptions_list = [];
      if (state.product_master_list) {
        product_data_1 = state.product_master_list.find(
          (item) => item.id === product_unique_id
        );
        // product_descriptions_list = product_data_1["productDescription"];

        product_descriptions_list =
          state.product_master_list[0]["productDescription"];
      }
      return {
        ...state,
        product_descriptions_list: product_descriptions_list,
      };
    }
    // case PRODUCT_DESCRIPTION_LIST: {
    //   return {
    //     ...state,
    //     product_descriptions_list: action.product_description_list,
    //   };
    // }
    // case PRODUCT_IMAGES_LIST: {
    //   return {
    //     ...state,
    //     product_images_full_list: action.products_image_list,
    //   };
    // }
    case ADD_TO_CART: {
      let cart_id = action.payload.cart_product_id;
      let existing_cart_id = state.cart_product_list.find(
        (item) => item.id === cart_id
      );
      if (existing_cart_id) {
        let cart_products = existing_cart_id;
        cart_products.card_quantity += 1;

        let new_totalamount1 =
          state.total_amount + cart_products.selling_price * 1;
        let new_save_amount1 = state.save_amount + cart_products.save_price * 1;
        let mrp_amount1 = state.mrp_amount + cart_products.retail_price * 1;
        return {
          ...state,
          total_amount: new_totalamount1,
          save_amount: new_save_amount1,
          mrp_amount: mrp_amount1,
        };
      } else {
        let cart_products = state.product_list.find(
          (item) => item.id === cart_id
        );
        cart_products.card_quantity = 1;
        cart_products.item_size = action.payload.size;
        cart_products.item_color = action.payload.color;
        let new_totalamount =
          state.total_amount + cart_products.selling_price * 1;
        let new_save_amount = state.save_amount + cart_products.save_price * 1;
        let mrp_amount = state.mrp_amount + cart_products.retail_price * 1;

        return {
          ...state,
          cart_product_list: [...state.cart_product_list, cart_products],
          total_amount: new_totalamount,
          save_amount: new_save_amount,
          mrp_amount: mrp_amount,
          coupon_validation_amount: state.coupon_validation_amount,
        };
      }
    }

    case GET_PRODUCT_QUNATITY: {
      let product_quanity_id = action.get_Product_quantity_id;
      let exit_product_quanity = state.cart.items.find(
        (item) => item.id === product_quanity_id
      );

      if (exit_product_quanity) {
        let product_quanity_data = +exit_product_quanity.cart_list;
        return {
          ...state,
          product_quantity: product_quanity_data,
        };
      } else {
        return {
          ...state,
          product_quantity: 0,
        };
      }
    }

    case "RESET_PRODUCT_QUANTITY": {
      return {
        ...state,
        product_quantity: 0,
      };
    }

    case ADD_TO_CART_INCREMENT: {
      let increment_id = action.cart_increment_id;
      let increment_quantity_id = state.cart_product_list.find(
        (item) => item.id === increment_id
      );

      if (increment_quantity_id) {
        let cart_products = increment_quantity_id;
        cart_products.card_quantity += 1;

        let new_totalamount1 =
          state.total_amount + cart_products.selling_price * 1;
        let new_save_amount1 = state.save_amount + cart_products.save_price * 1;
        let mrp_amount1 = state.mrp_amount + cart_products.retail_price * 1;

        return {
          ...state,
          total_amount: new_totalamount1,
          save_amount: new_save_amount1,
          mrp_amount: mrp_amount1,
        };
      }
    }

    case ADD_TO_CART_DECREMENT: {
      let decrement_id = action.cart_decrement_id;
      let decrement_quantity_id = state.cart_product_list.find(
        (item) => item.id === decrement_id
      );
      if (decrement_quantity_id) {
        let cart_products = decrement_quantity_id;
        cart_products.card_quantity -= 1;
        let new_totalamount1 =
          state.total_amount - cart_products.selling_price * 1;
        let new_save_amount1 = state.save_amount - cart_products.save_price * 1;
        let mrp_amount1 = state.mrp_amount - cart_products.retail_price * 1;

        if (cart_products.card_quantity === 0) {
          var car_product_decrement_list = state.cart_product_list.filter(
            (item) => item.id !== decrement_id
          );
          return {
            ...state,
            total_amount: new_totalamount1,
            save_amount: new_save_amount1,
            mrp_amount: mrp_amount1,
            cart_product_list: car_product_decrement_list,
            coupon_validation_amount: 0,
          };
        } else {
          return {
            ...state,
            total_amount: new_totalamount1,
            save_amount: new_save_amount1,
            mrp_amount: mrp_amount1,
            coupon_validation_amount: 0,
          };
        }
      }
    }

    case REMOVE_TO_CART_ITEM: {
      let itemToRemove = state.cart_product_list.find(
        (item) => item.id === action.id
      );

      let new_items = state.cart_product_list.filter(
        (item) => itemToRemove.id !== item.id
      );
      let newTotal =
        state.total_amount -
        itemToRemove.selling_price * itemToRemove.card_quantity;
      let new_save_amount1 =
        state.save_amount -
        itemToRemove.save_price * itemToRemove.card_quantity;
      let mrp_amount1 =
        state.mrp_amount -
        itemToRemove.retail_price * itemToRemove.card_quantity;

      return {
        ...state,
        cart_product_list: new_items,
        total_amount: newTotal,
        save_amount: new_save_amount1,
        mrp_amount: mrp_amount1,
        coupon_validation_amount: 0,
      };
    }
    case COUPON_VALIDATION: {
      const { coupon_amount } = action;
      const new_order_amount = +state.cart.order_amount - coupon_amount;
      return {
        ...state,
        cart: {
          ...state.cart,
          coupon_validation_amount: coupon_amount,
          order_amount: new_order_amount,
        },
      };
    }

    case GET_CART_LIST: {
      const { data } = action;
      console.log(data);
      let order_amount = 0;
      let new_save_amount = 0;
      let new_mrp_amount = 0;
      data.forEach((item) => {
        order_amount +=
          +item.total_amount - +state.cart.coupon_validation_amount;

        new_save_amount +=
          item.save_price === "0.00" ? 0 : +item.save_price * +item.cart_list;
        new_mrp_amount += +item.retail_price * +item.cart_list;
      });
      return {
        ...state,
        cart: {
          ...state.cart,
          items: data,
          order_amount,
          save_amount: new_save_amount,
          mrp_amount: new_mrp_amount,
        },
      };
    }

    case ADD_TO_CART_LOCAL: {
      const productId = action.id;

      const extItem = state.cart.items.find(
        (product) => product.id === productId
      );

      let order_amount = 0;
      let new_save_amount = 0;
      let new_mrp_amount = 0;
      if (extItem) {
        const productIdx = state.cart.items.findIndex(
          (item) => item.id === productId
        );
        const items = [...state.cart.items];

        items[productIdx].cart_list = +items[productIdx].cart_list + 1;
        items[productIdx].total_amount =
          items[productIdx].special_price === "0.00"
            ? +items[productIdx].selling_price * +items[productIdx].cart_list
            : items[productIdx].special_price * +items[productIdx].cart_list;
        console.log(items[productIdx].total_amount);

        order_amount = +items[productIdx].total_amount * 1;
        new_save_amount =
          +state.cart.save_amount + +items[productIdx].save_price * 1;

        new_mrp_amount =
          +state.cart.mrp_amount + +items[productIdx].retail_price * 1;
        console.log(order_amount, new_save_amount, new_mrp_amount);

        return {
          ...state,
          cart: {
            ...state.cart,
            items: items,
            order_amount,
            save_amount: new_save_amount,
            mrp_amount: new_mrp_amount,
          },
        };
      }

      let item = state.product_master_list.find(
        (product) => product.id === productId
      );
      if (!item) {
        item = state.product_list.find((product) => product.id === productId);
      }
      item.pincode = action.pincode;
      item.cart_list = +item.cart_list + 1;
      item.total_amount =
        item.special_price === "0.00"
          ? +item.selling_price
          : +item.special_price;

      order_amount = +state.cart.order_amount + +item.total_amount * 1;
      new_save_amount = +state.cart.save_amount + +item.save_price * 1;
      new_mrp_amount = +state.cart.mrp_amount + +item.retail_price * 1;
      console.log(order_amount, new_save_amount, new_mrp_amount);

      return {
        ...state,
        cart: {
          ...state.cart,
          items: [...state.cart.items, item],
          order_amount,
          save_amount: new_save_amount,
          mrp_amount: new_mrp_amount,
        },
      };
    }

    case ADD_TO_CART_INCREMENT_LOCAL: {
      const { id } = action;

      const productIdx = state.cart.items.findIndex((item) => item.id === id);
      const items = [...state.cart.items];

      items[productIdx].cart_list = +items[productIdx].cart_list + 1;
      items[productIdx].total_amount =
        items[productIdx].special_price === "0.00"
          ? +items[productIdx].selling_price * +items[productIdx].cart_list
          : items[productIdx].special_price * +items[productIdx].cart_list;

      let order_amount = 0;
      let new_save_amount = 0;
      let new_mrp_amount = 0;
      order_amount = +items[productIdx].total_amount * 1;
      new_save_amount =
        +state.cart.save_amount + +items[productIdx].save_price * 1;

      new_mrp_amount =
        +state.cart.mrp_amount + +items[productIdx].retail_price * 1;
      console.log(order_amount, new_save_amount, new_mrp_amount);

      return {
        ...state,
        cart: {
          ...state.cart,
          items: items,
          order_amount,
          save_amount: new_save_amount,
          mrp_amount: new_mrp_amount,
        },
      };
    }

    case ADD_TO_CART_DECREMENT_LOCAL: {
      const { id } = action;

      const product = state.cart.items.find((item) => item.id === id);
      const productIdx = state.cart.items.findIndex((item) => item.id === id);
      let items = [...state.cart.items];

      items[productIdx].cart_list = +items[productIdx].cart_list - 1;
      items[productIdx].total_amount =
        items[productIdx].special_price === "0.00"
          ? +items[productIdx].selling_price * +items[productIdx].cart_list
          : items[productIdx].special_price * +items[productIdx].cart_list;

      let order_amount = 0;
      let new_save_amount = 0;
      let new_mrp_amount = 0;
      order_amount = +items[productIdx].total_amount * 1;
      new_save_amount =
        +state.cart.save_amount - +items[productIdx].save_price * 1;

      new_mrp_amount =
        +state.cart.mrp_amount - +items[productIdx].retail_price * 1;
      console.log(order_amount, new_save_amount, new_mrp_amount);

      if (
        items[productIdx].cart_list === "0" ||
        items[productIdx].cart_list === 0
      ) {
        items = items.filter((item) => item.id !== id);
        order_amount -=
          product.special_price === "0.00"
            ? product.selling_price
            : product.special_price;
      }

      return {
        ...state,
        cart: {
          ...state.cart,
          items: items,
          order_amount,
          save_amount: new_save_amount,
          mrp_amount: new_mrp_amount,
        },
      };
    }

    case REMOVE_TO_CART_ITEM_LOCAL: {
      let product = state.cart.items.find((item) => item.id === action.id);
      console.log(product);

      let items = state.cart.items.filter((item) => product.id !== item.id);

      let order_amount = 0;
      let new_save_amount = 0;
      let new_mrp_amount = 0;
      order_amount -=
        product.special_price === "0.00"
          ? product.selling_price
          : product.special_price;
      new_save_amount = +state.cart.save_amount - +product.save_price * 1;

      new_mrp_amount = +state.cart.mrp_amount - +product.retail_price * 1;

      return {
        ...state,
        cart: {
          ...state.cart,
          items: items,
          order_amount,
          save_amount: new_save_amount,
          mrp_amount: new_mrp_amount,
        },
      };
    }

    case RESET_CART:
      return {
        ...state,
        cart: initialState.cart,
      };

    case ADD_STYLE1:
      return {
        ...state,
        style1: action.data,
      };
    case ADD_STYLE2:
      return {
        ...state,
        style2: action.data,
      };
  }

  return state;
};
