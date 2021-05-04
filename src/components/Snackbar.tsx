import React from "react";
import { Portal, Snackbar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { clearSnackbarMessage } from "../modules/common/actions";
import { RootState } from "../store";

const PaperSnackbar = () => {
  const dispatch = useDispatch();
  const snackbarVisible = useSelector(
    (state: RootState) => state.commonReducer.snackbarVisible,
  );
  const snackbarMsg = useSelector(
    (state: RootState) => state.commonReducer.snackbarMsg,
  );

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
