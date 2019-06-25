import React from "react";
import {
  BottomTabBar,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import HomeScreen from "../screens/AppIndex";
import QRCodeScreen from "../screens/QRCode";
import theme from "../theme";
import SettingNavigator from "./SettingNavigator";

const Icons = [
  [require("../../assets/home_def.svg"), require("../../assets/home_sel.svg")],
  [require("../../assets/QR_def.svg"), require("../../assets/QR_sel.svg")],
  [
    require("../../assets/setting_def.svg"),
    require("../../assets/setting_sel.svg")
  ]
];

const buildTabBarIcon = icons => ({ focused }) => {
  const Cp = focused ? icons[1].default : icons[0].default;

  return <Cp />;
};

const TabBarComponent = props => <BottomTabBar {...props} />;

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => {
        return {
          tabBarLabel: "ホーム",
          tabBarIcon: buildTabBarIcon(Icons[0])
        };
      }
    },
    QRCode: {
      screen: QRCodeScreen,
      navigationOptions: () => {
        return {
          tabBarLabel: "QR コード",
          tabBarIcon: buildTabBarIcon(Icons[1])
        };
      }
    },
    Setting: {
      screen: SettingNavigator,
      navigationOptions: () => {
        return {
          tabBarLabel: "個人設定",
          tabBarIcon: buildTabBarIcon(Icons[2])
        };
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: theme.colors.black,
      inactiveTintColor: "#D0D0D5"
    },
    tabBarComponent: props => (
      <TabBarComponent
        {...props}
        style={{
          elevation: 2,
          borderTopWidth: 0,
          shadowColor: "#000000",
          shadowOffset: { height: 4 },
          shadowOpacity: 0.54,
          shadowRadius: 3
        }}
      />
    )
  }
);

export default createAppContainer(TabNavigator);
