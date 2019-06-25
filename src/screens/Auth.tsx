import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent
} from "react-native";
import {
  SafeAreaView,
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import styled from "styled-components/native";
import theme from "../theme";
// import Input from "../components/Input";

export const LoginName = styled.Text`
  font-size: ${theme.fontSize.h1};
  color: ${theme.colors.black};
  margin-top: 81px;
  text-align: center;
`;

interface IButtonProps {
  radius?: number;
}

interface IInputProps {
  radius?: number;
}

const Input = styled.TextInput<IInputProps>`
  height: 48;
  background-color: #fff;
  color: #dfdfdf;
  font-size: 20px;
  border-radius: ${props => props.radius || 24};
  border: 1px solid #dfdfdf;
  margin-bottom: 20px;
  padding: 0 32px;
`;

const Button = styled.TouchableOpacity<IButtonProps>`
  height: 48;
  background-color: ${props => props.theme.colors.main};
  color: ${theme.colors.black};
  justify-content: center;
  align-items: center;
  border-radius: ${props => props.radius || 24};
`;

const FormWrap = styled.View`
  margin-top: 56px;
  padding: 0 32px;
`;

interface ITextLink {
  text?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const TextLink = ({ text, onPress }: ITextLink) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginHorizontal: 3 }}>
      <Text style={{ zIndex: 1 }}>{text}</Text>
      <View
        style={{
          width: "100%",
          height: 3,
          borderRadius: 2,
          backgroundColor: theme.colors.main,
          opacity: 0.85,
          position: "absolute",
          bottom: 0
        }}
      />
    </TouchableOpacity>
  );
};

const ForgatPasswordWrap = styled.View`
  margin-top: 32;
  justify-content: center;
  flex-direction: row;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

/**
 * TODO: 缺少动画
 */
export class AuthScreen extends Component<IProps> {
  render() {
    return (
      <SafeAreaView>
        <LoginName>登録</LoginName>
        <FormWrap>
          <Input placeholder="教室番号" />
          <Input placeholder="生徒番号" />
          <Input placeholder="パスワード" />

          <Button
            onPress={() => {
              this.props.navigation.navigate("App");
            }}
            style={{ marginTop: 36 }}
          >
            <Text>ログイン</Text>
          </Button>

          <ForgatPasswordWrap>
            <Text style={{ fontSize: 14, color: theme.colors.black }}>
              パスワードを忘れた方は
            </Text>
            <TextLink text="こちら" />
          </ForgatPasswordWrap>
        </FormWrap>
      </SafeAreaView>
    );
  }
}

export default AuthScreen;
