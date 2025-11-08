import { setLoading } from "../redux/slices/LoaderSlices";
import DisplayToast from "../utils/DisplayToast";
import errorMessages from "../utils/ErrorMessages";
import { getProductsAPI } from "./CallApi";

export const getProducts = (dispatch: any) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    getProductsAPI()
      .then((res) => {
        console.log("ApiCall.Js getProducts(): res data: => ", res);
        resolve(res);
        dispatch(setLoading(false));
        if (res?.status == "400") {
          DisplayToast.showError(errorMessages.errorSomethingWrong);
        } else {
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        reject(err);
        console.log("APICall.Js getProducts(): err:", err);
        DisplayToast.showError(err?.error_description);
      });
  });
};
