import React, { Component } from "react";
import { Text, StyleSheet, Dimensions, Image } from "react-native";
import { View } from "react-native-animatable";
import { Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

class HeaderComponent extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      searchValue: "",
    };
  }

  render() {
    return (
      <View style={{ width: "100%", height: "100%", flex: 1 }}>
        <View
          style={{
            position: "absolute",
            width: WIDTH,
            alignSelf: "center",
            height: (HEIGHT * 0.3) / 2,
            backgroundColor: "#00BCD4",
          }}
        >
          <TouchableOpacity
            onPress={this.props.callBackDrawerOpening}
            style={{ position: "relative" }}
          >
            <MaterialIcons
              name="menu"
              active
              style={{ color: "#fff", margin: 10, fontSize: 30 }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <Image
              style={styles.MaleAvtarStyle}
              source={{
                uri:
                  "https://i.ya-webdesign.com/images/male-vector-front-face-5.png",
              }}
            />
          </View>
          <Text style={{ textAlign: "center", marginTop: 5 }}>
            Hey,{" "}
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {this.props.userData.name}
            </Text>
          </Text>
        </View>
      </View>
    );
  }

  openDrawer = () => {
    this.props.callBackDrawerOpening("DrawerOpen");
  };

  SearchData = () => {
    alert(this.state.searchValue);
  };
}

function mapStateToProps(state) {
  return { userData: state.userDetail };
}

export default connect(mapStateToProps, null)(HeaderComponent);

const styles = StyleSheet.create({
  HeaderStyle: {
    flex: 1,
    justifyContent: "flex-start",
  },
  MaleAvtarStyle: {
    marginTop: HEIGHT * 0.05,
    height: 100,
    width: 100,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderRadius: 100,
    alignSelf: "center",
  },
});
