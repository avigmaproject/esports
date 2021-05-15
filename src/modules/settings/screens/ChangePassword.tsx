import React, { useState } from "react";
import { Keyboard, Platform, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconButton, useTheme } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";

import { Block, Button, Text, TextInput } from "../../../components";
import { IChangePassword, IPatchJson } from "../models";
import { User } from "../../auth/models";
import { RootState } from "../../../store";
import { theme as coreTheme } from "./../../../core/theme";
import { updateUser } from "../services/profile";
import { setSnackbarMessage } from "../../common/actions";

const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  password: yup.string().required("New password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootState) => state.authReducer.user)!;
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError: setErrorForm,
  } = useForm<IChangePassword>({
    resolver: yupResolver(changePasswordSchema),
  });

  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [oldPasswordView, setOldPasswordView] = useState(false);
  const [passwordView, setPasswordView] = useState(false);
  const [confirmPasswordView, setConfirmPasswordView] = useState(false);
  const hasError = (field: string) => {
    return errors.hasOwnProperty(field);
  };

  const handleChangePassword = async (data: IChangePassword) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      delete data.confirmPassword;

      const dataKeys = Object.keys(data);
      const patchReq: IPatchJson[] = dataKeys.map(key => ({
        op: "replace",
        path: `/${key}`,
        value: data[key],
      }));

      const response = await updateUser(patchReq, user.id!);

      setLoading(false);
      reset({
        oldPassword: "",
        password: "",
        confirmPassword: "",
      });
      dispatch(setSnackbarMessage("Password has been changed successfully."));
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      dispatch(
        setSnackbarMessage("Unable to update password. Please try again."),
      );
      if (error.response) {
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      nestedScrollEnabled={true}>
      <Block noflex marginTop={20}>
        <Block noflex paddingHorizontal={15} marginBottom={10}>
          <Block noflex middle>
            <Block noflex marginBottom={10}>
              <Text color={theme.colors.text}>Old Password</Text>
            </Block>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Old Password"
                  returnKeyType="next"
                  value={value}
                  onChangeText={value => onChange(value)}
                  error={hasError("oldPassword")}
                  errorText={errors?.oldPassword?.message}
                  autoCapitalize="none"
                  inputStyle={styles.textInput}
                  placeholderTextColor="#adadad"
                  containerStyle={styles.textInputContainer}
                  secureTextEntry={!oldPasswordView}
                  right={
                    <IconButton
                      icon={props => (
                        <Icon
                          name={!oldPasswordView ? "eye-off" : "eye"}
                          {...props}
                        />
                      )}
                      onPress={() => setOldPasswordView(!oldPasswordView)}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 100,
                      }}
                    />
                  }
                />
              )}
              name="oldPassword"
              rules={{ required: true }}
              defaultValue=""
            />
          </Block>
        </Block>
        <Block noflex paddingHorizontal={15} marginBottom={10}>
          <Block noflex middle>
            <Block noflex marginBottom={10}>
              <Text color={theme.colors.text}>New Password</Text>
            </Block>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="New Password"
                  returnKeyType="next"
                  value={value}
                  onChangeText={value => onChange(value)}
                  error={hasError("password")}
                  errorText={errors?.password?.message}
                  autoCapitalize="none"
                  inputStyle={styles.textInput}
                  placeholderTextColor="#adadad"
                  containerStyle={styles.textInputContainer}
                  secureTextEntry={!passwordView}
                  right={
                    <IconButton
                      icon={props => (
                        <Icon
                          name={!passwordView ? "eye-off" : "eye"}
                          {...props}
                        />
                      )}
                      onPress={() => setPasswordView(!passwordView)}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 100,
                      }}
                    />
                  }
                />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />
          </Block>
        </Block>
        <Block noflex paddingHorizontal={15} marginBottom={10}>
          <Block noflex middle>
            <Block noflex marginBottom={10}>
              <Text color={theme.colors.text}>Confirm Password</Text>
            </Block>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Confirm Password"
                  returnKeyType="next"
                  value={value}
                  onChangeText={value => onChange(value)}
                  error={hasError("confirmPassword")}
                  errorText={errors?.confirmPassword?.message}
                  autoCapitalize="none"
                  inputStyle={styles.textInput}
                  placeholderTextColor="#adadad"
                  containerStyle={styles.textInputContainer}
                  secureTextEntry={!confirmPasswordView}
                  right={
                    <IconButton
                      icon={props => (
                        <Icon
                          name={!confirmPasswordView ? "eye-off" : "eye"}
                          {...props}
                        />
                      )}
                      onPress={() =>
                        setConfirmPasswordView(!confirmPasswordView)
                      }
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 100,
                      }}
                    />
                  }
                />
              )}
              name="confirmPassword"
              rules={{ required: true }}
              defaultValue=""
            />
          </Block>
        </Block>
      </Block>
      <Block noflex paddingHorizontal={15}>
        <Button
          mode="contained"
          onPress={handleSubmit(handleChangePassword)}
          loading={loading}
          disabled={loading}>
          Change Password
        </Button>
      </Block>
    </KeyboardAwareScrollView>
  );
};

export default ChangePassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: 40,
  },
  textInput: {
    zIndex: 100,
    backgroundColor: coreTheme.colors.background,
  },
  textInputContainer: {
    marginVertical: 0,
    marginBottom: 10,
  },
});
