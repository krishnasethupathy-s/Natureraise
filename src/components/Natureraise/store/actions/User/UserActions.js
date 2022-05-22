import Config from '../../../../../Config';


export const USER_REGISTER="USER_REGISTER";
export const SUCCESS_MESSAGE="SUCCESS_MESSAGE";
export const ERROR_MESSAGE="ERROR_MESSAGE";


export const empty_message=()=> {
    return function(dispatch) {
        dispatch({ type: "SUCCESS_MESSAGE", success_title: "" },);
        dispatch({ type: "ERROR_MESSAGE", error_title: "" }); 
        return true;
    };
  }

export const register=(first_name,last_name,mobile_number1,email_id,password,client_ip)=>dispatch=>
{
    const request_token = Config.getRequestToken();
       const mutation = `mutation SignUpAction($email_id:String, $mobile_number1:String, $first_name:String, $last_name:String,  
                                     $password:String, $request_token:String, $client_ip:String ) {
      SignUpAction(email_id:$email_id, mobile_number1:$mobile_number1, first_name:$first_name, last_name:$last_name, password:$password ,
        request_token:$request_token, client_ip:$client_ip){
          message
      }
  }`;
        fetch(Config.BaseUrl + 'graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: mutation,
                variables: { email_id, mobile_number1, first_name, last_name, password, request_token, client_ip },
            })
        }).then(response => response.json())
       
            .then(responseText => {
                
                if (responseText.data.SignUpAction['message'] === "SUCCESS") {
                    dispatch({ type: "SUCCESS_MESSAGE", success_title: responseText.data.SignUpAction['message'] },);
                }
                else if (responseText.data.SignUpAction['message'] === "0") {
                    dispatch({ type: "SUCCESS_MESSAGE", success_title: responseText.data.SignUpAction['message'] },);
                }
                else {
                    dispatch({ type: "SUCCESS_MESSAGE", success_title: "error" },);
                    dispatch({ type: "ERROR_MESSAGE", error_title: "Please try again later..." });
                }
                //return responseText;
            }).catch((error) => {
                dispatch({ type: "SUCCESS_MESSAGE", success_title: "catch error" },);
                dispatch({ type: "ERROR_MESSAGE", error_title: error});
                //return '';
            });
            return Promise.resolve();
  };




  export const SignInAction=(username,password,client_ip)=>dispatch=>
{
    const request_token = Config.getRequestToken();
        const mutation = `mutation SignInAction($username:String, $password:String, $client_ip:String, $request_token:String) {
            SignInAction(username:$username, password:$password, client_ip:$client_ip, request_token:$request_token){
          message,first_name,last_name,token,image_address,mobile_number1,email_id
      }
  }`;

        fetch(Config.BaseUrl + 'graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: mutation,
                variables: { username, password, client_ip, request_token },
            })
        }).then(response => response.json())
            .then(responseText => {
                if (responseText.data.SignInAction['message'] === "SUCCESS") {
                    dispatch({ type: "SUCCESS_MESSAGE", success_title: responseText.data.SignInAction['message'] },);
                    localStorage.setItem('first_name', responseText.data.SignInAction['first_name']);
                    localStorage.setItem('last_name', responseText.data.SignInAction['last_name']);
                    localStorage.setItem('mobile_number1', responseText.data.SignInAction['mobile_number1']);
                    localStorage.setItem('email_id', responseText.data.SignInAction['email_id']);
                    localStorage.setItem('Authorization', responseText.data.SignInAction['token']);
                    localStorage.setItem('image_address', responseText.data.SignInAction['image_address']);
                }else {
                    dispatch({ type: "ERROR_MESSAGE", error_title: "Invalid Crediental" });
                }
            }).catch((error) => {
                dispatch({ type: "ERROR_MESSAGE", error_title: "error" });

            });
            return Promise.resolve();
  };




  export const CustomerUpdation=(first_name, last_name, mobile_number1, email_id)=>dispatch=>
  {
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
        dispatch({ type: "SUCCESS_MESSAGE", success_title: "CUSTOMER_PROFILE_UPDATE" });

        


          localStorage.setItem('first_name',first_name);
          localStorage.setItem('last_name',last_name);
          localStorage.setItem('mobile_number1',mobile_number1);
          localStorage.setItem('email_id',email_id);
       
        } else {
            dispatch({ type: "ERROR_MESSAGE", error_title: responseText.data.CustomerUpdation["message"]});
        }
      })
      .catch((error) => {
        dispatch({ type: "ERROR_MESSAGE", error_title: error});
        
     
      });
              return Promise.resolve();
    };