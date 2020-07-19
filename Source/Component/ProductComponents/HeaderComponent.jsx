import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";

class HeaderComponent extends Component {
  render() {
    return (
      <View style={{ height: 40 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={this.props.BackToHomeCallBack}>
            <MaterialIcons
              name="arrow-back"
              style={{ fontSize: 27, margin: 4 }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, alignSelf: "center", marginLeft: 20 }}>
            {this.props.searchCategory}
          </Text>
        </View>
      </View>
    );
  }
}

export default HeaderComponent;
