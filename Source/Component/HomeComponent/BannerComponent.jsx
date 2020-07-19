import React, { Component } from "react";
import { Text, StyleSheet, Dimensions, Image } from "react-native";
import { View } from "react-native-animatable";
import { Icon } from "native-base";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const WIDTH = Dimensions.get("window").width;

class BannerComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../../assets/Image/BannerImages/banner1.png")}
          style={styles.BannerImageStyling}
        />
      </View>
    );
  }
}
export default BannerComponent;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    marginTop: 10,
    padding: 10,
  },
  BannerImageStyling: {
    alignSelf: "center",
    resizeMode: "cover",
    borderWidth: 8,
    borderColor: "#aaa",
  },
});
