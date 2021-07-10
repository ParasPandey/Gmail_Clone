import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import MainBox from "./Components/MainBox/MainBox";
import MyMail from "./Components/MainBox/MyMail/MyMail";
import "./App.css";

import {
  login,
  logout,
  initializeSendMail,
  selectuser,
  setOpenMail,
  selectDarkMode,
  initializeFavMail,
  setDarkMode,
  setMailObj,
} from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "./Components/SignIn/SignIn";
import { auth, db } from "./firebase";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectuser);
  const darkMode = useSelector(selectDarkMode);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        var count = 0;
        db.collection("users").onSnapshot(async (snapshot) => {
          snapshot.docs.map((doc) => {
            if (doc?.data()?.uid === userAuth?.uid) {
              count += 1;
            }
          });
          if (count === 0) {
            count += 1;
            db.collection("users").add({
              uid: userAuth.uid,
              email: userAuth.email,
              name: userAuth.displayName,
              photo: userAuth.photoURL,
              sendMails: [],
              receiveMails: [],
              favMails: [],
            });
          }
        });
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
            name: userAuth.displayName,
            photo: userAuth.photoURL,
          })
        );
      } else {
        // Logged Out
        dispatch(logout());
      }
      return unsubscribe;
    });
  }, [dispatch]);
  useEffect(() => {
    const docRef = db.collection("users");
    const unsubscribe = docRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var id = doc.id;
        var data = doc.data();
        if (data?.uid === auth.currentUser?.uid) {
          docRef
            .doc(id)
            .get()
            .then((doc) => {
              dispatch(
                initializeSendMail({
                  items: data.sendMails,
                })
              );
              dispatch(
                setOpenMail({
                  item: data.openMail,
                })
              );
              dispatch(
                initializeFavMail({
                  items: data.favMails,
                })
              );
              dispatch(
                setDarkMode({
                  darkMode: data.darkMode,
                })
              );
              dispatch(
                setMailObj({
                  mailObj: {
                    mailTo: "",
                    subject: "",
                    body: "",
                  },
                })
              );
            });
        }
      });
    });
    return unsubscribe;
  }, [dispatch, user]);
  return (
    <div className={`app ${darkMode && "darkMode_on"}`}>
      {!user ? (
        <SignIn />
      ) : (
        <>
          <Navbar />
          <div className="home">
            <Sidebar />
            <Router>
              <Switch>
                <Route exact path="/">
                  <MainBox />
                </Route>
                <Route exact path="/mail">
                  <MyMail />
                </Route>
              </Switch>
            </Router>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
