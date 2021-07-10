import React from "react";
import logo from "./../../images/signUp_logo.png";
import Button from "@material-ui/core/Button";
import "./SignIn.css";
import { login } from "./../../redux/userSlice";
import { useDispatch } from "react-redux";
import { auth, provider } from "./../../firebase";

const SignIn = () => {
  const dispatch = useDispatch();
  //   const user = useSelector(selectuser);

  const signIn = async () => {
    try {
      const result = await auth.signInWithPopup(provider);
      // const token = result.credential.accessToken;
      const user = result.user;
      // console.log(result);
      // console.log(token);
      // console.log(user);
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert(error.message);
    }
  };
  return (
    <div className="signin">
      <img src={logo} alt="logo" />
      <Button variant="contained" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
};

export default SignIn;
