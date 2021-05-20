import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput as NText,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ActivityIndicator,
  Avatar,
  HelperText,
  IconButton,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import DropDownPicker, { ValueType } from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import {
  launchCamera,
  launchImageLibrary,
  Callback,
  ImagePickerResponse,
} from "react-native-image-picker";

import { Block, Button, Text, TextInput, Dropdown } from "../../../components";
import { IPatchJson, IUpdateProfile } from "../models";
import { User } from "../../auth/models";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { resolveImage } from "../../../utils";
import { theme as coreTheme } from "./../../../core/theme";
import { indexedCountries, mapCountries, mapTimezones } from "../constants";
import { updateLogo, updateUser } from "../services/profile";
import { setSnackbarMessage } from "../../common/actions";
import { meDetails } from "../../auth/services/auth";
import { logoutUser, setMeDetails } from "../../auth/actions";
import { SafeAreaView } from "react-native-safe-area-context";

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
  // discord: yup.string(),
});

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootState) => state.authReducer.user)!;
  const token: string = useSelector(
    (state: RootState) => state.authReducer.token,
  )!;

  const {
    control,
    formState: { errors, dirtyFields },
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
      // discord: user.discordTag,
    },
  });

  const theme = useTheme();
  const profilePicRef = useRef<ActionSheet>(null);
  const [loading, setLoading] = useState(false);
  const [hasUsernameChanged, setHasusernameChanged] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [timezones, setTimezone] = useState<{ label: string; value: string }[]>(
    [],
  );
  const [countries, setCountry] = useState<{ label: string; value: string }[]>(
    [],
  );

  console.log({ dirtyFields });

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

  const submitUpdateForm = async (
    data: IUpdateProfile,
    logout: boolean = false,
  ) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const dataKeys = Object.keys(data);
      const patchReq: IPatchJson[] = dataKeys.map(key => ({
        op: "replace",
        path: `/${key}`,
        value: data[key],
      }));

      const response = await updateUser(patchReq, user.id!);
      dispatch(
        setSnackbarMessage("Profile details has been updated successfully."),
      );
      if (logout) {
        dispatch(logoutUser());
      } else {
        await updateMeDetails();
        setLoading(false);
      }
    } catch (error) {
      dispatch(setSnackbarMessage("Unable to update profile details."));
      setLoading(false);
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
      } else {
      }
    }
  };

  const handleUpdateProfile = async (data: IUpdateProfile) => {
    const { username } = dirtyFields;
    if (username) {
      Alert.alert(
        "Alert",
        "Username has been changed. You will be logged out of the application. Are you sure you want to continue?",
        [
          {
            text: "Continue",
            onPress: async () => await submitUpdateForm(data, true),
          },
          { text: "Cancel" },
        ],
        { cancelable: false },
      );
    } else {
      await submitUpdateForm(data);
    }
  };

  const updateMeDetails = async () => {
    try {
      const updatedUser: User = await meDetails();
      dispatch(setMeDetails(updatedUser));
    } catch (error) {}
  };

  const createFormData = (photo: ImagePickerResponse) => {
    const data = new FormData();
    if (photo.uri) {
      data.append("image", {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === "android"
            ? photo.uri
            : photo.uri.replace("file://", ""),
      });
    }

    return data;
  };

  const handleUploadLogo = async (image: ImagePickerResponse) => {
    setProfileLoading(true);
    try {
      const formData = createFormData(image);
      const response = await updateLogo(formData, token);
      await updateMeDetails();
      setProfileLoading(false);
      dispatch(setSnackbarMessage("Logo has been updated successfully."));
    } catch (error) {
      setProfileLoading(false);
      dispatch(setSnackbarMessage("Unable to upload logo."));
      console.log(error.response);
    }
  };

  const openCamera = () => {
    try {
      launchCamera(
        {
          mediaType: "photo",
          cameraType: "front",
          maxHeight: 1024,
          maxWidth: 1024,
        },
        (response: ImagePickerResponse) => {
          handleUploadLogo(response);
        },
      );
    } catch (error) {}
  };

  const openGallery = () => {
    try {
      launchImageLibrary(
        {
          mediaType: "photo",
          maxHeight: 1024,
          maxWidth: 1024,
        },
        (response: ImagePickerResponse) => {
          handleUploadLogo(response);
        },
      );
    } catch (error) {}
  };

  const renderActionSheet = () => {
    return (
      <ActionSheet
        ref={profilePicRef}
        options={["Open Camera", "Choose Photo", "Cancel"]}
        cancelButtonIndex={2}
        onPress={index => {
          switch (index) {
            case 0: {
              openCamera();
              break;
            }
            case 1: {
              openGallery();
              break;
            }
          }
        }}
      />
    );
  };

  const renderLogoLoader = () => {
    if (!profileLoading) return null;
    return (
      <Block
        noflex
        style={{
          position: "absolute",
          top: "0%",
          left: "0%",
          backgroundColor: theme.colors.backdrop,
          width: 100,
          height: 100,
          borderRadius: 100,
        }}>
        <Block center middle>
          <ActivityIndicator size={"small"} />
        </Block>
      </Block>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        nestedScrollEnabled={true}>
        <Block flex>
          <Block noflex center paddingHorizontal={20} paddingVertical={20}>
            {user.logo ? (
              <Block noflex>
                <Block noflex>
                  <Avatar.Image
                    size={100}
                    source={{
                      uri: resolveImage(user.logo),
                    }}
                  />
                  <IconButton
                    icon="pencil"
                    size={25}
                    onPress={() => profilePicRef.current?.show()}
                    style={{
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                      borderRadius: 50,
                      backgroundColor: theme.colors.backdrop,
                    }}
                  />
                </Block>
                {renderLogoLoader()}
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
                render={({ field: { onChange, value } }) => {
                  let pl;
                  if (value) {
                    pl = indexedCountries[value];
                  }
                  return (
                    <Dropdown
                      value={value as ValueType}
                      setValue={item => onChange(item)}
                      items={countries}
                      setItems={setCountries}
                      searchable={true}
                      zIndex={3000}
                      placeholder={pl}
                      listMode={Platform.OS === "ios" ? "FLATLIST" : "MODAL"}
                    />
                  );
                }}
                name="country"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors?.country?.message ? (
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
                render={({ field: { onChange, value } }) => {
                  let pl;
                  if (value) {
                    pl = indexedCountries[value];
                  }
                  return (
                    <Dropdown
                      value={value as ValueType}
                      setValue={item => onChange(item)}
                      items={countries}
                      setItems={setCountries}
                      searchable={true}
                      zIndex={2000}
                      placeholder={pl}
                      listMode={Platform.OS === "ios" ? "FLATLIST" : "MODAL"}
                    />
                  );
                }}
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
                render={({ field: { onChange, value } }) => {
                  let pl;
                  if (value) {
                    pl = value;
                  }
                  return (
                    <Dropdown
                      value={value as ValueType}
                      setValue={item => onChange(item)}
                      items={timezones}
                      setItems={setTimezones}
                      searchable={true}
                      zIndex={1000}
                      placeholder={pl}
                      listMode={Platform.OS === "ios" ? "FLATLIST" : "MODAL"}
                    />
                  );
                }}
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
                render={({
                  field: { onChange, value },
                  fieldState: { isDirty },
                }) => {
                  return (
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
                    />
                  );
                }}
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
          {/* <Block noflex paddingHorizontal={15} marginBottom={10}>
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
        </Block> */}
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
                    error={hasError("streamURL")}
                    errorText={errors?.streamURL?.message}
                    autoCapitalize="none"
                    inputStyle={styles.textInput}
                    placeholderTextColor="#adadad"
                    containerStyle={styles.textInputContainer}
                  />
                )}
                name="streamURL"
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
        {renderActionSheet()}
      </KeyboardAwareScrollView>
    </SafeAreaView>
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
