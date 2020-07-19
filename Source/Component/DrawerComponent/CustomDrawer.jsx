import React, { Component } from "react";
import { Text, StyleSheet, Image } from "react-native";
import { View } from "react-native-animatable";
import { DrawerItems } from "react-navigation-drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

class CustomDrawer extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <TouchableOpacity
          style={styles.CloseIconCoverStyling}
          onPress={() => this.props.navigation.closeDrawer()}
        >
          <MaterialCommunityIcons
            name="close"
            style={styles.DrawerCloseIconStyling}
          />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/Image/brandLogo.png")}
          style={styles.BrandlogoStying}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          OnStore
        </Text>
        <DrawerItems {...this.props} />
      </View>
    );
  }
}

export default CustomDrawer;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    elevation: 18,
  },
  BrandlogoStying: {
    width: "100%",
    height: 100,
    resizeMode: "center",
  },
  DrawerCloseIconStyling: {
    alignSelf: "flex-end",
    fontSize: 25,
    marginTop: 10,
    marginRight: 10,
    color: "blue",
  },
  CloseIconCoverStyling: {
    alignSelf: "flex-end",
  },
});
