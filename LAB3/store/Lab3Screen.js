import React, { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { MyContextControllerProvider } from "./Index";
import Router from "../routers/Router";

const Lab3Screen = () => {
  const USERS = firestore().collection("USERS");

  const admin = {
    fullName: "Admin",
    email: "vanhuudhp@gmail.com",
    password: "123456",
    phone: "0913117132",
    address: "Bình Dương",
    role: "admin",
  };

  useEffect(() => {
    USERS.doc(admin.email).onSnapshot((u) => {
      if (!u.exists) {
        auth()
          .createUserWithEmailAndPassword(admin.email, admin.password)
          .then(() => {
            USERS.doc(admin.email).set(admin);
            console.log("Add new account admin");
          });
      }
    });
  }, []);

  return (
    <MyContextControllerProvider>
      <Router />
    </MyContextControllerProvider>
  );
};

export default Lab3Screen;