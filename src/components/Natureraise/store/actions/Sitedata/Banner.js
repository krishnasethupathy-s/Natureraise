import Config from "../../../../../Config";

export const BANNER_DATA = "BANNER_DATA";



export const fetchBanners = () => {
  return async (dispatch) => {
    const Authorization = Config.getRequestToken();
    const banner_type = "DashBoard";
    let response = await fetch(Config.BaseUrl + "GetBanners/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: JSON.stringify({ Authorization, banner_type }),
    });
    let responseJsonData = await response.json();
    var str = responseJsonData[0]["banner_images"];
    var temp = str.split(",");
    var imagesArray = [];
    for (var i = 0; i < temp.length; i++) {
      if (temp[i] === "") {
      } else {
        imagesArray.push(temp[i]);
      }
    }
    dispatch({ type: "BANNER_DATA", banner_list: imagesArray });
    return responseJsonData;
  };
};
