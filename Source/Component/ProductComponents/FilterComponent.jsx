import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";
import {} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";

class FilterComponent extends Component {
  constructor() {
    super();

    this.state = {
      isPriceLowToHigh: 0,
    };
  }

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 40,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginLeft: 10, alignSelf: "center" }}></Text>
          <TouchableOpacity
            style={[
              styles.PriceSortButtonStyling,
              {
                borderColor:
                  this.state.isPriceLowToHigh == 1 ? "#00b894" : "#000",
              },
            ]}
            onPress={() => this.SortAccordingPrice(1)}
          >
            <Text
              style={{
                color: this.state.isPriceLowToHigh == 1 ? "#00b894" : "#000",
              }}
            >
              Price : Low to High
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.PriceSortButtonStyling,
              {
                borderColor:
                  this.state.isPriceLowToHigh == 2 ? "#00b894" : "#000",
              },
            ]}
            onPress={() => this.SortAccordingPrice(2)}
          >
            <Text
              style={{
                color: this.state.isPriceLowToHigh == 2 ? "#00b894" : "#000",
              }}
            >
              Price : High to Low
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={this.props.OpenFilterModal}>
            <MaterialCommunityIcons
              name="filter"
              style={{ fontSize: 25, marginRight: 10, color: "green" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  SortAccordingPrice = (priceSortIndex) => {
    if (this.state.isPriceLowToHigh === priceSortIndex) {
      priceSortIndex = 0;
    }

    this.props.FilterChangeMessage(priceSortIndex);
    this.props.SortAccordPrice(priceSortIndex);
    this.setState({ isPriceLowToHigh: priceSortIndex });
  };
}

const mapDispatchToProps = (dispatch) => ({
  SortAccordPrice: (index) =>
    dispatch({
      type: "CHANGE_PRICE_SORT",
      payload: index,
    }),
});

export default connect(null, mapDispatchToProps)(FilterComponent);

const styles = StyleSheet.create({
  PriceSortButtonStyling: {
    marginLeft: 10,
    borderWidth: 1,
    justifyContent: "center",
    paddingLeft: 9,
    paddingRight: 9,
    borderRadius: 20,
    marginBottom: 10,
  },
});
