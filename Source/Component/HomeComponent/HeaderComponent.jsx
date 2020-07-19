import React, { Component } from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import { View } from "react-native-animatable";
import { Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const WIDTH = Dimensions.get("window").width;

class HeaderComponent extends Component {
  constructor() {
    super();

    this.state = {
      isSearching: false,
      searchValue: "",
    };
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.openDrawer} style={{ padding: 5 }}>
            <Icon name={"menu"} style={{ color: "blue" }} />
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              value={this.state.searchValue}
              onChangeText={(searchValue) => this.setState({ searchValue })}
              placeholder="Search"
              style={styles.SearchFieldStyle}
            />
            <TouchableOpacity
              onPress={this.SearchData}
              style={{
                height: "100%",
                justifyContent: "center",
                marginRight: 5,
              }}
            >
              <MaterialIcons
                name="search"
                style={{ color: "#000", width: WIDTH / 5 - 10, fontSize: 25 }}
              />
            </TouchableOpacity>
          </View>
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
export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 30,
  },
  SearchFieldStyle: {
    fontSize: 20,
    marginLeft: 10,
    width: WIDTH - WIDTH / 4,
  },
});
