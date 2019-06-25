import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import SwitchNavigator from "./navigations/SwitchNavigator";

const AppIndex = () => {
  return (
    <ThemeProvider theme={theme}>
      <SwitchNavigator />
    </ThemeProvider>
  );
};

export default AppIndex;
