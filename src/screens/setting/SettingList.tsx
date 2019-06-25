import React, { Component } from "react";
import {
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from "react-native";
import {
  SafeAreaView,
  NavigationScreenProp,
  NavigationParams,
  NavigationState
} from "react-navigation";
import { Avatar } from "../AppIndex";
import styled, { ReactNativeStyledInterface } from "styled-components/native";
import theme from "../../theme";

const list1 = [
  {
    icon: require("../../../assets/password.svg"),
    text: "パスワードの変更"
  },
  {
    icon: require("../../../assets/mail.svg"),
    text: "メール設定"
  },
  {
    icon: require("../../../assets/pay.svg"),
    text: "クレカ支払い設定"
  }
];

const list2 = [
  {
    icon: require("../../../assets/sns.svg"),
    text: "SNS アウント"
  },
  {
    icon: require("../../../assets/family.svg"),
    text: "兄弟姉妹アカウント"
  }
];

const list3 = [
  {
    icon: require("../../../assets/contact.svg"),
    text: "お問い合わせ先一覧"
  }
];

const LogoutButton = styled.TouchableOpacity`
  background: #ffffff;
  height: 56px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-top: 16px;
`;

const TopView = styled.View`
  height: 240px;
  background: ${theme.colors.main};
  align-items: center;
  justify-content: center;
`;

const ListView = styled.View`
  padding: 0 16px;
  background: #fff;
`;

import ListArrowIcon from "../../../assets/arrow.svg";

const BuildList = (list: any[], style?: StyleProp<View>) => {
  return (
    <View
      style={[
        {
          width: "100%",
          marginBottom: 16,
          elevation: 0,
          shadowColor: "#000000",
          shadowOffset: { height: 2, width: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          borderRadius: 5,
          backgroundColor: "#fff"
        },
        style
      ]}
    >
      {list.map((item, index) => {
        const Icon = item.icon.default;
        let styles = [];

        if (index === 0) {
          styles.push({
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
          });
        }

        // last
        if (index === list.length - 1) {
          styles.push({
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5
          });
        }

        return [
          <TouchableOpacity
            key={index}
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: 50,
                backgroundColor: "#fff",
                paddingHorizontal: 16
              },
              styles
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1
              }}
            >
              <Icon width={18} />
              <Text style={{ marginLeft: 10, color: "#493B32" }}>
                {item.text}
              </Text>
            </View>
            {/* TODO: icon display error  */}
            <ListArrowIcon />
          </TouchableOpacity>,
          list.length > 0 && index !== list.length - 1 && (
            <View
              key={2}
              style={{
                height: 1,
                backgroundColor: "#D0D0D5",
                opacity: 0.5,
                width: "90%",
                alignSelf: "center"
              }}
            />
          )
        ];
      })}
    </View>
  );
};

const Name = styled.Text`
  font-size: 20px;
  color: #493b32;
  text-align: center;
  line-height: 28px;
  margin-top: 14px;
`;

const Id = styled.Text`
  font-size: 14px;
  color: #493b32;
  text-align: center;
  line-height: 20px;
  margin-top: 1px;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export class SettingList extends Component<IProps> {
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: theme.colors.main }}>
        <TopView>
          <Avatar size="L" />
          <Name>栗丸 風間</Name>
          <Id>ID: 1234</Id>
        </TopView>
        <ListView>
          {BuildList(list1, {
            marginTop: -20
          })}
          {BuildList(list2)}
          {BuildList(list3)}

          <LogoutButton
            activeOpacity={0.8}
            style={{
              elevation: 0,
              shadowColor: "#000000",
              shadowOffset: { height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3
            }}
            onPress={() => {
              Alert.alert("ログアウト?", "", [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                {
                  text: "OK",
                  onPress: () => this.props.navigation.navigate("Auth")
                }
              ]);
            }}
          >
            <Text style={{ color: "#E9754E", fontSize: 16 }}>ログアウト</Text>
          </LogoutButton>
        </ListView>
      </SafeAreaView>
    );
  }
}

export default SettingList;
