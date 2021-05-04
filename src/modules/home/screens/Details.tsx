import React from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Block, Text } from "../../../components";
import { RootState } from "../../../store";
import { AuthState } from "../../auth";
import { logoutUser } from "../../auth/actions";

const Details = () => {
  const dispatch = useDispatch();
  const authState: AuthState = useSelector(
    (state: RootState) => state.authReducer,
  );

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Block safe flex>
      <Block center middle>
        <Block noflex marginVertical={20}>
          <Text>Welcome, {authState.user?.username} to detail page</Text>
        </Block>
        <Button mode="contained" onPress={handleLogout}>
          Logout
        </Button>
      </Block>
    </Block>
  );
};

export default Details;
