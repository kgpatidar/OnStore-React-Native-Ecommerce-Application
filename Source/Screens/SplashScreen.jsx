import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Container, Content, Grid, Col, Row } from "native-base";

import LogoComponent from "../Component/LogoComponent";

class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Auth");
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <LogoComponent indexValue="1" />
      </View>
    );
  }
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
