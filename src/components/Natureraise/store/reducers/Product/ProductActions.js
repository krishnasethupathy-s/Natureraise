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
  GET_PRODUCT_QUNATITY,
  ADD_TO_CART_INCREMENT,
  ADD_TO_CART_DECREMENT,
  REMOVE_TO_CART_ITEM,
  COUPON_VALIDATION,
  IS_LOADING,
} from "../../actions/Product/ProductActions";

const initialState = {
  success_message: "",
  error_message: "",
  product_categories_list: [],
  product_list: [],
  product_master_list: [],
  product_data: {},
  product_images_full_list: [],
  product_descriptions_list: [],
  cart_product_list: [],
  total_amount: 0,
  save_amount: 0,
  mrp_amount: 0,
  product_quantity: "",
  coupon_validation_amount: 0,
  is_loading: true,
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
    case GETITEMLISTBYSUBCATEGORY: {
      return {
        ...state,
        product_list: action.get_item_list,
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
        if (str1.length > 0) {
          var str2 = str1[0].product_images;
          var temp = str2.split(",");
          for (var i = 0; i < temp.length; i++) {
            imagesArray.push(temp[i]);
          }
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
      let exit_product_quanity = state.cart_product_list.find(
        (item) => item.id === product_quanity_id
      );
      if (exit_product_quanity) {
        let product_quanity_data = exit_product_quanity.card_quantity;
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
        (item) => item.id === action.remove_item_id
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
      return {
        ...state,
        coupon_validation_amount: action.coupon_amount,
      };
    }
  }

  return state;
};
