import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-navigation";
import theme from "../theme";
import styled from "styled-components/native";
import QRCodeBackground from "../../assets/QR_background.svg";
import { Avatar } from "./AppIndex";

const QRCodeTitle = styled.Text`
  font-size: 20px;
  color: #493b32;
  line-height: 28px;
  text-align: center;
  margin-top: 6px;
`;

const Wrap = styled.View`
  align-items: center;
  position: relative;
  margin-top: 43px;
`;

const QRContentWrap = styled.View`
  position: absolute;
  top: 14px;
  width: 290px;
  height: 385px;
  border-radius: 5px;
`;

export class QRCode extends Component {
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: theme.colors.main, flex: 1 }}>
        <QRCodeTitle> 入退室用 QR コード </QRCodeTitle>
        <Wrap
          style={{
            elevation: 0,
            borderTopWidth: 0,
            shadowColor: "#000000",
            shadowOffset: { height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3
          }}
        >
          <QRCodeBackground width={311} height={415} />
          <QRContentWrap>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                marginLeft: 30
              }}
            >
              <Avatar />
              <Text style={{ marginLeft: 16 }}>栗丸 風間</Text>
            </View>

            <Image
              source={require("../../assets/QRcode.png")}
              style={{
                width: 247,
                height: 247,
                marginTop: 55,
                marginLeft: 22
              }}
            />
          </QRContentWrap>
        </Wrap>
      </SafeAreaView>
    );
  }
}

export default QRCode;
