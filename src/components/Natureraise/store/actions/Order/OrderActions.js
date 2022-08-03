import Config from "../../../../../Config";
import { gql } from "@apollo/client";

export const SUCCESS_MESSAGE = "SUCCESS_MESSAGE";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const IS_LOADING = "IS_LOADING";
export const GET_ORDER_LIST = "GET_ORDER_LIST";
export const GET_ORDER_DETAIL = "GET_ORDER_DETAIL";
export const GET_ORDER_DETAIL_PRODUCTS = "GET_ORDER_DETAIL_PRODUCT";
export const GET_ORDER_DETAIL_STATUS = "GET_ORDER_DETAIL_STATUS";
export const RESERT_ORDER_DETAIL = "RESERT_ORDER_DETAIL";

export const getOrderListPageWise = (page_number, data_limit) => (dispatch) => {
  console.log("Hey");
  const order_type = "IO";
  const Authorization = localStorage.getItem("Authorization");

  const query = gql`
    query getOrderListPageWise(
      $Authorization: String
      $order_type: String
      $page_number: String
      $data_limit: String
    ) {
      getOrderListPageWise(
        Authorization: $Authorization
        order_type: $order_type
        page_number: $page_number
        data_limit: $data_limit
      ) {
        order_id
        order_type
        order_date
        order_status

        order_amount
        delivery_charges
        net_amount
        invoice_id
        id
        product_list {
          id
          item_id
          item_type
          item_category_id
          item_category_name
          item_sub_category_id
          item_sub_category_name
          image_address
          brand_id
          brand_name
          item_name
          hsn
        }
        orderStatus {
          current_status
          status_date
          status_details
          delivery_time
        }
      }
    }
  `;

  Config.client
    .query({
      query: query,
      fetchPolicy: "no-cache",
      variables: { Authorization, order_type, page_number, data_limit },
    })
    .then((result) => {
      // this.setState({ isLoadingComplete: false });
      console.log(result);
      const data = result.data.getOrderListPageWise;
      dispatch({
        type: "GET_ORDER_LIST",
        data,
      });
      dispatch({ type: "IS_LOADING", is_loading: false });
    })
    .catch((error) => {
      //alert(error);
      console.log(error);
      dispatch({ type: "IS_LOADING", is_loading: false });
    });
};

export const getOrderList = () => (dispatch) => {
  console.log("Hey");
  const order_type = "IO";
  const Authorization = localStorage.getItem("Authorization");
  const month_id = "06";
  const year_id = "2022";
  const query = gql`
    query getOrderList(
      $Authorization: String
      $order_type: String
      $month_id: String
      $year_id: String
    ) {
      getOrderList(
        Authorization: $Authorization
        order_type: $order_type
        month_id: $month_id
        year_id: $year_id
      ) {
        order_id
        order_type
        order_date
        order_status
        order_amount
        delivery_charges
        net_amount
        invoice_id
        id
        product_list {
          id
          item_id
          item_type
          item_category_id
          item_category_name
          item_sub_category_id
          item_sub_category_name
          brand_id
          brand_name
          item_name
          hsn
        }

        orderStatus {
          current_status
          status_date
          status_details
          delivery_time
        }
      }
    }
  `;

  Config.client
    .query({
      query: query,
      fetchPolicy: "no-cache",
      variables: { Authorization, order_type, month_id, year_id },
    })
    .then((result) => {
      // this.setState({ isLoadingComplete: false });
      console.log(result);
    })
    .catch((error) => {
      //alert(error);
      console.log(error);
    });
};

export const getOrderList1 = () => async (dispatch) => {
  try {
    const Authorization = localStorage.getItem("Authorization");
    const company_id = "1";
    const branch_id = "1";
    const order_type = "IO";
    const role = "Admin";
    const d1 = Config.d1;
    const d2 = Config.d2;
    const form_Data1 = JSON.stringify({
      Authorization,
      company_id,
      branch_id,
      role,
      d1,
      d2,
      order_type,
    });
    let response = await fetch(Config.BaseUrl + "OrderList/", {
      method: "POST",
      headers: {
        //"Access-Control-Allow-Origin": '*',
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: form_Data1,
    });
    const responseJsonData = await response.json();
    console.log(responseJsonData);
  } catch (e) {
    console.log(e);
  }
};

export const getOrderCurrentList = () => (dispatch) => {
  console.log("Hey1");
  const order_type = "IO";
  const Authorization = localStorage.getItem("Authorization");

  const query = gql`
    query getCurrentOrderList($Authorization: String, $order_type: String) {
      getCurrentOrderList(
        Authorization: $Authorization
        order_type: $order_type
      ) {
        order_id
        order_type
        order_date
        order_status
        order_amount
        delivery_charges
        net_amount
        invoice_id
        id
      }
    }
  `;
  Config.client
    .query({
      query: query,
      fetchPolicy: "no-cache",
      variables: { Authorization, order_type },
    })
    .then((result) => {
      const data = result.data.getCurrentOrderList;
      dispatch({
        type: "GET_ORDER_LIST",
        data,
      });
    })
    .catch((error) => {
      //alert(error);
      console.log(error);
    });
};

export const getOrderDetail = (order_id) => (dispatch) => {
  const Authorization = localStorage.getItem("Authorization");
  const id = order_id;
  console.log(id, Authorization);
  const query = gql`
    query getOrderData($Authorization: String, $id: ID) {
      getOrderData(Authorization: $Authorization, id: $id) {
        order_id
        order_type
        order_date
        order_status
        order_amount
        lab_at
        delivery_charges
        net_amount
        coupon_amount
        invoice_id
        invoice_file_path
        payment_type
        payment_status
        entry_date
        update_date
        message
        member_id
        member_first_name
        member_last_name
        member_gender
        member_dob
        member_age
        member_relation
        member_mobile_number1
        member_mobile_number2
        delivery_address_id
        delivery_contact_name
        delivery_mobile_number
        delivery_address_line1
        delivery_address_line2
        delivery_city
        delivery_state
        delivery_pincode
        delivery_landmark
        delivery_address_type
        lab_address_id
        lab_name
        lab_contact_name
        lab_mobile_number
        lab_address_line1
        lab_address_line2
        lab_city
        lab_state
        lab_pincode
        order_count1
        order_count2
        order_count3
        order_count4
        razorpay_payment_id
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
      console.log(result);
      const data = result.data.getOrderData;
      dispatch({
        type: GET_ORDER_DETAIL,
        data,
      });
    })
    .catch((error) => {
      //alert(error);
      console.log(error);
    });
};

export const getOrderedProductList = (id) => (dispatch) => {
  const order_id = id;
  const Authorization = localStorage.getItem("Authorization");
  const query = gql`
    query getOrderedProductList($Authorization: String, $order_id: String) {
      getOrderedProductList(
        Authorization: $Authorization
        order_id: $order_id
      ) {
        item_name
        item_sub_category_id
        retail_price
        selling_price
        percentage
        uom
        item_size
        type_name
        description
        brand_name
        id
        cart_list
        item_size
        item_color
        image_address
        net_amount
        cart_count
        delivery_charges
        net_total
        total_amount
      }
    }
  `;

  Config.client
    .query({
      query: query,
      fetchPolicy: "no-cache",
      variables: { Authorization, order_id },
    })
    .then((result) => {
      console.log(result);
      const data = result.data.getOrderedProductList;
      dispatch({
        type: GET_ORDER_DETAIL_PRODUCTS,
        data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getOrderStatusList = (order_id) => (dispatch) => {
  const id = order_id;
  const Authorization = localStorage.getItem("Authorization");
  const query = gql`
    query getOrderStatusList($Authorization: String, $id: ID) {
      getOrderStatusList(Authorization: $Authorization, id: $id) {
        current_status
        status_date
        status_details
        delivery_time
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
      console.log(result);
      const data = result.data.getOrderStatusList;

      dispatch({
        type: GET_ORDER_DETAIL_STATUS,
        data,
      });
    })
    .catch((error) => {
      //alert(error);
      console.log(error);
    });
};

/*
let arr = result.data.getOrderStatusList;
      let arr1 = this.state.status_list;
      if(arr.length === 0){
          arr1[0]["dateTime"] = this.state.order_data.order_date;
      }
      for (let i = 0; i < arr.length; i++) {
             
              if (arr[i]["current_status"] === "0" || arr[i]["current_status"] === "1" || arr[i]["current_status"] === "2") {
                  this.setState({ currentPosition: 0 });  
                  arr1[0]["status"] = "Ordered";
                  arr1[0]["status"] = arr[i]["status_details"];
                  arr1[0]["dateTime"] = arr[i]["status_date"];  
              }else if (arr[i]["current_status"] === "3" || arr[i]["current_status"] === "4" || arr[i]["current_status"] === "5" || arr[i]["current_status"] === "6") {
                  this.setState({ currentPosition: 1 });  
                  arr1[1]["status"] = "Processing";
                  arr1[1]["status"] = arr[i]["status_details"];
                  arr1[1]["dateTime"] = arr[i]["status_date"];  
              }else  if (arr[i]["current_status"] === "7") {
                  this.setState({ currentPosition: 2 });  
                  arr1[2]["status"] = "Packed";
                  arr1[2]["status"] = arr[i]["status_details"];
                  arr1[2]["dateTime"] = arr[i]["status_date"];  
              }else  if (arr[i]["current_status"] === "8") {
                  this.setState({ currentPosition: 3 });  
                  arr1[3]["status"] = "Shiped";
                  arr1[3]["status"] = arr[i]["status_details"];
                  arr1[3]["dateTime"] = arr[i]["status_date"];  
              }else  if (arr[i]["current_status"] === "9") {
                  this.setState({ currentPosition: 4 });  
                  arr1[4]["status"] = "Delivered";
                  arr1[4]["status"] = arr[i]["status_details"];
                  arr1[4]["dateTime"] = arr[i]["status_date"];  
              }else{
                  this.setState({ currentPosition: 0 });  
                  arr1[0]["status"] = "Canceled";
                  arr1[0]["status"] = arr[i]["status_details"];
                  arr1[0]["dateTime"] = arr[i]["status_date"];  
              }          
      }
      this.setState({ status_list: arr1 });

*/
