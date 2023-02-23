import Config from "../../../../../Config";
import { gql } from "@apollo/client";
import { logout_user } from "../User/UserActions";

export const SUCCESS_MESSAGE = "SUCCESS_MESSAGE";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const PRODUCTCATEGORIES = "PRODUCTCATEGORIES";
export const GETITEMLISTBYSUBCATEGORY = "GETITEMLISTBYSUBCATEGORY";
export const GETFILTERBYCATEGORY = "GETFILTERBYCATEGORY";
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
export const GET_FILTERS = "GET_FILTERS";
export const GET_HOME_PAGE_PRODUCTS = "GET_HOME_PAGE_PRODUCTS";
export const GET_REVIEWS = "GET_REVIEWS";
export const ADD_RECENT_VIEW = "ADD_RECENT_VIEW";
export const ADD_STYLE1 = "ADD_STYLE1";
export const ADD_STYLE2 = "ADD_STYLE2";
export const Add_CATEGORY_PRODUCTS = "Add_CATEGORY_PRODUCTS";
export const GET_COUPON_LIST = "GET_COUPON_LIST";

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
        dispatch({
          type: "ERROR_MESSAGE",
          error_title: error.message ?? "something went wrong",
        });
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

      const sortingValues = [
        "Solar Water Heater",
        "Heat Pump",
        "Water Softener and Filters",
        "Ro Purifiers",
        "Pumps and Controllers",
        "Solar Lighting",
        "UPS and Batteries",
        "AC and Inverter",
      ];
      const sortedCategory = responseJsonData.sort(
        (a, b) =>
          sortingValues.indexOf(a.item_category_name) -
          sortingValues.indexOf(b.item_category_name)
      );

      dispatch({
        type: "PRODUCTCATEGORIES",
        category_data_list: sortedCategory,
      });
      const category = sortedCategory;

      // category.forEach((c, idx) => {
      //   dispatch(
      //     getItemListBySearchValue(c.id, "1", "5", c.item_category_name)
      //   );
      // });

      const data = await getCategoryProducts(category);
      dispatch({
        type: Add_CATEGORY_PRODUCTS,
        payload: { data },
      });
    } catch (error) {
      console.log(error);
    }
    return true;
  };
};

const getCategoryProducts = async (category) => {
  const categoryProducts = category.map((c) =>
    getItemListBySearchValue1(
      c.id,
      "1",
      "5",
      c.item_category_name,
      c.image_address
    )
      .then((res) => {
        const data = res.data.getItemListByCategory;

        return {
          category_name: c.item_category_name,
          ad_image: c.image_address,
          id: c.id,
          data,
        };
      })
      .catch((e) => console.log(e))
  );

  return Promise.all(categoryProducts).then((res) => res);
};

export const getItemListBySearchValue1 = async (
  id,
  page_number,
  data_limit,
  category_name,
  image
) => {
  const item_name = "";
  const item_category_id = id;
  const Authorization = Config.getRequestToken();

  const query = gql`
    query getItemListByCategory(
      $Authorization: String
      $item_category_id: String
      $page_number: String
      $data_limit: String
      $item_name: String
    ) {
      getItemListByCategory(
        Authorization: $Authorization
        item_category_id: $item_category_id
        page_number: $page_number
        data_limit: $data_limit
        item_name: $item_name
      ) {
        item_name
        item_sub_category_id
        item_category_name
        item_category_id
        retail_price
        selling_price
        percentage
        uom
        item_size
        item_color
        type_name
        id
        product_price_id
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

  return Config.client.query({
    query: query,
    fetchPolicy: "no-cache",
    variables: {
      Authorization,
      item_category_id,
      page_number,
      data_limit,
      item_name,
    },
  });
};

export const getItemListBySearchValue =
  (id, page_number, data_limit, category_name) => (dispatch) => {
    const item_name = "";
    const item_category_id = id;
    const Authorization = Config.getRequestToken();

    const query = gql`
      query getItemListByCategory(
        $Authorization: String
        $item_category_id: String
        $page_number: String
        $data_limit: String
        $item_name: String
      ) {
        getItemListByCategory(
          Authorization: $Authorization
          item_category_id: $item_category_id
          page_number: $page_number
          data_limit: $data_limit
          item_name: $item_name
        ) {
          item_name
          item_sub_category_id
          item_category_name
          item_category_id
          retail_price
          selling_price
          percentage
          uom
          item_size
          item_color
          type_name
          id
          product_price_id
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
          item_category_id,
          page_number,
          data_limit,
          item_name,
        },
      })
      .then((result) => {
        console.log(result);

        const data = result.data.getItemListByCategory;

        dispatch({
          type: Add_CATEGORY_PRODUCTS,
          payload: {
            category_name,
            data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const getHomePageProductList = () => (dispatch) => {
  const Authorization = Config.getRequestToken();
  const query = gql`
    query getHomePageProductList($Authorization: String) {
      getHomePageProductList(Authorization: $Authorization) {
        item_name
        item_sub_category_id
        item_category_name
        item_category_id
        retail_price
        selling_price
        percentage
        uom
        item_size
        item_color
        type_name
        id
        product_price_id
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
      },
    })
    .then((result) => {
      console.log(result);
      const data = result.data.getHomePageProductList;

      dispatch({
        type: GET_HOME_PAGE_PRODUCTS,
        data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return true;
};

export const getItemSearch = (
  id,
  page_number,
  data_limit,
  search_values,
  filter_values,
  price_values,
  sort_by,
  reset = false
) => {
  return async (dispatch) => {
    const item_sub_category_id = id;
    const Authorization = Config.getRequestToken();
    const query = gql`
      query getItemSearch(
        $Authorization: String
        $item_sub_category_id: String
        $page_number: String
        $data_limit: String
        $search_values: String
        $filter_values: String
        $price_values: String
        $sort_by: String
      ) {
        getItemSearch(
          Authorization: $Authorization
          item_sub_category_id: $item_sub_category_id
          page_number: $page_number
          data_limit: $data_limit
          search_values: $search_values
          filter_values: $filter_values
          price_values: $price_values
          sort_by: $sort_by
        ) {
          item_name
          item_sub_category_id
          rack_id
          brand_id
          rating_point
          product_price_id

          description
          item_category_id
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

    // no_of_records
    // no_of_reviewers
    Config.client
      .query({
        query: query,
        fetchPolicy: "no-cache",
        variables: {
          Authorization,
          item_sub_category_id,
          page_number,
          data_limit,
          search_values,
          filter_values,
          price_values,
          sort_by,
        },
      })
      .then((result) => {
        console.log(result);
        const data = result.data.getItemSearch;

        if (data === null) {
          dispatch({
            type: "GETITEMLISTBYSUBCATEGORY",
            get_item_list: [],
            reset: true,
          });
          throw new Error("Something went wrong, Please try again!.");
        }

        dispatch({
          type: "GETITEMLISTBYSUBCATEGORY",
          get_item_list: result.data.getItemSearch,
          reset,
        });
        dispatch({ type: "IS_LOADING", is_loading: false });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "IS_LOADING", is_loading: false });
        dispatch({ type: "SUCCESS_MESSAGE", success_title: "catch error" });
        dispatch({
          type: "ERROR_MESSAGE",
          error_title: error.message ?? "something went wrong",
        });
      });
    return true;
  };
};

export const getItemListBySubCategory = (
  id,
  page_number,
  data_limit,
  item_name,
  reset = false
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
          item_category_id
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
          reset,
        });
        dispatch({ type: "IS_LOADING", is_loading: false });
      })
      .catch((error) => {
        dispatch({ type: "SUCCESS_MESSAGE", success_title: "catch error" });
        dispatch({
          type: "ERROR_MESSAGE",
          error_title: error.message ?? "something went wrong",
        });
        dispatch({ type: "IS_LOADING", is_loading: false });
      });
    return true;
  };
};

export const getFilterByCategory = (id) => (dispatch) => {
  const item_category_id = id;
  const Authorization = Config.getRequestToken();
  console.log(item_category_id, Authorization);
  const query = gql`
    query getFilterListByCategory(
      $Authorization: String
      $item_category_id: String
    ) {
      getFilterListByCategory(
        Authorization: $Authorization
        item_category_id: $item_category_id
      ) {
        id
        item_category_id
        item_category_name
        description
        branch_id
        company_id
        message
        filter_heading
        filter_value
      }
    }
  `;
  Config.client
    .query({
      query: query,
      fetchPolicy: "no-cache",
      variables: {
        Authorization,
        item_category_id,
      },
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      dispatch({ type: "SUCCESS_MESSAGE", success_title: "catch error" });
      dispatch({
        type: "ERROR_MESSAGE",
        error_title: error.message ?? "something went wrong",
      });
    });
};

export const getFilterBySubCategory = (id) => (dispatch) => {
  const item_sub_category_id = id;
  const Authorization = Config.getRequestToken();
  console.log(item_sub_category_id, Authorization);
  const query = gql`
    query getFilterListBySubCategory(
      $Authorization: String
      $item_sub_category_id: String
    ) {
      getFilterListBySubCategory(
        Authorization: $Authorization
        item_sub_category_id: $item_sub_category_id
      ) {
        id
        item_category_id
        item_category_name
        description
        branch_id
        company_id
        message
        filter_heading
        filter_value
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
      },
    })
    .then((result) => {
      console.log(result);
      const data = result.data.getFilterListBySubCategory;

      if (data.length === 0) {
        dispatch({
          type: "LOCAL_FILTERS",
        });
        return;
      }

      dispatch({
        type: GET_FILTERS,
        data,
      });
    })
    .catch((error) => {
      dispatch({ type: "SUCCESS_MESSAGE", success_title: "catch error" });
      dispatch({
        type: "ERROR_MESSAGE",
        error_title: error.message ?? "something went wrong",
      });
    });
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
          item_category_name
          rating_point

          brand_id
          description
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
          product_price_id
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

    // no_of_reviewers
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
        console.log(result);

        if (result.data === null) {
          dispatch({ type: "IS_LOADING", is_loading: false });
          throw new Error("Something went wrong!, Please Try again");
        }
        if (result.data.getItemListByMasterId.length) {
          dispatch({
            type: "PRODUCT_MASTER_LIST",
            product_master_list: [],
          });
          dispatch({
            type: "PRODUCT_MASTER_LIST",
            product_master_list: result.data.getItemListByMasterId,
          });
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: "PRODUCT_MASTER_LIST_SUCCESS",
          });
        }
        if (!result.data.getItemListByMasterId.length) {
          dispatch(empty_message());
          dispatch({
            type: "PRODUCT_MASTER_LIST",
            product_master_list: [],
          });
          dispatch({ type: "IS_LOADING", is_loading: false });
        }
        return true;
      })
      .catch((error) => {
        dispatch({ type: "IS_LOADING", is_loading: false });
        dispatch({ type: "SUCCESS_MESSAGE", success_title: "catch error" });
        dispatch({
          type: "ERROR_MESSAGE",
          error_title: error.message ?? "something went wrong",
        });
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
      })
      .catch((error) => console.log(error));
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
            coupon_code_value,
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
  pincode,
  product_price_id,
  message = "Item added to the cart"
) => {
  return async function (dispatch) {
    dispatch({ type: "IS_LOADING", is_loading: true });
    const Authorization = localStorage.getItem("Authorization");
    console.log(id, action_type, Authorization);
    const cart_type = "0";
    const mutation = `mutation addCartList($Authorization: String, $id: ID, $action_type:String ,$cart_type:String, $pincode: String, $product_price_id:String ) {
      addCartList(Authorization:$Authorization, id:$id, action_type:$action_type,  cart_type:$cart_type , pincode: $pincode, product_price_id: $product_price_id ){
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
        variables: {
          Authorization,
          id,
          action_type,
          cart_type,
          pincode,
          product_price_id,
        },
      }),
    })
      .then((response) => response.json())
      .then((responseText) => {
        console.log(responseText);
        if (responseText.data.addCartList["message"] === "SUCCESS") {
          // this.clearText();

          dispatch(getCartList());
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: message,
          });
        } else {
          if (responseText.data.addCartList["message"] === null) {
            localStorage.clear();
            dispatch(resetCart());
            dispatch(logout_user());
          } else {
            //alert(responseText.data.addCartList['message'])
          }
        }
      })
      .catch((error) => {
        //alert(error);
        console.log(error);
        localStorage.clear();
        dispatch(resetCart());
        dispatch(logout_user());
        dispatch({ type: "IS_LOADING", is_loading: false });
      });

    dispatch({ type: "IS_LOADING", is_loading: false });
  };
};

export const getCartList = () => {
  return async function (dispatch) {
    // dispatch({ type: "IS_LOADING", is_loading: true });
    const Authorization = localStorage.getItem("Authorization");
    const query = gql`
      query getCartList($Authorization: String) {
        getCartList(Authorization: $Authorization) {
          item_name
          item_sub_category_id
          product_price_id
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
          pincode
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

        if (result.data.getCartList === null) {
          localStorage.clear();
          dispatch(resetCart());
          dispatch(logout_user());
        }

        dispatch({
          type: GET_CART_LIST,
          data: result.data.getCartList,
        });
        dispatch({
          type: "SUCCESS_MESSAGE",
          success_title: "CART_SUCCESS",
        });
        dispatch({ type: "IS_LOADING", is_loading: false });
      })
      .catch((error) => {
        //alert(error);
        console.log(error);
        dispatch({ type: "IS_LOADING", is_loading: false });
      });
  };
};

export const addToCartLocal =
  (id, pincode = "") =>
  (dispatch) => {
    dispatch({
      type: ADD_TO_CART_LOCAL,
      id,
      pincode,
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
  console.log(cart_list);
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
      dispatch(getCartList());
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: "IS_LOADING", is_loading: false });
    });
};

export const resetCart = () => {
  return {
    type: RESET_CART,
  };
};

export const addReview =
  (product_id, ratings_point, review_title, description) => (dispatch) => {
    dispatch({ type: "IS_LOADING", is_loading: true });
    const Authorization = localStorage.getItem("Authorization");

    const mutation = `mutation addRating(
      $Authorization:String, 
      $product_id:String,
      $ratings_point:String,
      $review_title:String,
      $description:String
      ) 
      {
        addRating(
           Authorization:$Authorization,
           product_id:$product_id,  
           ratings_point:$ratings_point,  
           review_title:$review_title,  
           description:$description  
           ){
              
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
        variables: {
          Authorization,
          product_id,
          ratings_point,
          review_title,
          description,
        },
      }),
    })
      .then((response) => response.json())
      .then((responseText) => {
        console.log(responseText);
        const data = responseText.data.addRating;
        if (data === null) {
          throw new Error("Something Went Wrong!");
        }
        if (data.message === "SUCCESS") {
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: "RATING_SUCCESS",
          });
        } else {
          dispatch({
            type: "ERROR_MESSAGE",
            error_title: "Something went wrong, Please try again.",
          });
        }
        dispatch({ type: "IS_LOADING", is_loading: false });
      })
      .catch((error) => {
        //alert(error);
        dispatch({ type: "IS_LOADING", is_loading: false });
        console.log(error);
        localStorage.clear();
        dispatch(resetCart());
        dispatch(logout_user());
      });
  };

export const getRatingListByProductId =
  (product_id, page_number, data_limit, reset = true) =>
  (dispatch) => {
    const Authorization = Config.getRequestToken();
    const query = gql`
      query getRatingListByProductId(
        $Authorization: String
        $product_id: String
        $page_number: String
        $data_limit: String
      ) {
        getRatingListByProductId(
          Authorization: $Authorization
          product_id: $product_id
          page_number: $page_number
          data_limit: $data_limit
        ) {
          id
          product_id
          product_name
          product_type
          ratings_point
          description
          review_title
          image_title
          entered_name
          entry_date
          page_number
          data_limit
          message
        }
      }
    `;
    Config.client
      .query({
        query: query,
        fetchPolicy: "no-cache",
        variables: { Authorization, product_id, page_number, data_limit },
      })
      .then((result) => {
        console.log(result);

        const data = result.data.getRatingListByProductId;

        dispatch({
          type: GET_REVIEWS,
          data,
          reset,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    return true;
  };

export const getSubCategoryList = (id) => (dispatch) => {
  const item_category_id = id;
  const Authorization = Config.getRequestToken();
  const query = gql`
    query getSubCategoryList(
      $Authorization: String
      $item_category_id: String
    ) {
      getSubCategoryList(
        Authorization: $Authorization
        item_category_id: $item_category_id
      ) {
        item_sub_category_name
        image_address
        id
        description
      }
    }
  `;

  Config.client
    .query({
      query: query,
      fetchPolicy: "no-cache",
      variables: { Authorization, item_category_id },
    })
    .then((result) => {
      console.log(result);
      const data = result.data.getSubCategoryList;

      if (id === "2396") dispatch({ type: ADD_STYLE1, data });
      if (id === "2397") dispatch({ type: ADD_STYLE2, data });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const checkItemAvailability = (ids, pincode) => (dispatch) => {
  dispatch({ type: "IS_LOADING", is_loading: true });
  const master_id = ids;
  const Authorization = Config.getRequestToken();
  const query = gql`
    query checkItemAvailability(
      $Authorization: String
      $master_id: String
      $pincode: String
    ) {
      checkItemAvailability(
        Authorization: $Authorization
        master_id: $master_id
        pincode: $pincode
      ) {
        item_name
        id
        availability
      }
    }
  `;
  Config.client
    .query({
      query: query,
      fetchPolicy: "no-cache",
      variables: { Authorization, master_id, pincode },
    })
    .then((result) => {
      console.log(result);
      const data = result.data.checkItemAvailability;
    })
    .catch((error) => {
      dispatch({ type: "IS_LOADING", is_loading: false });
      console.log(error);
    });
};

export const getCouponCodeList = () => (dispatch) => {
  const Authorization = Config.getRequestToken();
  const query = gql`
    query getCouponCodeList($Authorization: String) {
      getCouponCodeList(Authorization: $Authorization) {
        id
        coupon_code_value
        coupon_code_percentage
        min_purchase_amount
        max_cashback_amount
        order_amount
        coupon_amount
        start_date
        end_date
        coupon_code_for
        message
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
      console.log(result);
      const data = result.data.getCouponCodeList;

      dispatch({
        type: GET_COUPON_LIST,
        data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
