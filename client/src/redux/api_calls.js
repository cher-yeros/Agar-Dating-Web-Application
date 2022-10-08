import api from "../utils/api_call";
import { loginSuccess } from "./authSlice";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";

export const loginUser = async (user, dispatch, navigate) => {
  api.post("/login", user).then(({ data }) => {
    if (data.error) {
      alert(data.error);
    } else {
      dispatch(loginSuccess(data.user));

      toast("Just test", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      const decoded = jwtDecode(data.user.token).auth;
      console.log(decoded);
      if (decoded.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/nearby");
      }

      //console.log(decoded);
    }
  });
};
