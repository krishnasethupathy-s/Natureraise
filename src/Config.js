import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import moment from "moment/moment.js";
import { gql } from "@apollo/client";

const getRequestToken = () => {
  //var now = moment(new Date()).format("MMM DD YYYY h:mm");
  var now = moment(new Date()).format("MMM DD YYYY hh");
  var sha1 = require("sha1");
  sha1 = sha1(now + "vimkes");
  return sha1;
};
//  const BaseUrl = 'https://www.demo1.azacus.co.in/';
//const BaseUrl = 'https://www.demo1.azacus.co.in/';
//const BaseUrl = 'http://162.220.165.182:3035/';
//  const BaseUrl = 'http://162.220.165.182:3020/Buskes/';
// const BaseUrl = 'http://192.168.43.14:8080/';

// const BaseUrl = 'https://www.asz.azacus.co.in/';
// const BaseUrl = "http://192.168.0.7:8080/";

//  const BaseUrl = 'https://www.app.natureraise.in/';
// const BaseUrl = "https://democrm.vimkes.com/";
//const BaseUrl = 'https://www.api.dhiyaonlineshop.com/';

let BaseUrl;
let Razorpaykey;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  Razorpaykey = "rzp_test_iZt5e6oaqwbtfP";
  // BaseUrl = "https://democrm.vimkes.com/";
  BaseUrl = "https://www.api.naturesave.in/";

} else {
  Razorpaykey = "rzp_live_Wrr6uxbeUoLQ9o";
  BaseUrl = "https://www.api.naturesave.in/";
}

// Dev

// Prod

const GA = "";
const gooleLogin =
  "93793167500-omr4gb2sjr17c2gdcvejklp2dsd9m950.apps.googleusercontent.com";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: BaseUrl + "graphql",
  }),
});

// const getRequestToken = () => {
//   alert();
//   client
//     .query({
//       query: gql`
//       {
//         getCurrentTime(current_time:"current_time") {
//           current_time
//   }}` })
//     .then(result => {
//       var now = result.data.getCurrentTime['current_time'];
//       alert(now);
//       var sha1 = require('sha1');
//       sha1 = sha1(now + "vimkes");
//       return sha1;
//     });
// }

const datamatch = (id, arr) => {
  //

  for (let i = 0; i < arr.length; i++) {
    if (id === arr[i]["id"]) {
      return arr[i]["name"];
    }
  }
};

const printIframe = (id) => {
  const iframe = document.frames
    ? document.frames[id]
    : document.getElementById(id);
  const iframeWindow = iframe.contentWindow || iframe;

  iframe.focus();
  iframeWindow.print();

  return false;
};

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const compareTime = (str1, str2) => {
  if (str1 === str2) {
    return 0;
  }

  var time1Date = new Date("01/01/2000 " + str1);
  var time2Date = new Date("01/01/2000 " + str2);
  if (time1Date >= time2Date) {
    return 1;
  } else {
    return 0;
  }

  // var time1 = str1.split(':');
  // var time2 = str2.split(':');

  // if (time1Date >= time2Date) {
  //   console.log("time1");
  // } else {
  //   console.log("time2");
  // }

  // if (eval(time1[0]) > eval(time2[0])) {
  //   return 1;
  // } else if (eval(time1[0]) == eval(time2[0]) && eval(time1[1]) > eval(time2[1])) {
  //   return 1;
  // } else {
  //   return -1;
  // }
};

const getWhichTime = (str1) => {
  var t2 = str1.split(":")[0];
  var hours = t2 * 1;
  var greeting = "";
  if (hours >= 1 && hours <= 12) {
    greeting = "1"; //"Good Morning";
  } else if (hours >= 12 && hours <= 16) {
    greeting = "2"; //"Good Afternoon";
  } else if (hours >= 16 && hours <= 19) {
    greeting = "3"; //"Good Evening";
  } else if (hours >= 19 && hours <= 24) {
    greeting = "4"; //"Good Night";
  }
  return greeting;
};

const stringToDateTime = (string_date) => {
  var s = string_date;
  var bits = s.split(/\D/);
  var mydate = new Date(bits[2], --bits[1], bits[0], bits[3], bits[4]);
  if (
    bits[2] === "0999" ||
    bits[2] === "8999" ||
    bits[2] === "1000" ||
    bits[2] === "9000"
  ) {
    mydate = "";
  }
  if (mydate.toString() === "Invalid Date") {
    return "";
  }
  return mydate;
};

const stringToDateTime1 = (string_date) => {
  var s = string_date;

  var bits = s.split(/\D/);
  var mydate = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
  if (
    bits[0] === "0999" ||
    bits[0] === "8999" ||
    bits[0] === "1000" ||
    bits[0] === "9000"
  ) {
    mydate = "";
  }
  if (mydate.toString() === "Invalid Date") {
    return "";
  }
  return mydate;
};

const stringToDate = (string_date) => {
  try {
    var parts = string_date.split("-");
    // if (parts[0] === "31") {
    //   parts[0] = "01";
    // } else {
    //   parts[0] = (parts[0] * 1) + 1;
    // }
    var mydate = new Date(parts[2] + "/" + parts[1] + "/" + parts[0]);
    // mydate = mydate.toISOString().substr(0, 10);
    if (
      parts[2] === "0999" ||
      parts[2] === "8999" ||
      parts[2] === "1000" ||
      parts[2] === "9000"
    ) {
      mydate = "";
    }
    if (mydate.toString() === "Invalid Date") {
      return "";
    }

    return mydate;
  } catch (err) {
    return string_date;
  }
};

const stringToDate1 = (string_date) => {
  try {
    var parts = string_date.split("-");
    // if (parts[2] === "31") {
    //   parts[2] = "01";
    // } else {
    //   parts[2] = (parts[2] * 1) + 1;
    // }
    var mydate = new Date(parts[0] + "/" + parts[1] + "/" + parts[2]);
    // mydate = mydate.toISOString().substr(0, 10);

    if (
      parts[0] === "0999" ||
      parts[0] === "8999" ||
      parts[0] === "1000" ||
      parts[0] === "9000"
    ) {
      mydate = "";
    }
    if (mydate.toString() === "Invalid Date") {
      return "";
    }

    return mydate;
  } catch (err) {
    return "";
  }
};

const dateToString = (string_date) => {
  try {
    var parts = string_date.split("-");
    if (parts[0] === "31") {
      parts[0] = "01";
    } else {
      parts[0] = parts[0] * 1 + 1;
    }
    var mydate = new Date(parts[2] + "/" + parts[1] + "/" + parts[0]);
    // mydate = mydate.toISOString().substr(0, 10);
    if (
      parts[2] === "0999" ||
      parts[2] === "8999" ||
      parts[2] === "1000" ||
      parts[2] === "9000"
    ) {
      mydate = "";
    }
    if (mydate.toString() === "Invalid Date") {
      return "";
    }

    return mydate;
  } catch (err) {
    return string_date;
  }
};

const dateToString1 = (string_date) => {
  try {
    var parts = string_date.split("-");
    if (parts[2] === "31") {
      parts[2] = "01";
    } else {
      parts[2] = parts[2] * 1 + 1;
    }
    var mydate = new Date(parts[0] + "/" + parts[1] + "/" + parts[2]);
    // mydate = mydate.toISOString().substr(0, 10);

    if (
      parts[0] === "0999" ||
      parts[0] === "8999" ||
      parts[0] === "1000" ||
      parts[0] === "9000"
    ) {
      mydate = "";
    }
    if (mydate.toString() === "Invalid Date") {
      return "";
    }

    return mydate;
  } catch (err) {
    return "";
  }
};

const stringToSystemDate = (string_date) => {
  try {
    var parts = string_date.split("-");
    if (parts[0] === "31") {
      parts[0] = "01";
    } else {
      parts[0] = parts[0] * 1 + 1;
    }
    var mydate = new Date(parts[2] + "/" + parts[1] + "/" + parts[0]);
    mydate = mydate.toISOString().substr(0, 10);
    if (
      parts[2] === "0999" ||
      parts[2] === "8999" ||
      parts[2] === "1000" ||
      parts[2] === "9000"
    ) {
      mydate = "";
    } else {
      mydate = moment(mydate).format("DD-MM-YYYY");
    }
    if (mydate.toString() === "Invalid Date") {
      return "";
    }

    return mydate;
  } catch (err) {
    return string_date;
  }
};

const stringToSystemDate1 = (string_date) => {
  try {
    var parts = string_date.split("-");
    if (parts[2] === "31") {
      parts[2] = "01";
    } else {
      parts[2] = parts[2] * 1 + 1;
    }
    var mydate = new Date(parts[0] + "/" + parts[1] + "/" + parts[2]);
    mydate = mydate.toISOString().substr(0, 10);

    if (
      parts[0] === "0999" ||
      parts[0] === "8999" ||
      parts[0] === "1000" ||
      parts[0] === "9000"
    ) {
      mydate = "";
    } else {
      mydate = moment(mydate).format("DD-MM-YYYY");
    }
    if (mydate.toString() === "Invalid Date") {
      return "";
    }

    return mydate;
  } catch (err) {
    return "";
  }
};

const dateToDate = (string_date) => {
  var parts = string_date.split("-");
  var day_val = parts[2];
  day_val = day_val.substring(0, 2);
  if (day_val === "31") {
    day_val = "01";
  } else {
    day_val = day_val * 1 + 1;
  }
  var mydate = new Date(parts[0] + "/" + parts[1] + "/" + day_val);
  //mydate = mydate.toISOString().substr(0, 10);
  if (
    parts[0] === "0999" ||
    parts[0] === "8999" ||
    parts[0] === "1000" ||
    parts[0] === "9000"
  ) {
    mydate = "";
  }
  if (mydate.toString() === "Invalid Date") {
    return "";
  }
  return mydate;
};

const dateToDate1 = (string_date) => {
  var parts = string_date.split("-");
  var day_val = parts[2];
  day_val = day_val.substring(0, 2);
  // if (day_val === "31") {
  //   day_val = "01";
  // } else {
  //   day_val = (day_val * 1) + 1;
  // }
  var mydate = new Date(parts[0] + "/" + parts[1] + "/" + day_val);
  //mydate = mydate.toISOString().substr(0, 10);
  if (
    parts[0] === "0999" ||
    parts[0] === "8999" ||
    parts[0] === "1000" ||
    parts[0] === "9000"
  ) {
    mydate = "";
  }
  if (mydate.toString() === "Invalid Date") {
    return "";
  }
  return mydate;
};

const numberCheck = (num) => {
  //num = num.toString();
  if (num === null || num === "null" || num === "" || num === "undefined") {
    return "";
  } else {
    var num1 = num.replace(",", "");
    num1 = num1.replace(",", "");
    num1 = num1.replace(",", "");
    num1 = num1.replace(",", "");
    num1 = num1.replace(",", "");
    num1 = num1.replace(",", "");
    num1 = num1.replace(",", "");
    num1 = num1.replace(".00", "");
    if (isNaN(num1)) {
      return "";
    } else {
      return num1;
    }
  }
};

const mobile_number1 = "";
const Authorization = "";
const confirmResult = "";
const customer_id = "";
const member_id = "";
const member_name = "";
const checkup_id = "";
const prescription_id = "";
const product_name = "";
const brand_name = "";
const bill_id = "";
const cart_list = [];
const wish_list = [];
const customer_name = "";
const cart_count = "";
const lab_cart_count = "";
const order_id = "";
const chat_token_id = "";
const room_id = "";

const doctor_name = "";
const doctor_id = "";

const item_id = "";
const category_id = "";
const sub_category_id = "";
const category_name = "";

const dl_id = "";
const collection_id = "";
const cash_id = "";
const d1 = "";
const d2 = "";
const month_id = "";
const year_id = "";
const staff_id = "";
const menu_id = "";
const username = "";
const access_type = "";
const emp_list = "";
const branch_list = "";
const address_id = "";

const staff_code = "";
const staff_code1 = "";
const staff_id1 = "";
const first_name = "";
const last_name = "";
const email_id = "";
const contact_number = "";
const image_address = "";
const company_id = "";
const company_name = "";
const company_logo = "";
const company_site = "";
const branch_id = "";
const branch_name = "";
const branch_logo = "";

const calculate_age = (dob) => {
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

const dataURLtoBlob = (dataurl) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const numberFormat = (num) => {
  if (num === null || num === "null") {
    return "\u20B9 0.00";
  } else {
    // console.log(num);
    // var num1=num.replace(",", "");
    // num1=num1.replace(",", "");
    // num1=num1.replace(",", "");
    //num1=num1.replace(",", "");
    //num1=num1.replace(",", "");
    if (isNaN(num)) {
      return "\u20B9 0.00";
    } else {
      var res = (num * 1).toFixed(2);
      var str = res.split(".");
      res =
        str[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") +
        (str[1] ? "." + str[1] : "");
      return "\u20B9 " + res;
    }
  }
};

const numberFormat1 = (num) => {
  if (num === null || num === "null") {
    return "";
  } else {
    var num1 = num.replace(",", "");
    num1 = num1.replace(",", "");
    num1 = num1.replace(",", "");
    num1 = num1.replace(",", "");
    num1 = num1.replace(",", "");
    if (isNaN(num1)) {
      return "";
    } else {
      var res = (num1 * 1).toFixed(2);
      var str = res.split(".");
      res =
        str[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") +
        (str[1] ? "." + str[1] : "");
      return res;
    }
  }
};

const numberFormat2 = (num) => {
  if (num === null || num === "null") {
    return "";
  } else {
    var num1 = num.replace(",", "");
    num1 = num1.replace(",", "");
    num1 = num1.replace(",", "");
    num1 = num1.replace(",", "");
    num1 = num1.replace(",", "");
    if (isNaN(num1)) {
      return "";
    } else {
      var res = (num1 * 1).toFixed(2);
      var str = res.split(".");
      res =
        str[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") +
        (str[1] ? "." + str[1] : "");
      res = res.replace(".00", "");
      if (res == "0") {
        res = "";
      }
      return res;
    }
  }
};

export default {
  BaseUrl,
  Authorization,
  confirmResult,
  mobile_number1,
  customer_id,
  bill_id,
  stringToDateTime,
  dl_id,
  collection_id,
  cash_id,
  numberFormat,
  numberFormat1,
  numberFormat2,
  d1,
  d2,
  year_id,
  month_id,
  staff_id,
  menu_id,
  username,
  emp_list,
  access_type,
  dataURLtoBlob,
  getWhichTime,
  branch_list,
  staff_code,
  staff_code1,
  staff_id1,
  first_name,
  last_name,
  email_id,
  contact_number,
  image_address,
  company_id,
  company_name,
  company_logo,
  company_site,
  branch_id,
  branch_name,
  branch_logo,
  client,
  getRequestToken,
  calculate_age,
  stringToDateTime1,
  stringToDate,
  member_id,
  member_name,
  prescription_id,
  dateToDate,
  dateToDate1,
  compareTime,
  item_id,
  category_id,
  sub_category_id,
  category_name,
  customer_name,
  cart_list,
  wish_list,
  address_id,
  cart_count,
  lab_cart_count,
  order_id,
  product_name,
  brand_name,
  checkup_id,
  stringToDate1,
  stringToSystemDate,
  stringToSystemDate1,
  dateToString1,
  dateToString,
  datamatch,
  doctor_name,
  doctor_id,
  chat_token_id,
  room_id,

  //
  Razorpaykey,
  GA,
  gooleLogin,
};
