import React, { useEffect } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import { Block } from "../../../components";
import { User } from "../../auth/models";
import { meDetails } from "../../auth/services/auth";
import {
  clearStore,
  loginUser,
  setMeDetails,
  getToken,
} from "../../auth/store";

import { useAppDispatch, useAppSelector } from "../../../store";
import { setAppReady, setSnackbarMessage } from "../store";
import { useToast } from "react-native-paper-toast";

const SplashScreen = () => {
  const dispatch = useAppDispatch();
  const toaster = useToast();
  const token: string | null = useAppSelector(getToken);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const checkUser = async () => {
      try {
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const user: User = await meDetails(source.token);

          if (user) {
            dispatch(loginUser(token));
            dispatch(setMeDetails(user));
            dispatch(setAppReady());
          } else {
            // console.log(`user not found`);
            dispatch(clearStore());
            dispatch(setAppReady());
          }
        } else {
          // console.log(`token not found`);
          await dispatch(clearStore());
          dispatch(setAppReady());
        }
      } catch (error) {
        // console.log(error);
        dispatch(clearStore());
        dispatch(setAppReady());
        toaster.show({
          message: "Invalid session. Please login again.",
          type: "info",
        });
      }
    };
    checkUser();

    return () => {
      // console.log('unmounting');
      source.cancel();
    };
  }, [token]);

  return (
    <ImageBackground
      source={require("../../../assets/images/background-image.png")}
      style={styles.container}>
      <Block center middle>
        <ActivityIndicator size={30} color={"#ffffff"} />
      </Block>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
