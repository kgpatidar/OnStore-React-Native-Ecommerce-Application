import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";

import LogoComponent from "../Component/LogoComponent";
import * as Animatable from "react-native-animatable";
import SignInComponent from "../Component/AuthComponents/SignInComponent";

import { Container, Icon } from "native-base";
import { connect } from "react-redux";

class AuthScreen extends Component {
  constructor() {
    super();

    this.state = {
      authCompoentIndex: 0,
      marginPositionLogo: new Animated.Value(150),
      iamfromredux: [],
    };
  }

  render() {
    return (
      <Container>
        <ImageBackground
          source={require("../../assets/Image/backAuth.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <Animated.View
            style={[
              styles.LogoAuthStyling,
              {
                height: this.state.marginPositionLogo,
                marginTop: this.state.marginPositionLogo,
              },
            ]}
          >
            <LogoComponent indexValue="2" />
          </Animated.View>
          {this.RenderAuthComponent()}
        </ImageBackground>
      </Container>
    );
  }

  RenderAuthComponent() {
    if (this.state.authCompoentIndex === 0) {
      return (
        <Animatable.View
          style={styles.AuthButtonStyling}
          animation="lightSpeedIn"
        >
          <TouchableOpacity
            style={styles.SignInButtonStyling}
            onPress={this.OnHandlingSignIn}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "bold", color: "#fff" }}
            >
              SIGN IN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SignUpButtonStyling}
            onPress={this.OnHandlingSignUp}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              REGISTER
            </Text>
            <Icon name="ios-arrow-dropright-circle" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.SignInGoogleButtonStyling}>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", color: "#fff" }}
            >
              SIGN IN WITH GOOGLE
            </Text>
            <Icon name="logo-googleplus" style={{ color: "#fff" }} />
          </TouchableOpacity>
        </Animatable.View>
      );
    } else if (this.state.authCompoentIndex === 1) {
      return (
        <KeyboardAvoidingView
          behavior="padding"
          style={
            ([styles.AuthButtonStyling],
            { justifyContent: "center", marginTop: 50 })
          }
        >
          <SignInComponent
            OnBackFromSignIn={this.OnBackFromSignInAuth}
            onSubmitSignIn={this.onSubmitSignInAuth}
          />
        </KeyboardAvoidingView>
      );
    }
  }

  onSubmitSignInAuth = () => {
    this.props.navigation.navigate("Home");
  };

  OnBackFromSignInAuth = () => {
    this.setState({ authCompoentIndex: 0 });
    Animated.timing(this.state.marginPositionLogo, {
      toValue: 150,
      duration: 300,
    }).start();
  };

  OnHandlingSignIn = () => {
    this.setState({ authCompoentIndex: 1 });
    Animated.timing(this.state.marginPositionLogo, {
      toValue: 90,
      duration: 300,
    }).start();
  };

  OnHandlingSignUp = () => {
    this.props.navigation.navigate("Register");
  };
}

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  LogoAuthStyling: {
    height: 100,
    alignSelf: "center",
  },
  AuthButtonStyling: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    justifyContent: "center",
  },
  SignInButtonStyling: {
    height: 40,
    borderWidth: 2,
    backgroundColor: "#000",
    justifyContent: "center",
    borderRadius: 9,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: "#000",
    elevation: 10,
  },
  SignUpButtonStyling: {
    height: 40,
    borderWidth: 2,
    justifyContent: "space-around",
    borderRadius: 9,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  SignInGoogleButtonStyling: {
    flexDirection: "row",
    height: 40,
    backgroundColor: "#4c8bf5",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 9,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: "#000",
    elevation: 5,
  },
});
