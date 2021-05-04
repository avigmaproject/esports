import React, { useEffect } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Block } from "../../../components";
import { RootState } from "../../../store";
import { AuthState } from "../../auth";
import { setAppReady, setSnackbarMessage } from "../actions";
import { User } from "../../auth/models";
import { meDetails } from "../../auth/services/auth";
import { clearStore, loginUser, setMeDetails } from "../../auth/actions";

const SplashScreen = () => {
  const dispatch = useDispatch();
  const { token }: AuthState = useSelector(
    (state: RootState) => state.authReducer,
  );

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
            await dispatch(setAppReady());
          } else {
            // console.log(`user not found`);
            await dispatch(clearStore());
            await dispatch(setAppReady());
          }
        } else {
          // console.log(`token not found`);
          // await dispatch(clearStore());
          await dispatch(setAppReady());
        }
      } catch (error) {
        console.log(error);
        await dispatch(clearStore());
        await dispatch(setAppReady());
        dispatch(setSnackbarMessage("Invalid session. Please login again."));
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
      <Block>
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
