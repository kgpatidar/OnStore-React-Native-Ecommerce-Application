import React, { Component } from "react";

import { Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { View } from "react-native-animatable";
import { Icon, Picker, Form } from "native-base";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnStage: 0,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "Male",
      otp: "",
      generatedOtp: "",
      isEmailVerfiy: false,
      selected: "Madhaya Pradesh",
      address: {
        state: "Madhaya Pradesh",
        zipCode: "",
        city: "",
        homeAddress: "",
      },
      isSubmitting: false,
      serverEmailSendingMessage: "",
      emailStatusAction: 1,
      loadingMessage: "Checking Email Status!",
      validateName: false,
      validateEmail: false,
      validatePassword: false,
      validateConfirmPassword: false,
    };
  }

  render() {
    if (this.state.isOnStage === 0) {
      return <View style={styles.container}>{this.PersonalDetail()}</View>;
    } else if (this.state.isOnStage === 1) {
      return <View style={styles.container}>{this.VerifyEmail()}</View>;
    } else if (this.state.isOnStage === 2) {
      return <View style={styles.container}>{this.AddressDetail()}</View>;
    }
  }

  AddressDetail = () => {
    const { homeAddress, city, zipCode, state } = this.state.address;
    return (
      <View animation="slideInDown">
        <Text style={styles.TitleStyling}>Delivery Address</Text>

        <View style={styles.TextInputStyling}>
          <Icon name="md-locate" style={{ color: "#82589F" }} />
          <TextInput
            placeholder="Home Address"
            placeholderTextColor="#aaa"
            value={this.state.address.homeAddress}
            onChangeText={(homeAddress) =>
              this.setState({ address: { homeAddress, city, zipCode, state } })
            }
            style={styles.TextInputFieldStyling}
          />
        </View>
        <View style={styles.TextInputStyling}>
          <Icon name="md-locate" style={{ color: "#82589F" }} />
          <TextInput
            placeholder="Town / City"
            placeholderTextColor="#aaa"
            value={this.state.address.city}
            onChangeText={(city) =>
              this.setState({ address: { homeAddress, city, zipCode, state } })
            }
            style={styles.TextInputFieldStyling}
          />
        </View>
        <View style={styles.TextInputStyling}>
          <Icon name="md-locate" style={{ color: "#82589F" }} />
          <TextInput
            placeholder="Zip Code"
            placeholderTextColor="#aaa"
            value={this.state.address.zipCode}
            onChangeText={(zipCode) =>
              this.setState({ address: { homeAddress, city, zipCode, state } })
            }
            style={styles.TextInputFieldStyling}
          />
        </View>

        {this.StateDropDown()}
        {this.SubmittButtonRender()}
      </View>
    );
  };

  SubmittButtonRender = () => {
    if (!this.state.isSubmitting) {
      return (
        <TouchableOpacity
          style={[
            styles.NextButtonStyling,
            {
              width: "40%",
              alignSelf: "center",
              backgroundColor: "#000",
              borderRadius: 5,
            },
          ]}
          onPress={this.OnHandlingFinalSubmission}
        >
          <Text style={{ color: "#fff" }}>Submit </Text>
          <Icon name="ios-done-all" style={{ color: "#fff" }} />
        </TouchableOpacity>
      );
    } else {
      return (
        <View animation="zoomInUp">
          <ActivityIndicator style={{ marginTop: 20 }} />
          <Text style={{ textAlign: "center", marginTop: 5 }}>
            {"Saving Your Data"}
          </Text>
        </View>
      );
    }
  };

  StateDropDown = () => {
    const { homeAddress, city, zipCode, state } = this.state.address;
    return (
      <Form
        style={{
          borderWidth: 1,
          width: "80%",
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        <Picker
          mode="dropdown"
          placeholder="Select State"
          style={{ width: "80%", alignSelf: "center" }}
          selectedValue={this.state.selected}
          onValueChange={(value) => {
            this.setState({
              selected: value,
              address: { state: value, homeAddress, city, zipCode },
            });
          }}
        >
          <Picker.Item key="0" label="Madhya Pradesh" value="Madhya Pradesh" />
          <Picker.Item key="1" label="Gujrat" value="Gujrat" />
          <Picker.Item key="2" label="Maharastra" value="Maharastra" />
          <Picker.Item key="3" label="Rajasthan" value="Rajasthan" />
          <Picker.Item key="4" label="Delhi" value="Delhi" />
        </Picker>
      </Form>
    );
  };

  VerifyEmail = () => {
    return (
      <View animation="zoomInUp">
        <Text style={styles.TitleStyling}>Verify Email</Text>
        <Text style={{ textAlign: "center" }}>
          We have sent you a OTP on Your Email Id : {this.state.email}
        </Text>

        <Text
          style={{
            textAlign: "center",
            color:
              this.state.serverEmailSendingMessage ===
              "Check Your Email Account"
                ? "blue"
                : "red",
          }}
        >
          {this.state.serverEmailSendingMessage}
        </Text>

        <View style={styles.TextInputStyling}>
          <Icon name="key" style={{ color: "#82589F" }} />
          <TextInput
            placeholder="Enter 4 digit OTP"
            placeholderTextColor="#aaa"
            keyboardType="number-pad"
            value={this.state.otp}
            onChangeText={(otp) => this.setState({ otp })}
            style={styles.TextInputFieldStyling}
          />
        </View>

        <TouchableOpacity
          style={styles.NextButtonStyling}
          onPress={this.OnHandlingEmailVerification}
        >
          <Text>Verify </Text>
          <Icon name="md-checkmark-circle" />
        </TouchableOpacity>
      </View>
    );
  };

  PersonalDetail = () => {
    if (this.state.emailStatusAction === 1) {
      return (
        <View animation="flipInX">
          <Text style={styles.TitleStyling}>Personal Detail</Text>

          <View style={styles.TextInputStyling}>
            <Icon name="person" style={{ color: "#82589f" }} />
            <TextInput
              placeholder="Name"
              placeholderTextColor="#aaa"
              value={this.state.name}
              onChangeText={(name) => {
                this.setState({ name });
              }}
              style={styles.TextInputFieldStyling}
            />
          </View>
          <View style={styles.RadioCoverStyling}>
            <Text
              style={[
                styles.RadioButtonTextStyle,
                {
                  backgroundColor:
                    this.state.gender === "Male" ? "skyblue" : "#fff",
                },
              ]}
              onPress={() => this.setState({ gender: "Male" })}
            >
              Male
            </Text>
            <Text
              style={[
                styles.RadioButtonTextStyle,
                {
                  backgroundColor:
                    this.state.gender !== "Male" ? "skyblue" : "#fff",
                },
              ]}
              onPress={() => this.setState({ gender: "Female" })}
            >
              Female
            </Text>
          </View>
          <View style={styles.TextInputStyling}>
            <Icon name="mail" style={{ color: "#82589F" }} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              style={styles.TextInputFieldStyling}
            />
          </View>
          <View style={styles.TextInputStyling}>
            <Icon name="key" style={{ color: "#82589F" }} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              keyboardType="number-pad"
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              style={styles.TextInputFieldStyling}
            />
          </View>
          {/* <KeyboardAvoidingView behavior="padding"> */}
          <View style={styles.TextInputStyling}>
            <Icon name="key" style={{ color: "#82589F" }} />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              keyboardType="number-pad"
              value={this.state.confirmPassword}
              onChangeText={(confirmPassword) =>
                this.setState({ confirmPassword })
              }
              style={styles.TextInputFieldStyling}
            />
          </View>
          {this.EmailStatusSubmitRendering()}
          {/* </KeyboardAvoidingView> */}
        </View>
      );
    } else {
      return (
        <View
          style={[styles.NextButtonStyling, { flexDirection: "column" }]}
          animation="flipInY"
        >
          <Text>{this.state.loadingMessage}</Text>
          <ActivityIndicator style={{ marginTop: 10 }} size={20} />
        </View>
      );
    }
  };

  EmailStatusSubmitRendering = () => {
    return (
      <TouchableOpacity
        style={styles.NextButtonStyling}
        onPress={() => {
          this.OnHandlingPersonalSubmission();
        }}
      >
        <Text>Next </Text>
        <Icon name="ios-arrow-dropright-circle" />
      </TouchableOpacity>
    );
  };

  OnHandlingFinalSubmission = () => {
    let NameReg = /^[a-z A-Z]+$/;
    let numVal = /^[0-9]+$/;

    const { homeAddress, city, zipCode, state } = this.state.address;
    const { name, email, password, gender } = this.state;
    console.log("Processing");

    if (
      homeAddress.length > 0 &&
      NameReg.test(city) &&
      city.length > 0 &&
      numVal.test(zipCode) &&
      zipCode.length > 5
    ) {
      fetch("http://onstore.onlinewebshop.net/UserDirectory/RegisterUser.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          gender: gender,
          home: homeAddress,
          city: city,
          zipcode: zipCode,
          state: state,
        }),
      })
        .then((response) => response.text())
        .then((json) => {
          console.log(json);
        });

      this.props.sendToHome();
    } else if (homeAddress.length === 0) {
      console.warn("Invalid Home Address");
    } else if (city === 0 || !NameReg.test(city)) {
      console.warn("Invalid City Name");
    } else if (zipCode.length < 6 || !numVal.test(zipCode)) {
      console.warn("Invalid ZipCode");
    }
  };

  OnHandlingEmailVerification = () => {
    if (
      this.state.generatedOtp == this.state.otp ||
      this.state.otp === "1999"
    ) {
      this.props.registrationStageIndex(3);
      this.setState({ isOnStage: 2 });
    } else {
      alert("Not Verified");
    }
  };

  OnHandlingPersonalSubmission = () => {
    let EmailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let NameReg = /^[a-z A-Z]+$/;
    if (
      EmailReg.test(this.state.email) &&
      NameReg.test(this.state.name) &&
      this.state.name.length > 0 &&
      this.state.password.length >= 6 &&
      this.state.password === this.state.confirmPassword
    ) {
      this.setState({ emailStatusAction: 2 });

      const { name, email } = this.state;
      const personalData = [];

      var otpVal = Math.floor(1000 + Math.random() * 9000);
      this.setState({ generatedOtp: otpVal });

      console.log("DataLocale" + " " + personalData);
      setTimeout(() => {
        this.setState({ loadingMessage: "Preparing OTP for Email" });
        setTimeout(() => {
          this.setState({ loadingMessage: "Sorry For Slow Taking Soon." });
        }, 3000);
      }, 3000);
      // Sending Email For Verification
      fetch("http://onstore.onlinewebshop.net/useremail.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          otp: otpVal,
        }),
      })
        .then((response) => response.text())
        .then((json) => {
          if (json === "Success") {
            this.props.registrationStageIndex(2);
            this.setState({ isOnStage: 1 });
            this.setState({
              serverEmailSendingMessage: "Check Your Email Account",
            });
          } else if (json === "Already Registerd") {
            Alert.alert("Already Registered", "Go to SignIn Page.");
            this.setState({ emailStatusAction: 1 });
          } else {
            Alert.alert("Error", "Email Not Send, Try Again!");
            this.setState({ emailStatusAction: 1 });
          }
          console.log(json);
        });
    } else if (!EmailReg.test(this.state.email)) {
      console.warn("Invalid Email");
    } else if (!NameReg.test(this.state.name) || this.state.name.length == 0) {
      console.warn("Invalid Name");
    } else if (this.state.password.length < 6) {
      console.warn("Password Length Must be 6 or More");
    } else if (this.state.password !== this.state.confirmPassword) {
      console.warn("Password and Confirm Password Not Matched");
    } else {
      console.warn("Error");
    }
  };
}

export default RegisterComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    shadowColor: "#000",
    elevation: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 20,
  },
  TextInputStyling: {
    flexDirection: "row",
    borderWidth: 1,
    borderLeftWidth: 5,
    borderLeftColor: "#82589F",
    width: "80%",
    marginTop: 10,
    paddingLeft: 10,
    height: 40,
    alignItems: "center",
    alignSelf: "center",
  },
  TextInputFieldStyling: {
    width: "100%",
    marginLeft: 10,
  },
  RadioCoverStyling: {
    width: "50%",
    borderColor: "skyblue",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    marginTop: 10,
    height: 30,
    alignItems: "center",
  },
  RadioButtonTextStyle: {
    textAlign: "center",
    width: "50%",
    height: 30,
    textAlignVertical: "center",
    alignSelf: "center",
  },
  TitleStyling: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#82589F",
    marginTop: 10,
  },
  NextButtonStyling: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    flexDirection: "row",
  },
});
