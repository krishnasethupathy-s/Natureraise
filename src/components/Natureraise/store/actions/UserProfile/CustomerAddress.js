import Config from "../../../../../Config";
import { gql } from "@apollo/client";

export const GET_CUSTOMER_ADDRESS_LIST = "GET_CUSTOMER_ADDRESS_LIST";

export const SUCCESS_MESSAGE = "SUCCESS_MESSAGE";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const FORM_ACTIONS = "FORM_ACTIONS";

export const empty_message = () => {
  return function (dispatch) {
    dispatch({ type: "SUCCESS_MESSAGE", success_title: "" });
    dispatch({ type: "ERROR_MESSAGE", error_title: "" });
    dispatch({ type: "FORM_ACTIONS", form_action: "" });
    return true;
  };
};

export const addCustomerAddress =
  (
    address_id,
    contact_name,
    mobile_number,
    address_line1,
    address_line2,
    city,
    state,
    pincode,
    landmark,
    type
  ) =>
  (dispatch) => {
    const Authorization = localStorage.getItem("Authorization");
    const email_id = localStorage.getItem("email_id");
    console.log(email_id);
    const mutation = `mutation addCustomerAddress(
      $Authorization:String, 
      $address_id:String , 
      $contact_name:String , 
      $mobile_number:String , 
      $address_line1:String , 
      $address_line2:String , 
      $city:String , 
      $state:String , 
      $pincode:String, 
      $landmark:String, 
      $type:String, 
      $email_id:String 
      ) 
      { addCustomerAddress(
        Authorization:$Authorization, 
        address_id:$address_id , 
        contact_name:$contact_name ,
        mobile_number:$mobile_number , 
        address_line1:$address_line1 , 
        address_line2:$address_line2, 
        city:$city, 
        state:$state, 
        pincode:$pincode, 
        landmark:$landmark, 
        type:$type, 
        email_id:$email_id
        )
         { message } 
        }`;

    fetch(Config.BaseUrl + "graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          Authorization,
          address_id,
          contact_name,
          mobile_number,
          address_line1,
          address_line2,
          city,
          state,
          pincode,
          landmark,
          type,
          email_id,
        },
      }),
    })
      .then((response) => response.json())
      .then((responseText) => {
        // dispatch({ type: "FORM_ACTIONS", form_action: "add" },);
        console.log(responseText);
        dispatch({ type: "IS_LOADING", is_loading: false });
        if (responseText.data.addCustomerAddress["message"] === "SUCCESS") {
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: "ADD_SUCCESS_MESSAGE",
          });
        } else {
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: "ADD_ERROR_MESSAGE",
          });
          dispatch({
            type: "ERROR_MESSAGE",
            error_title: responseText.data.addCustomerAddress["message"],
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: "SUCCESS_MESSAGE",
          success_title: "ADD_CATCH_MESSAGE",
        });
        dispatch({ type: "ERROR_MESSAGE", error_title: error });
      });
    return Promise.resolve();
  };

export const getCustomerAddressList = () => (dispatch) => {
  const Authorization = localStorage.getItem("Authorization");
  const query = gql`
    query getCustomerAddressList($Authorization: String) {
      getCustomerAddressList(Authorization: $Authorization) {
        id
        contact_name
        mobile_number
        address_line1
        address_line2
        city
        state
        type
        pincode
        landmark
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
      dispatch({
        type: "GET_CUSTOMER_ADDRESS_LIST",
        address_data_list: result.data.getCustomerAddressList,
      });
    })
    .catch((error) => {
      dispatch({ type: "SUCCESS_MESSAGE", success_title: "catch error" });
      dispatch({ type: "ERROR_MESSAGE", error_title: error });
    });

  return Promise.resolve();
};

export const deleteCustomerAddress = (id) => (dispatch) => {
  const Authorization = localStorage.getItem("Authorization");
  const mutation = `mutation deleteCustomerAddress($Authorization:String, $id:ID ) {
            deleteCustomerAddress(Authorization:$Authorization, id:$id){
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

      variables: { Authorization, id },
    }),
  })
    .then((response) => response.json())
    .then((responseText) => {
      dispatch({ type: "FORM_ACTIONS", form_action: "delete" });
      if (responseText.data.deleteCustomerAddress["message"] === "SUCCESS") {
        dispatch({
          type: "SUCCESS_MESSAGE",
          success_title: "DELETE_SUCCESS_MESSAGE",
        });
      } else {
        dispatch({
          type: "ERROR_MESSAGE",
          success_title: responseText.data.deleteCustomerAddress["message"],
        });
      }
    })
    .catch((error) => {
      dispatch({ type: "SUCCESS_MESSAGE", success_title: "catch error" });
      dispatch({ type: "ERROR_MESSAGE", error_title: error });
    });

  return Promise.resolve();
};
