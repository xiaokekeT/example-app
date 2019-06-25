import { createAppContainer, createStackNavigator } from "react-navigation";
import SettingList from "../screens/setting/SettingList";
import SettingPassword from "../screens/setting/SettingPassword";
import theme from "../theme";

const SettingsStack = createStackNavigator(
  {
    settingList: {
      screen: SettingList,
      navigationOptions: () => {
        return {
          header: () => null
        };
      }
    },
    settingPassword: {
      screen: SettingPassword,
      navigationOptions: () => {
        return {
          title: "123"
        };
      }
    }
  },
  {
    initialRouteName: "settingList",
    defaultNavigationOptions: options => {
      return {
        ...options,
        headerStyle: {
          backgroundColor: theme.colors.main,
          borderBottomWidth: 0
        },

        headerTintColor: "#fff",
        headerTitleStyle: {
          color: theme.colors.black
        }
      };
    }
  }
);

export default createAppContainer(SettingsStack);
