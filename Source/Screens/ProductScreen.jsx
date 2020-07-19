import React, { Component } from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { View } from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

import HeaderComponent from "../Component/ProductComponents/HeaderComponent";
import FilterComponent from "../Component/ProductComponents/FilterComponent";
import ProductListComponent from "../Component/ProductComponents/ProductListComponent";

import { connect } from "react-redux";

class ProductScreen extends Component {
  constructor() {
    super();
    this.state = {
      serachCat: "Product",
    };
  }

  render() {
    return (
      <View>
        <View>
          <HeaderComponent
            searchCategory={this.props.searchCat.searchingCategory}
            BackToHomeCallBack={() => {
              this.props.navigation.navigate("Home");
            }}
          />
        </View>
        {/* <View>
          <FilterComponent FilterChangeMessage={this.ChangeInFilter(0)} />
        </View> */}
        <ScrollView>
          <ProductListComponent
            searchCategory={this.props.searchCat.searchingCategory}
            NavigateToProductInfo={() => {
              this.props.navigation.navigate("ProdutInfo");
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchCat: state.categoryReducer,
  };
}

export default connect(mapStateToProps, null)(ProductScreen);
