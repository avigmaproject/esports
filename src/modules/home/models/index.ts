import { StackNavigationProp } from "@react-navigation/stack";

export type StackParamList = {
  Home: undefined;
  DetailPage: undefined;
};

export interface HomeState {}

export type HomeStackNavigationProp = StackNavigationProp<StackParamList>;
