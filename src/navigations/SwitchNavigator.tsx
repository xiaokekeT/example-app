import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthScreen from "../screens/Auth";
import RootNavigator from "./RootNavigator";
import AuthLoadingScreen from "../screens/AuthLoading";

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: RootNavigator,
    Auth: AuthScreen
  },
  {
    initialRouteName: "Auth"
  }
);

export default createAppContainer(SwitchNavigator);
