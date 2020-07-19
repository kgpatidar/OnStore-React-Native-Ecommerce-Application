import React, { Component } from "react";

import {
  Text,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { View } from "react-native-animatable";
import { Icon } from "native-base";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";

class SignInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickSubmit: 0,
      email: "",
      password: "",
      isEmailValid: true,
      finalData: "",
      passwordChageEmail: "",
    };
  }

  render() {
    if (this.state.isClickSubmit === 0) {
      return (
        <View animation="flipInX">
          <Text style={styles.TitleStyling}>SIGN IN</Text>
          <KeyboardAvoidingView behavior="padding">
            <View style={[styles.TextInputStyling]}>
              <Icon name="person" style={{ color: "#000" }} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                keyboardAppearance="dark"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                style={styles.TextInputFieldStyling}
              />
            </View>
            <View style={styles.TextInputStyling}>
              <Icon name="key" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#aaa"
                keyboardType="number-pad"
                value={this.state.password}
                onChangeText={(password) => {
                  this.setState({ password: password });
                }}
                style={styles.TextInputFieldStyling}
              />
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.ButtonCoverStyling}
            onPress={this.signInCredetialCheck}
          >
            {this.SubmitButtonRender()}
          </TouchableOpacity>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                alignSelf: "center",
              }}
              onPress={this.props.OnBackFromSignIn}
            >
              <Icon
                name="arrow-back"
                style={{ fontSize: 16, marginRight: 5 }}
              />
              <Text style={{ color: "blue" }}>Get Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                alignSelf: "center",
              }}
              onPress={() => {
                this.setState({ isClickSubmit: 1 });
              }}
            >
              <Icon name="keypad" style={{ fontSize: 16, marginRight: 5 }} />
              <Text style={{ color: "blue" }}>Forget Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (this.state.isClickSubmit === 1) {
      // Forget Password
      return (
        <View animation="zoomInUp">
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "#000",
            }}
          >
            {"Request Password Change"}
          </Text>
          <View style={[styles.TextInputStyling]}>
            <Icon name="mail" style={{ color: "#000" }} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#000"
              keyboardType="email-address"
              keyboardAppearance="dark"
              value={this.state.passwordChageEmail}
              onChangeText={(passwordChageEmail) =>
                this.setState({ passwordChageEmail })
              }
              style={styles.TextInputFieldStyling}
            />
          </View>
          <TouchableOpacity
            style={styles.ButtonCoverStyling}
            onPress={this.requestForPasswordChange}
          >
            <Text style={{ color: "#fff", textAlign: "center", width: "100%" }}>
              Request Password Change
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              alignSelf: "center",
            }}
            onPress={() => this.setState({ isClickSubmit: 0 })}
          >
            <Icon name="arrow-back" style={{ fontSize: 16, marginRight: 5 }} />
            <Text style={{ color: "blue" }}>Get Back</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      // Submit View Render
      return (
        <View animation="flipInX" style={{ justifyContent: "center" }}>
          <Text
            style={{ textAlign: "center", marginTop: 100, marginBottom: 20 }}
          >
            Loading
          </Text>
          <ActivityIndicator size={30} />
        </View>
      );
    }
  }

  requestForPasswordChange = () => {
    Alert.alert("Feature Soon", "We are doing it for you!");
  };

  signInCredetialCheck = () => {
    let EmailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      this.state.email.length > 0 &&
      EmailReg.test(this.state.email) &&
      this.state.password.length > 5
    ) {
      this.setState({ isClickSubmit: true });
      console.log("Checking");
      fetch("http://onstore.onlinewebshop.net/UserDirectory/SingInUser.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json !== "Wrong") {
            this.props.savePersonalToRedux(json);
            this.props.onSubmitSignIn();
          } else {
            Alert.alert("Wrong");
            this.setState({ isClickSubmit: 0 });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!EmailReg.test(this.state.email)) {
      console.warn("Invalid Email");
    } else if (this.state.password.length < 6) {
      console.warn("Wrong Password");
    } else {
      console.warn("Error in Login");
    }
  };

  SubmitButtonRender = () => {
    if (!this.state.isClickSubmit) {
      return <Text style={styles.SubmitFieldStyling}>Submit</Text>;
    }
    return <ActivityIndicator color="#fff" style={{ width: "100%" }} />;
  };

  OnSubmitingAuth = () => {
    if (this.state.isClickSubmit === false) {
      this.setState({ isClickSubmit: 2 });
      //   CheckingAuth

      this.props.onSubmitSignAuth;
    }
  };
}

const mapDispatchToProps = (dispatch) => ({
  savePersonalToRedux: (json) =>
    dispatch({
      type: "SAVE_USER_DATA",
      payload: json,
    }),
});

export default connect(null, mapDispatchToProps)(SignInComponent);

const styles = StyleSheet.create({
  TextInputStyling: {
    flexDirection: "row",
    borderLeftColor: "#6200EE",
    borderLeftWidth: 5,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    width: "80%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  TextInputFieldStyling: {
    width: "100%",
    marginLeft: 20,
  },
  SubmitFieldStyling: {
    textAlign: "center",
    width: "100%",
    color: "#fff",
  },
  ButtonCoverStyling: {
    flexDirection: "row",
    backgroundColor: "#6200EE",
    color: "#fff",
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    height: 40,
    alignItems: "center",
  },
  TitleStyling: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
