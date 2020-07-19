import React, { Component } from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import { View } from "react-native-animatable";
import { Icon, Header, Footer } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

import HeaderComponent from "../Component/ProfileComponent/HeaderComponent";
import AddressComponent from "../Component/ProfileComponent/AddressComponent";
import OptionComponent from "../Component/ProfileComponent/OptionComponent";

const HEIGHT = Dimensions.get("window").height;

class ProfileScreen extends Component {
  render() {
    return (
      <View>
        <View style={styles.HeaderViewStyling}>
          <HeaderComponent
            callBackDrawerOpening={() => {
              this.props.navigation.openDrawer();
            }}
          />
        </View>
        <View>
          <AddressComponent />
        </View>
        <View>
          <OptionComponent />
        </View>
      </View>
    );
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  headerStyle: {
    flex: 1,
    backgroundColor: "#fff",
  },
  HeaderViewStyling: {
    height: HEIGHT * 0.3,
    width: "100%",
    backgroundColor: "#fff",
  },
});
