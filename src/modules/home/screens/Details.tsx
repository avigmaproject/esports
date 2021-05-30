import React from "react";
import { Button } from "react-native-paper";
import { Block, Text } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../store";
import { User } from "../../auth/models";
import { getCurrentUser, logoutUser } from "../../auth/store";

const Details = () => {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(getCurrentUser)!;

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Block safe flex>
      <Block center middle>
        <Block noflex marginVertical={20}>
          <Text>Welcome, {user.username} to detail page</Text>
        </Block>
        <Button mode="contained" onPress={handleLogout}>
          Logout
        </Button>
      </Block>
    </Block>
  );
};

export default Details;
