import React, { Component } from "react";

import { Container, Content, View } from "native-base";
import { Image, StyleSheet, Text } from "react-native";
import * as Animatable from "react-native-animatable";

class LogoComponent extends Component {
  state = {
    indexValue: this.props.indexValue,
  };

  render() {
    return (
      <View style={[styles.container]}>
        <Animatable.View
          animation={
            this.state.indexValue === "1" ? "slideInDown" : "slideInUp"
          }
        >
          <Image
            source={require("../../assets/Image/brandLogo.png")}
            style={styles.ImageStyle}
          />
        </Animatable.View>
        {this.TextRendering()}
      </View>
    );
  }

  TextRendering = () => {
    if (this.state.indexValue === "2") {
      return;
    }
    return (
      <Animatable.Text
        animation="bounceInUp"
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        OnStore
      </Animatable.Text>
    );
  };
}

const styles = StyleSheet.create({
  ImageStyle: {
    height: 100,
    width: 100,
    marginBottom: 10,
    alignSelf: "center",
  },
  TextStyling: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default LogoComponent;
