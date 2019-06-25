import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";

export default class Input extends Component {
  render() {
    return <TextInput {...this.props} />;
  }
}
