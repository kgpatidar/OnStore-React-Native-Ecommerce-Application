import React, { Component } from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerButton,
  DrawerItems,
} from "react-navigation-drawer";

import CustomeDrawer from "../Component/DrawerComponent/CustomDrawer";

import SplashScreen from "./SplashScreen";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import RegisterScreen from "./RegisterScreen";
import ProductScreen from "./ProductScreen";
import ProfileScreen from "./ProfileScreen";
import ProductInfoScreen from "./ProductInfoScreen";
import BuyScreen from "./BuyScreen";
import LikedPhoneScreen from "./LikedPhoneScreen";

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Favorite: {
      screen: LikedPhoneScreen,
    },
  },
  {
    drawerBackgroundColor: "#fff",
    overlayColor: "#fff",
    contentComponent: CustomeDrawer,
    contentOptions: {
      activeTintColor: "#e91e63",
    },
    navigationOptions: ({ navigation }) => ({}),
  }
);

const AppNavigator = createSwitchNavigator({
  Splash: {
    screen: SplashScreen,
  },
  Auth: {
    screen: AuthScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  DrawerNavigator,
  Product: {
    screen: ProductScreen,
  },
  ProdutInfo: {
    screen: ProductInfoScreen,
  },
  Buy: {
    screen: BuyScreen,
  },
});

const Navigation = createAppContainer(AppNavigator);

export default class Navigator extends Component {
  render() {
    return <Navigation />;
  }
}
