import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import RegisterComponent from "../Component/RegisterComponent/RegisterComponent";

import { Container, Radio, Header, Left, Right } from "native-base";

class RegisterScreen extends Component {
  constructor() {
    super();
    this.state = {
      registationStage: 1,
    };
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 19 }}>
              {"Register"}
            </Text>
          </Left>
          <Right>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Auth");
              }}
            >
              <Text style={{ color: "#fff" }}>Cancel</Text>
            </TouchableOpacity>
          </Right>
        </Header>
        <View
          behavior="padding"
          style={{
            flex: 1,
            width: "100%",
            marginTop: 0,
            justifyContent: "center",
          }}
        >
          <RegisterComponent
            registrationStageIndex={this.isAlert}
            sendToHome={() => {
              this.props.navigation.navigate("Auth");
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text>Personal</Text>
            <Radio selected={this.state.registationStage >= 1 ? true : false} />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text>Verify</Text>
            <Radio selected={this.state.registationStage >= 2 ? true : false} />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text>Address</Text>
            <Radio selected={this.state.registationStage >= 3 ? true : false} />
          </View>
        </View>
      </Container>
    );
  }

  isAlert = (val) => {
    this.setState({ registationStage: val });
  };
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});
