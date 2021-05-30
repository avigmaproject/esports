import React from "react";
import { Portal, Snackbar } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import {
  isSnackVisible,
  getSnackMsg,
  clearSnackbarMessage,
} from "../modules/common/store";

const PaperSnackbar = () => {
  const dispatch = useAppDispatch();
  const snackbarVisible = useAppSelector(isSnackVisible);
  const snackbarMsg = useAppSelector(getSnackMsg);

  const onDismissSnackBar = () => dispatch(clearSnackbarMessage());

  return (
    <Portal>
      <Snackbar visible={snackbarVisible} onDismiss={onDismissSnackBar}>
        {snackbarMsg}
      </Snackbar>
    </Portal>
  );
};
export default PaperSnackbar;
