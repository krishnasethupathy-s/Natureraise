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
export const GET_CART_LIST = "GET_CART_LIST";
export const RESET_CART = "RESET_CART";
export const ADD_TO_CART_LOCAL = "ADD_TO_CART_LOCAL";
export const PRODUCT_DESCRIPTION_LIST = "PRODUCT_DESCRIPTION_LIST";
export const GET_PRODUCT_QUNATITY = "GET_PRODUCT_QUNATITY";
export const ADD_TO_CART_INCREMENT = "ADD_TO_CART_INCREMENT";
export const ADD_TO_CART_DECREMENT = "ADD_TO_CART_DECREMENT";
export const ADD_TO_CART_DECREMENT_LOCAL = "ADD_TO_CART_DECREMENT_LOCAL";
export const ADD_TO_CART_INCREMENT_LOCAL = "ADD_TO_CART_INCREMENT_LOCAL";
export const REMOVE_TO_CART_ITEM_LOCAL = "REMOVE_TO_CART_ITEM_LOCAL";
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
        console.log(result.data.getCategory);
        dispatch({
          type: "PRODUCTCATEGORIES",
          category_data_list: result.data.getCategory,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "SUCCESS_MESSAGE", success_title: "catch error" });
        dispatch({ type: "ERROR_MESSAGE", error_title: error });
      });
    return true;
  };
};

export const getCategory = () => {
  return async (dispatch) => {
    const Authorization = Config.getRequestToken();

    try {
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
    } catch (error) {
      console.log(error);
    }
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

export const getItemListByMasterId = (id, pin) => {
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
          master_id: $master_id
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
          productDescription {
            description_title
            description_details
          }
          productImage {
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
          pincode,
        },
      })
      .then((result) => {
        dispatch({
          type: "PRODUCT_MASTER_LIST",
          product_master_list: result.data.getItemListByMasterId,
        });
        dispatch({
          type: "SUCCESS_MESSAGE",
          success_title: "PRODUCT_MASTER_LIST_SUCCESS",
        });
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
  console.log(id);
  console.log(unique_id);
  return function (dispatch) {
    dispatch({ type: "PRODUCT_DETAILS", product_id: unique_id });
  };
};

export const addtocart = (id, color, size) => {
  return function (dispatch) {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        cart_product_id: id,
        color: color,
        size: size,
      },
    });
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
    dispatch({ type: REMOVE_TO_CART_ITEM_LOCAL, id: id });
    dispatch({ type: "IS_LOADING", is_loading: false });
  };
};

export const getProductquantity = (id, unique_id) => {
  return function (dispatch) {
    dispatch({
      type: "GET_PRODUCT_QUNATITY",
      get_Product_quantity_id: unique_id,
    });
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
    const Authorization = localStorage.getItem("Authorization");
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
        console.log(responseText);
        const { coupon_amount, max_cashback_amount, message } =
          responseText.data.validateCouponCode;
        if (message === "SUCCESS") {
          dispatch({
            type: "COUPON_VALIDATION",
            coupon_amount,
          });
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: "Successfully Applied",
          });
        } else if (message === "Minimum") {
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

// ADD To Cart in DB

export const addtocartdb = (
  id,
  action_type,
  message = "Item added to the cart"
) => {
  return async function (dispatch) {
    dispatch({ type: "IS_LOADING", is_loading: true });
    const Authorization = localStorage.getItem("Authorization");
    const cart_type = "0";
    const mutation = `mutation addCartList($Authorization: String, $id: ID, $action_type:String ,$cart_type:String ) {
      addCartList(Authorization:$Authorization, id:$id, action_type:$action_type,  cart_type:$cart_type  ){
        message
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
        variables: { Authorization, id, action_type, cart_type },
      }),
    })
      .then((response) => response.json())
      .then((responseText) => {
        console.log(responseText);
        if (responseText.data.addCartList["message"] === "SUCCESS") {
          // this.clearText();
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: message,
          });
          dispatch(getCartList());
        } else {
          if (responseText.data.addCartList["message"] === null) {
          } else {
            //alert(responseText.data.addCartList['message'])
          }
        }
      })
      .catch((error) => {
        //alert(error);
        console.log(error);
      });

    dispatch({ type: "IS_LOADING", is_loading: false });
  };
};

export const getCartList = () => {
  return async function (dispatch) {
    dispatch({ type: "IS_LOADING", is_loading: true });
    const Authorization = localStorage.getItem("Authorization");
    const query = gql`
      query getCartList($Authorization: String) {
        getCartList(Authorization: $Authorization) {
          item_name
          item_sub_category_id
          retail_price
          selling_price
          percentage
          uom
          item_color
          type_name
          description
          brand_name
          id
          cart_list
          item_size
          image_address
          net_amount
          total_amount
          cart_count
          generic_id
          special_price
          save_price
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
        // this.setState({ isLoadingComplete: false });
        dispatch({
          type: GET_CART_LIST,
          data: result.data.getCartList,
        });
        dispatch({
          type: "SUCCESS_MESSAGE",
          success_title: "CART_SUCCESS",
        });
      })
      .catch((error) => {
        //alert(error);
        console.log(error);
      });

    dispatch({ type: "IS_LOADING", is_loading: false });
  };
};

export const addToCartLocal = (id) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART_LOCAL,
    id,
  });
  dispatch({ type: "IS_LOADING", is_loading: false });
};

export const addToCartIncrementLocal = (id) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART_INCREMENT_LOCAL,
    id,
  });
  dispatch({ type: "IS_LOADING", is_loading: false });
};

export const addToCartDecrementLocal = (id) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART_DECREMENT_LOCAL,
    id,
  });
  dispatch({ type: "IS_LOADING", is_loading: false });
};

export const syncLocalCart = (cartArray) => async (dispatch) => {
  const Authorization = localStorage.getItem("Authorization");
  dispatch({ type: "IS_LOADING", is_loading: true });
  const form_Data1 = JSON.stringify({
    Authorization,
  });
  const cart_list = cartArray;
  const formData = new FormData();
  formData.append("cart_list", JSON.stringify({ cart_list }));
  formData.append("json", form_Data1);

  console.log(formData.getAll("json"));
  console.log(formData.getAll("cart_list"));

  fetch(Config.BaseUrl + "AddCartArray", {
    method: "POST",
    headers: {
      // "Access-Control-Allow-Origin": "*",
      // "Content-Type": "multipart/form-data",
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson);
    })
    .catch((error) => {
      console.log(error);
    });

  dispatch({ type: "IS_LOADING", is_loading: false });
};

export const resetCart = () => {
  return {
    type: RESET_CART,
  };
};
