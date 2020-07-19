import React, { Component } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { View } from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

class OptionComponent extends Component {
  constructor() {
    super();

    this.state = {
      moreOptionsList: [
        { id: "1", option: "Past Order", iconname: "camera-timer" },
        { id: "2", option: "My Account", iconname: "account-card-details" },
        { id: "3", option: "My Profie", iconname: "face-profile" },
        { id: "4", option: "Favorite", iconname: "heart-multiple" },
        { id: "5", option: "Extra ", iconname: "account-balance" },
        { id: "6", option: "Extra", iconname: "account-balance" },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.MoreOptionTextStyle}>More Option</Text>

        <View style={styles.MoreOptionContainerStyling}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.moreOptionsList}
            renderItem={(item, index) => {
              return this.MoreOptionListItemRender(item, index);
            }}
            keyExtractor={(item, index) => item.id}
          />
        </View>
      </View>
    );
  }

  MoreOptionListItemRender = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => this.OnClickingMoreOptionItem(item.index)}
      >
        <View style={styles.ListItemStyling}>
          <MaterialCommunityIcons
            name={item.item.iconname}
            style={{ fontSize: 25, color: "#00BCD4" }}
          />
          <Text
            style={{
              marginTop: 5,
              fontSize: 14,
              color: "#000",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {item.item.option}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  OnClickingMoreOptionItem = (item) => {
    alert(item);
  };
}

export default OptionComponent;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  MoreOptionContainerStyling: {
    margin: 0,
  },
  MoreOptionTextStyle: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    marginTop: 10,
  },
  ListItemStyling: {
    height: 100,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 6,
    marginRight: 6,
    backgroundColor: "#fff",
    elevation: 5,
  },
});
