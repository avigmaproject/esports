import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  TextInput as NText,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Avatar, HelperText, useTheme } from "react-native-paper";
import DropDownPicker, { ValueType } from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Block, Button, Text, TextInput, Dropdown } from "../../../components";
import { Country, IUpdateProfile } from "../models";
import { User } from "../../auth/models";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { resolveImage } from "../../../utils";
import { theme as coreTheme } from "./../../../core/theme";
import { mapCountries, mapTimezones } from "../constants";
import { updateUser } from "../services/profile";
import { setSnackbarMessage } from "../../common/actions";
import { meDetails } from "../../auth/services/auth";
import { setMeDetails } from "../../auth/actions";

DropDownPicker.setTheme("DARK");

const updateSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .matches(/^[a-zA-Z0-9\-_]{0,40}$/, "Username must be alphanumeric"),
  email: yup.string().email().required("Email is required"),
  streamURL: yup.string().url("Please enter valid stream url"),
  country: yup.string(),
  nationality: yup.string(),
  timezone: yup.string(),
  discord: yup.string(),
});

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootState) => state.authReducer.user)!;
  console.log({ user });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError: setErrorForm,
    clearErrors,
  } = useForm<IUpdateProfile>({
    resolver: yupResolver(updateSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      country: user.country,
      nationality: user.nationality,
      timezone: user.timezone,
      discord: user.discordTag,
    },
  });

  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [timezones, setTimezone] = useState<{ label: string; value: string }[]>(
    [],
  );
  const [countries, setCountry] = useState<{ label: string; value: string }[]>(
    [],
  );

  useEffect(() => {
    setCountries();
    setTimezones();
  }, []);

  const setCountries = () => {
    setCountry(mapCountries);
  };
  const setTimezones = () => {
    setTimezone(mapTimezones);
  };

  const hasError = (field: string) => {
    return errors.hasOwnProperty(field);
  };

  const handleUpdateProfile = async (data: IUpdateProfile) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const response = await updateUser({
        ...data,
        id: user.id,
      });

      const updatedUser: User = await meDetails();
      dispatch(setMeDetails(updatedUser));
      setLoading(false);

      dispatch(
        setSnackbarMessage("Profile details has been updated successfully."),
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response) {
      } else if (error.request) {
      } else {
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      nestedScrollEnabled={true}>
      <Block flex>
        <Block noflex center paddingHorizontal={20} paddingVertical={20}>
          {user.logo ? (
            <Block noflex>
              <Avatar.Image
                size={100}
                source={{
                  uri: resolveImage(user.logo),
                }}
                style={{ borderWidth: 2, borderColor: theme.colors.text }}
              />
            </Block>
          ) : null}
        </Block>
        <Block
          noflex
          paddingHorizontal={15}
          marginBottom={10}
          style={{ zIndex: 3000 }}>
          <Block noflex middle>
            <Block noflex marginBottom={10}>
              <Text color={theme.colors.text}>Playing From</Text>
            </Block>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  value={value as ValueType}
                  setValue={item => onChange(item)}
                  items={countries}
                  setItems={setCountries}
                  searchable={true}
                  zIndex={3000}
                />
              )}
              name="country"
              rules={{ required: true }}
              defaultValue=""
            />
            {errors?.username?.message ? (
              <HelperText type="error" style={styles.error}>
                {errors?.country?.message}
              </HelperText>
            ) : null}
          </Block>
        </Block>
        <Block
          noflex
          paddingHorizontal={15}
          marginBottom={10}
          style={{ zIndex: 2000 }}>
          <Block noflex middle>
            <Block noflex marginBottom={10}>
              <Text color={theme.colors.text}>Nationality</Text>
            </Block>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  value={value as ValueType}
                  setValue={item => onChange(item)}
                  items={countries}
                  setItems={setCountries}
                  searchable={true}
                  zIndex={2000}
                />
              )}
              name="nationality"
              rules={{ required: true }}
              defaultValue=""
            />
          </Block>
        </Block>
        <Block
          noflex
          paddingHorizontal={15}
          marginBottom={10}
          style={{ zIndex: 1000 }}>
          <Block noflex middle>
            <Block noflex marginBottom={10}>
              <Text color={theme.colors.text}>Timezone</Text>
            </Block>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  value={value as ValueType}
                  setValue={item => onChange(item)}
                  items={timezones}
                  setItems={setTimezones}
                  searchable={true}
                  zIndex={1000}
                />
              )}
              name="timezone"
              rules={{ required: true }}
              defaultValue=""
            />
          </Block>
        </Block>
        <Block noflex paddingHorizontal={15} marginBottom={10}>
          <Block noflex middle>
            <Block noflex marginBottom={10}>
              <Text color={theme.colors.text}>Username</Text>
            </Block>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Your username"
                  returnKeyType="next"
                  value={value}
                  onChangeText={value => onChange(value)}
                  error={hasError("username")}
                  errorText={errors?.username?.message}
                  autoCapitalize="none"
                  inputStyle={styles.textInput}
                  placeholderTextColor="#adadad"
                  containerStyle={styles.textInputContainer}
                  editable={false}
                />
              )}
              name="username"
              rules={{ required: true }}
              defaultValue=""
            />
          </Block>
        </Block>
        <Block noflex paddingHorizontal={15} marginBottom={10}>
          <Block noflex middle>
            <Block noflex marginBottom={10}>
              <Text color={theme.colors.text}>Email Address</Text>
            </Block>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Your email address"
                  returnKeyType="next"
                  value={value}
                  onChangeText={value => onChange(value)}
                  error={hasError("email")}
                  errorText={errors?.email?.message}
                  autoCapitalize="none"
                  inputStyle={styles.textInput}
                  placeholderTextColor="#adadad"
                  containerStyle={styles.textInputContainer}
                  editable={false}
                />
              )}
              name="email"
              rules={{ required: true }}
              defaultValue=""
            />
          </Block>
        </Block>
        <Block noflex paddingHorizontal={15} marginBottom={10}>
          <Block noflex middle>
            <Block noflex marginBottom={10}>
              <Text color={theme.colors.text}>Discord Tag</Text>
            </Block>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Your discord tag"
                  returnKeyType="next"
                  value={value}
                  onChangeText={value => onChange(value)}
                  error={hasError("discord")}
                  errorText={errors?.discord?.message}
                  autoCapitalize="none"
                  inputStyle={styles.textInput}
                  placeholderTextColor="#adadad"
                  containerStyle={styles.textInputContainer}
                  editable={false}
                />
              )}
              name="discord"
              rules={{ required: true }}
              defaultValue=""
            />
          </Block>
        </Block>
        <Block noflex paddingHorizontal={15} marginBottom={10}>
          <Block noflex middle>
            <Block noflex marginBottom={10}>
              <Text color={theme.colors.text}>
                Stream URL (include the https://)
              </Text>
            </Block>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Your Stream URL"
                  returnKeyType="done"
                  value={value}
                  onChangeText={value => onChange(value)}
                  error={hasError("streamUrl")}
                  errorText={errors?.streamUrl?.message}
                  autoCapitalize="none"
                  inputStyle={styles.textInput}
                  placeholderTextColor="#adadad"
                  containerStyle={styles.textInputContainer}
                />
              )}
              name="streamUrl"
              rules={{ required: true }}
              defaultValue=""
            />
          </Block>
        </Block>
      </Block>
      <Block noflex paddingHorizontal={15}>
        <Button
          mode="contained"
          onPress={handleSubmit(handleUpdateProfile)}
          loading={loading}
          disabled={loading}>
          Update Profile
        </Button>
      </Block>
    </KeyboardAwareScrollView>
  );
};

export default UpdateProfile;
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
  dropdown: {
    borderRadius: 0,
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderBottomColor: "#ffffff",
    paddingHorizontal: 0,
  },
  error: {
    fontSize: 14,
    color: coreTheme.colors.error,
    paddingHorizontal: 0,
    paddingTop: 4,
  },
});
