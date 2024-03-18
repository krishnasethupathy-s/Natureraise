import { min } from "moment";
import Config from "../../../../../Config";
import { syncLocalCart, resetCart } from "../Product/ProductActions";

export const USER_REGISTER = "USER_REGISTER";
export const SUCCESS_MESSAGE = "SUCCESS_MESSAGE";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

export const empty_message = () => {
  return function (dispatch) {
    dispatch({ type: "SUCCESS_MESSAGE", success_title: "" });
    dispatch({ type: "ERROR_MESSAGE", error_title: "" });
    return true;
  };
};

export const set_user = (user, provider) => (dispath) => {
  dispath({
    type: SET_USER,
    data: user,
    provider,
  });
};
export const logout_user = () => (dispath) => {
  dispath({
    type: "RESET_RECENT_VIEW",
  });
  dispath({
    type: LOGOUT_USER,
  });
};

export const register =
  (first_name, last_name, mobile_number1, email_id, password, client_ip) =>
  (dispatch) => {
    dispatch({ type: "IS_LOADING", is_loading: true });
    const request_token = Config.getRequestToken();
    const mutation = `mutation SignUpAction($email_id:String, $mobile_number1:String, $first_name:String, $last_name:String,  
                                     $password:String, $request_token:String, $client_ip:String ) {
      SignUpAction(email_id:$email_id, mobile_number1:$mobile_number1, first_name:$first_name, last_name:$last_name, password:$password ,
        request_token:$request_token, client_ip:$client_ip){
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
        variables: {
          email_id,
          mobile_number1,
          first_name,
          last_name,
          password,
          request_token,
          client_ip,
        },
      }),
    })
      .then((response) => response.json())

      .then((responseText) => {
        if (responseText.data.SignUpAction["message"] === "SUCCESS") {
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: responseText.data.SignUpAction["message"],
          });
        } else if (responseText.data.SignUpAction["message"] === "0") {
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: responseText.data.SignUpAction["message"],
          });
        } else {
          dispatch({ type: "SUCCESS_MESSAGE", success_title: "error" });
          dispatch({
            type: "ERROR_MESSAGE",
            error_title: "Please try again later...",
          });
        }
        //return responseText;
      })
      .catch((error) => {
        dispatch({ type: "SUCCESS_MESSAGE", success_title: "catch error" });
        dispatch({ type: "ERROR_MESSAGE", error_title: error });
        //return '';
      });
    return Promise.resolve();
  };

export const SignInAction =
  (username, password, client_ip, localCart) => (dispatch) => {
    const request_token = Config.getRequestToken();
    const mutation = `mutation SignInAction($username:String, $password:String, $client_ip:String, $request_token:String) {
            SignInAction(username:$username, password:$password, client_ip:$client_ip, request_token:$request_token){
          message,first_name,last_name,token,image_address,mobile_number1,email_id,gst_number,pan_number
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
        variables: { username, password, client_ip, request_token },
      }),
    })
      .then((response) => response.json())
      .then((responseText) => {
        console.log(responseText);
        if (responseText.data.SignInAction["message"] === "SUCCESS") {
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: responseText.data.SignInAction["message"],
          });
          localStorage.setItem(
            "first_name",
            responseText.data.SignInAction["first_name"]
          );
          localStorage.setItem(
            "last_name",
            responseText.data.SignInAction["last_name"]
          );
          localStorage.setItem(
            "mobile_number1",
            responseText.data.SignInAction["mobile_number1"]
          );
          localStorage.setItem(
            "email_id",
            responseText.data.SignInAction["email_id"]
          );
          localStorage.setItem(
            "Authorization",
            responseText.data.SignInAction["token"]
          );
          localStorage.setItem(
            "image_address",
            responseText.data.SignInAction["image_address"]
          );

          localStorage.setItem(
            "gst_number",
            responseText.data.SignInAction["gst_number"]
          );
          localStorage.setItem(
            "pan_number",
            responseText.data.SignInAction["pan_number"]
          );

          localStorage.setItem("provider", "");
          const date = new Date();
          const currentTimePulsNine = new Date(
            date.getTime() + 10 * 60000
          ).toISOString();
          const data = responseText.data.SignInAction;
          data.expiryTime = currentTimePulsNine;

          localStorage.setItem("expiryTime", data.expiryTime);

          dispatch(set_user(responseText.data.SignInAction, ""));
          console.log(localCart);
          dispatch(syncLocalCart(localCart));
        } else {
          dispatch({
            type: "ERROR_MESSAGE",
            error_title: "Invalid Crediental",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: "ERROR_MESSAGE", error_title: "error" });
      });
    return Promise.resolve();
  };

export const CustomerUpdation =
  (first_name, last_name, mobile_number1, email_id) => (dispatch) => {
    const Authorization = localStorage.getItem("Authorization");

    const mutation = `mutation CustomerUpdation($email_id:String, $mobile_number1:String, $first_name:String, $last_name:String,  
                                          $Authorization:String ) {
                                            CustomerUpdation(email_id:$email_id, mobile_number1:$mobile_number1, first_name:$first_name, last_name:$last_name,
            Authorization:$Authorization){
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
        variables: {
          email_id,
          mobile_number1,
          first_name,
          last_name,
          Authorization,
        },
      }),
    })
      .then((response) => response.json())

      .then((responseText) => {
        if (responseText.data.CustomerUpdation["message"] === "SUCCESS") {
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: "CUSTOMER_PROFILE_UPDATE",
          });

          localStorage.setItem("first_name", first_name);
          localStorage.setItem("last_name", last_name);
          localStorage.setItem("mobile_number1", mobile_number1);
          localStorage.setItem("email_id", email_id);
        } else {
          dispatch({
            type: "ERROR_MESSAGE",
            error_title: responseText.data.CustomerUpdation["message"],
          });
        }
      })
      .catch((error) => {
        dispatch({ type: "ERROR_MESSAGE", error_title: error });
      });
    return Promise.resolve();
  };

export const refreshAuthToken = () => async (dispatch) => {
  const Authorization = localStorage.getItem("Authorization");
  const form_Data1 = JSON.stringify({ Authorization });

  fetch(Config.BaseUrl + "RefreshToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: form_Data1,
  })
    .then((res) => res.json())
    .then((resJson) => {
      if (resJson.message !== "SUCCESS")
        throw new Error("Something Went wrong");

      const date = new Date();
      const currentTimePulsNine = new Date(
        date.getTime() + 7 * 60000
      ).toISOString();
      const expiryTime = currentTimePulsNine;

      localStorage.setItem("expiryTime", expiryTime);
      localStorage.setItem("Authorization", resJson.token);
      console.log(resJson);
      dispatch({
        type: REFRESH_TOKEN,
        data: {
          expiryTime,
          token: resJson.token,
        },
      });
    })
    .catch((err) => {
      localStorage.clear();
      dispatch(resetCart());
      dispatch(logout_user());
    });
};

export const LoginWithSocialID =
  (
    social_id_type,
    social_id,
    first_name,
    last_name,
    email_id,
    image_address,
    client_ip,
    localCart
  ) =>
  (dispatch) => {
    const request_token = Config.getRequestToken();
    const mutation = `mutation LoginWithSocialID(
      $social_id_type: String, 
      $social_id: String, 
      $first_name: String, 
      $last_name: String, 
      $email_id: String, 
      $image_address: String, 
      $client_ip: String, 
      $request_token: String
      ) {
      LoginWithSocialID(
        social_id_type: $social_id_type, 
        social_id: $social_id, 
        first_name:$first_name, 
        last_name:$last_name, 
        email_id:$email_id, 
        image_address: $image_address, 
        client_ip:$client_ip, 
        request_token:$request_token
      ){
        message,
        first_name,
        last_name,
        token,
        image_address,
        mobile_number1,
        email_id,
        gst_number,
        pan_number,
        
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
        variables: {
          social_id_type,
          social_id,
          first_name,
          last_name,
          email_id,
          image_address,
          client_ip,
          request_token,
        },
      }),
    })
      .then((response) => response.json())
      .then((responseText) => {
        console.log(responseText);
        if (responseText.data.LoginWithSocialID["message"] === "SUCCESS") {
          localStorage.setItem(
            "user_id",
            responseText.data.LoginWithSocialID["id"] ?? ""
          );

          localStorage.setItem(
            "first_name",
            responseText.data.LoginWithSocialID["first_name"]
          );
          localStorage.setItem(
            "last_name",
            responseText.data.LoginWithSocialID["last_name"]
          );
          localStorage.setItem(
            "mobile_number1",
            responseText.data.LoginWithSocialID["mobile_number1"]
          );
          localStorage.setItem(
            "email_id",
            responseText.data.LoginWithSocialID["email_id"]
          );
          localStorage.setItem(
            "Authorization",
            responseText.data.LoginWithSocialID["token"]
          );
          localStorage.setItem(
            "image_address",
            responseText.data.LoginWithSocialID["image_address"]
          );

          localStorage.setItem(
            "gst_number",
            responseText.data.LoginWithSocialID["gst_number"]
          );
          localStorage.setItem(
            "pan_number",
            responseText.data.LoginWithSocialID["pan_number"]
          );

          localStorage.setItem("provider", social_id_type);

          const date = new Date();
          const currentTimePulsNine = new Date(
            date.getTime() + 10 * 60000
          ).toISOString();
          const data = responseText.data.LoginWithSocialID;
          data.expiryTime = currentTimePulsNine;

          localStorage.setItem("expiryTime", data.expiryTime);

          dispatch(
            set_user(responseText.data.LoginWithSocialID, social_id_type)
          );
          console.log(localCart);
          dispatch(syncLocalCart(localCart));
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: responseText.data.LoginWithSocialID["message"],
          });
        } else {
          dispatch({
            type: "ERROR_MESSAGE",
            error_title: "Invalid Crediental",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: "ERROR_MESSAGE", error_title: "error" });
      });
    return Promise.resolve();
  };

export const GetResetPasswordLinkByMail = (email_id) => async (dispatch) => {
  dispatch({ type: "IS_LOADING", is_loading: true });
  try {
    const form_Data1 = JSON.stringify({ email_id });
    let response = await fetch(Config.BaseUrl + "GetResetPasswordLinkByMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: form_Data1,
    });
    let responseJsonData = await response.json();
    console.log(responseJsonData);
    if (responseJsonData.message === "SUCCESS") {
      dispatch({
        type: "SUCCESS_MESSAGE",
        success_title: responseJsonData.message,
      });
    } else {
      dispatch({
        type: "ERROR_MESSAGE",
        error_title: "FAILED",
      });
    }

    dispatch({ type: "IS_LOADING", is_loading: false });
  } catch (e) {
    console.log(e);
    dispatch({ type: "IS_LOADING", is_loading: false });
    dispatch({
      type: "ERROR_MESSAGE",
      error_title: "ERROR",
    });
  }
};

export const ChangePasswordFunction1 =
  (current_password, new_password, confirm_password) => async (dispatch) => {
    dispatch({ type: "IS_LOADING", is_loading: true });
    try {
      const Authorization = localStorage.getItem("Authorization");
      const customer_id = localStorage.getItem("user_id");
      const form_Data1 = JSON.stringify({
        Authorization,
        current_password,
        new_password,
        confirm_password,
      });
      let response = await fetch(
        Config.BaseUrl + "ChangePasswordByCurrentPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          body: form_Data1,
        }
      );
      let responseJsonData = await response.json();
      console.log(responseJsonData);
      dispatch({ type: "IS_LOADING", is_loading: false });
    } catch (e) {
      console.log(e);
      dispatch({ type: "IS_LOADING", is_loading: false });
    }
  };

export const MailVerficationAction = (customer_id) => async (dispatch) => {
  dispatch({ type: "IS_LOADING", is_loading: true });
  const status = 1;
  const form_Data1 = JSON.stringify({ status, customer_id });

  fetch(Config.BaseUrl + "MailVerification", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: form_Data1,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if (responseJson.message === "SUCCESS") {
        dispatch({
          type: "SUCCESS_MESSAGE",
          success_title: "MAIL_VERIFICATION_SUCCESS",
        });
        dispatch({
          type: "CUSTOMER_ID",
          id: responseJson.id,
        });
      } else {
        dispatch({
          type: "SUCCESS_MESSAGE",
          success_title: "MAIL_VERIFICATION_ERROR",
        });
        dispatch({
          type: "ERROR_MESSAGE",
          error_title: responseJson.message,
        });
      }
      dispatch({ type: "IS_LOADING", is_loading: false });
    })
    .catch((error) => {
      dispatch({
        type: "SUCCESS_MESSAGE",
        success_title: "MAIL_VERIFICATION_CATCH_ERROR",
      });
      dispatch({
        type: "ERROR_MESSAGE",
        error_title: "Somthing went wrong, try again",
      });
      dispatch({ type: "IS_LOADING", is_loading: false });
    });
};

export const ChangePasswordById =
  (new_password, confirm_password, customer_id) => (dispatch) => {
    dispatch({ type: "IS_LOADING", is_loading: true });
    const Authorization = Config.getRequestToken();
    const form_Data1 = JSON.stringify({
      Authorization,
      new_password,
      confirm_password,
      customer_id,
    });
    fetch(Config.BaseUrl + "ChangePasswordById", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: form_Data1,
    })
      .then((res) => res.json())
      .then((resjson) => {
        console.log(resjson);
        if (resjson.message === "SUCCESS") {
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: "PASSWORD_RESET_SUCCESS",
          });
        } else {
          dispatch({
            type: "SUCCESS_MESSAGE",
            success_title: "PASSWORD_RESET_ERROR",
          });
          dispatch({
            type: "ERROR_MESSAGE",
            error_title: resjson.message,
          });
        }

        dispatch({ type: "IS_LOADING", is_loading: false });
      })
      .catch((e) => {
        console.log(e);
        dispatch({
          type: "SUCCESS_MESSAGE",
          success_title: "PASSWORD_RESET_CATCH_ERROR",
        });
        dispatch({
          type: "ERROR_MESSAGE",
          error_title: "Something went wrong",
        });
        dispatch({ type: "IS_LOADING", is_loading: false });
      });
  };
