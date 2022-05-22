import Config from "../../../../../Config";
import { gql } from "@apollo/client";

export const SUCCESS_MESSAGE = "SUCCESS_MESSAGE";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const PRODUCTCATEGORIES = "PRODUCTCATEGORIES";
export const GETITEMLISTBYSUBCATEGORY = "GETITEMLISTBYSUBCATEGORY";
export const PRODUCT_DETAILS = "PRODUCT_DETAILS";
export const PRODUCT_IMAGES_LIST = "PRODUCT_IMAGES_LIST";
export const PRODUCT_MASTER_LIST = "PRODUCT_MASTER_LIST";
export const ADD_TO_CART = "ADD_TO_CART";
export const PRODUCT_DESCRIPTION_LIST = "PRODUCT_DESCRIPTION_LIST";
export const GET_PRODUCT_QUNATITY = "GET_PRODUCT_QUNATITY";
export const ADD_TO_CART_INCREMENT = "ADD_TO_CART_INCREMENT";
export const ADD_TO_CART_DECREMENT = "ADD_TO_CART_DECREMENT";
export const REMOVE_TO_CART_ITEM = "REMOVE_TO_CART_ITEM";
export const COUPON_VALIDATION = "COUPON_VALIDATION";
export const IS_LOADING = "IS_LOADING";


export const empty_message = () => {
  return async (dispatch) => {
    dispatch({ type: "SUCCESS_MESSAGE", success_title: "" });
    dispatch({ type: "ERROR_MESSAGE", error_title: "" });
    return true;
  };
};

export const getCategory1 = () => {
  return async (dispatch) => {
    const Authorization = Config.getRequestToken();
    const query = gql`
    query getCategory($Authorization: String) {
      getCategory(Authorization: $Authorization) {
        id
        item_category_name
      }
    }
  `;

    Config.client
      .query({
        query: query,
        fetchPolicy: "no-cache",
        variables: { Authorization },
      })
      .then((result) => {
        console.log(result.data.getCategory)
        dispatch({
          type: "PRODUCTCATEGORIES",
          category_data_list: result.data.getCategory,
        });
      })
      .catch((error) => {
        console.log(error)
        dispatch({ type: "SUCCESS_MESSAGE", success_title: "catch error" });
        dispatch({ type: "ERROR_MESSAGE", error_title: error });
      });
    return true;
  };
};

export const getCategory = () => {
  return async (dispatch) => {
    const Authorization = Config.getRequestToken();
    let response = await fetch(Config.BaseUrl + "GetItemCategoryList/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: JSON.stringify({ Authorization }),
    });
    let responseJsonData = await response.json();
    dispatch({
      type: "PRODUCTCATEGORIES",
      category_data_list: responseJsonData,
    });
    return true;
  };
};

export const getItemListBySubCategory = (
  id,
  page_number,
  data_limit,
  item_name
) => {
  return async (dispatch) => {
  const item_sub_category_id = id;
  const Authorization = Config.getRequestToken();
  const query = gql`
    query getItemListBySubCategory(
      $Authorization: String
      $item_sub_category_id: String
      $page_number: String
      $data_limit: String
      $item_name: String
    ) {
      getItemListBySubCategory(
        Authorization: $Authorization
        item_sub_category_id: $item_sub_category_id
        page_number: $page_number
        data_limit: $data_limit
        item_name: $item_name
      ) {
        item_name
        item_sub_category_id
        retail_price
        selling_price
        percentage
        uom
        item_size
        type_name
        id
        image_address
        cart_list
        wish_list
        net_amount
        total_amount
        cart_count
        brand_name
        generic_id
        save_price
        retail_price
        special_price
        availability
      }
    }
  `;
  Config.client
    .query({
      query: query,
      fetchPolicy: "no-cache",
      variables: {
        Authorization,
        item_sub_category_id,
        page_number,
        data_limit,
        item_name,
      },
    })
    .then((result) => {
      dispatch({
        type: "GETITEMLISTBYSUBCATEGORY",
        get_item_list: result.data.getItemListBySubCategory,
      });
    })
    .catch((error) => {
      dispatch({ type: "SUCCESS_MESSAGE", success_title: "catch error" });
      dispatch({ type: "ERROR_MESSAGE", error_title: error });
    });
    return true;
  };
};

export const getItemListByMasterId = (
  id, pin
) => {
  
  return async (dispatch) => {
  const master_id = id;
  const pincode = pin;
  const Authorization = Config.getRequestToken();
  const query = gql`
    query getItemListByMasterId(
      $Authorization: String
      $master_id: String
      $pincode: String
    ) {
      getItemListByMasterId(
        Authorization: $Authorization
        master_id: $master_id,
        pincode: $pincode
      ) {
        item_name
        item_sub_category_id
        retail_price
        selling_price
        percentage
        uom
        item_size
        item_color
        type_name
        id
        image_address
        cart_list
        wish_list
        net_amount
        total_amount
        cart_count
        brand_name
        generic_id
        save_price
        retail_price
        special_price
        availability
        productDescription{
          description_title
          description_details
        }
        productImage{
          product_id
          product_images
        }
      }
    }
  `;
  Config.client
    .query({
      query: query,
      fetchPolicy: "no-cache",
      variables: {
        Authorization,
        master_id,
        pincode
      },
    })
    .then((result) => {      
      dispatch({
        type: "PRODUCT_MASTER_LIST",
        product_master_list: result.data.getItemListByMasterId,
      });
      dispatch({ type: "SUCCESS_MESSAGE", success_title: "PRODUCT_MASTER_LIST_SUCCESS" });
      return true;
    })
    .catch((error) => {
      dispatch({ type: "SUCCESS_MESSAGE", success_title: "catch error" });
      dispatch({ type: "ERROR_MESSAGE", error_title: error });
    });
  };
};

export const getProductDetails = (id, unique_id) => {
  console.log("action");
  console.log(id)
  console.log(unique_id)
  return function (dispatch) {
    dispatch({ type: "PRODUCT_DETAILS",  product_id:unique_id});
  };
};

export const addtocart = (id) => {
  return function (dispatch) {
    dispatch({ type: "ADD_TO_CART", cart_product_id: id });
    dispatch({ type: "IS_LOADING", is_loading: false });
  };
};

export const addtocart_increment = (id) => {
  return function (dispatch) {
    dispatch({ type: "ADD_TO_CART_INCREMENT", cart_increment_id: id });
    setTimeout(() => {
      dispatch({ type: "IS_LOADING", is_loading: false });
    }, 1000);
  };
};

export const addtocart_decrement = (id) => {
  return function (dispatch) {
    dispatch({ type: "ADD_TO_CART_DECREMENT", cart_decrement_id: id });
    dispatch({ type: "IS_LOADING", is_loading: false });

  };
};
export const remove_cart_item = (id) => {
  return function (dispatch) {
    dispatch({ type: "REMOVE_TO_CART_ITEM", remove_item_id: id });
    dispatch({ type: "IS_LOADING", is_loading: false });
  };
};

export const getProductquantity = (id,unique_id) => {
  return function (dispatch) {
    dispatch({ type: "GET_PRODUCT_QUNATITY", get_Product_quantity_id: unique_id });
  };
};

// export const getProductImages = () => {
//   return async (dispatch) => {
//     const Authorization = Config.getRequestToken();
//     let response = await fetch(Config.BaseUrl + "getProductImages/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//       },
//       body: JSON.stringify({ Authorization }),
//     });
//     let responseJsonData = await response.json();
//     dispatch({ type: "PRODUCT_IMAGES_LIST", products_image_list: responseJsonData },);
//      return true;
//   };
// };

export const getProductImages1 = (product_id) => {
  return async (dispatch) => {
    const id = product_id;
    const Authorization = Config.getRequestToken();
    const query = gql`
      query getProductImages($Authorization: String, $id: ID) {
        getProductImages(Authorization: $Authorization, id: $id) {
          product_images
        }
      }
    `;
    Config.client
      .query({
        query: query,
        fetchPolicy: "no-cache",
        variables: { Authorization, id },
      })
      .then((result) => {
        var str = result.data.getProductImages["product_images"];
        var temp = str.split(",");
        var imagesArray = [];
        for (var i = 0; i < temp.length; i++) {
          imagesArray.push(temp[i]);
        }
        dispatch({
          type: "PRODUCT_IMAGES_LIST",
          products_image_list: imagesArray,
        });
      });
    return true;
  };
};

export const getProductImages = (id, unique_id) => {
  return function (dispatch) {
    dispatch({ type: "PRODUCT_IMAGES_LIST", product_id: unique_id });
  };
};

export const getProductDescriptionList = (id, unique_id) => {
  return function (dispatch) {
    dispatch({ type: "PRODUCT_DESCRIPTION_LIST", product_id: unique_id });
  };
};

export const getProductDescriptionList1 = (product_id) => {
  return async (dispatch) => {
    const id = product_id;
    const Authorization = Config.getRequestToken();
    const query = gql`
      query getProductDescriptionList($Authorization: String, $id: ID) {
        getProductDescriptionList(Authorization: $Authorization, id: $id) {
          product_id
          description_title
          description_details
        }
      }
    `;
    Config.client
      .query({
        query: query,
        fetchPolicy: "no-cache",
        variables: { Authorization, id },
      })
      .then((result) => {
        dispatch({
          type: "PRODUCT_DESCRIPTION_LIST",
          product_description_list: result.data.getProductDescriptionList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    return true;
  };
};

export const validateCouponCode = (order_amount, coupon_code_value) => {
  return async (dispatch) => {
    let coupon_code_for = "1";
    const Authorization = Config.getRequestToken();
    const mutation = `mutation validateCouponCode($coupon_code_for: String, $order_amount: String, $coupon_code_value: String, $Authorization: String) {
      validateCouponCode(coupon_code_for:$coupon_code_for, order_amount:$order_amount, coupon_code_value:$coupon_code_value, Authorization:$Authorization){
          message,coupon_amount,max_cashback_amount,min_purchase_amount
      }
  }`;
    fetch(Config.BaseUrl + "graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: mutation,
        fetchPolicy: "no-cache",
        variables: {
          coupon_code_for,
          order_amount,
          coupon_code_value,
          Authorization,
        },
      }),
    })
      .then((response) => response.json())
      .then((responseText) => {
        if (responseText.data.validateCouponCode["message"] === "SUCCESS") {
          dispatch({
            type: "COUPON_VALIDATION",
            coupon_amount:
              responseText.data.validateCouponCode["coupon_amount"],
          });
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: "Successfully Applied",
          });
        } else if (
          responseText.data.validateCouponCode["message"] === "Minimum"
        ) {
          dispatch({ type: "SUCCESS_MESSAGE", success_title: "Minimum" });
          dispatch({
            type: "ERROR_MESSAGE",
            error_title:
              "minimum purchase amount" +
              responseText.data.validateCouponCode["min_purchase_amount"],
          });
        } else {
          dispatch({
            type: "ERROR_MESSAGE",
            error_title: "Coupon is Not Valid or Expired",
          });
          dispatch({ type: "SUCCESS_MESSAGE", success_title: "Not Valid" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return true;
  };
};
