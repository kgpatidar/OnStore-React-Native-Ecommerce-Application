import React, { Component } from "react";
import {
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { View } from "react-native-animatable";
import { FlatList } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";

import FilterComponent from "./FilterComponent";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

class ProductListComponent extends Component {
  componentDidMount() {
    this.FetchDataFromServer(this.props.sortIndex);
  }

  constructor() {
    super();
    this.state = {
      productData: [],
      isLoading: true,
      applyFilterModal: false,
    };
  }

  render() {
    return (
      <View style={{ height: HEIGHT - 110 }}>
        <FilterComponent
          FilterChangeMessage={this.SortAccordingToPrice}
          OpenFilterModal={() => this.setState({ applyFilterModal: true })}
        />
        {this.RenderListOnLoading()}
        {this.SeeThat()}
        {this.RenderNoItemView()}
        {this.RenderFilterModalView()}
      </View>
    );
  }

  RenderListOnLoading = () => {
    if (!this.state.isLoading) {
      return (
        <FlatList
          keyExtractor={(item) => item.productid}
          data={this.state.productData}
          renderItem={(item) => {
            return this.RenderProductItem(item);
          }}
        />
      );
    } else {
      return <ActivityIndicator style={{ flex: 1 }} size="large" />;
    }
  };

  RenderNoItemView = () => {
    if (!this.state.isLoading) {
      if (this.state.productData.length === 0) {
        return (
          <Text style={{ textAlign: "center", color: "blue" }}>No Item</Text>
        );
      } else {
        return null;
      }
    }
  };

  FetchDataFromServer = (ind) => {
    this.setState({ productData: [], isLoading: true });
    fetch("http://onstore.onlinewebshop.net/Product/productfile.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pricesort: ind,
        category: this.props.searchCategory,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json !== "0 results") {
          json.map((item) =>
            this.setState({
              ...this.state,
              productData: this.state.productData.concat(item),
            })
          );
        } else {
        }
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  SortAccordingToPrice = (sortIndex) => {
    this.FetchDataFromServer(sortIndex);
  };

  RenderProductItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.ProductItemCoverStyling}
        onPress={() => {
          this.props.NavigateToProductInfo();
          this.props.SendProductData(item.item);
        }}
      >
        <View>
          <Image
            source={{ uri: item.item.productimage }}
            style={{ width: WIDTH / 4, height: "100%", resizeMode: "center" }}
          />
        </View>
        <View>
          <Text style={styles.ProductNameStyling}>
            {item.item.productcompany + " " + item.item.productmodel}
          </Text>
          <Text style={{ color: "#aaa", fontSize: 12 }}>
            by {item.item.productcompany}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              <Text
                style={{ fontSize: 14, color: "green", fontWeight: "bold" }}
              >
                {"\u20B9 "}
              </Text>
              {item.item.productprice}
            </Text>
          </View>
          <Text>
            Memory{" "}
            <Text style={{ fontWeight: "bold" }}>
              ({item.item.productram + "GB / " + item.item.peoductrom + "GB"})
            </Text>
          </Text>
          <Text style={{ fontSize: 10 }}>Delivery in 2 Days</Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              style={{ fontSize: 16, color: "green" }}
              name={
                parseFloat(item.item.productrating) >= 1
                  ? "star"
                  : "star-outline"
              }
            />
            <MaterialCommunityIcons
              style={{ fontSize: 16, color: "green" }}
              name={
                parseFloat(item.item.productrating) >= 2
                  ? "star"
                  : "star-outline"
              }
            />
            <MaterialCommunityIcons
              style={{ fontSize: 16, color: "green" }}
              name={
                parseFloat(item.item.productrating) >= 3
                  ? "star"
                  : "star-outline"
              }
            />
            <MaterialCommunityIcons
              style={{ fontSize: 16, color: "green" }}
              name={
                parseFloat(item.item.productrating) >= 4
                  ? "star"
                  : "star-outline"
              }
            />
            <MaterialCommunityIcons
              style={{ fontSize: 16, color: "green" }}
              name={
                parseFloat(item.item.productrating) >= 5
                  ? "star"
                  : "star-outline"
              }
            />
          </View>
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 10,
              marginTop: 5,
              color: "#6200EE",
            }}
          >
            Click to View More
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  NavigateToProductInfo = (item) => {
    console.log(item);
  };

  SeeThat = () => {};

  RenderFilterModalView = () => {
    return (
      <Modal visible={this.state.applyFilterModal} animationType="fade">
        <View>
          <Text
            style={{ textAlign: "center", marginTop: 30, marginBottom: 30 }}
          >
            Filter feature will be soon Available
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={styles.CancelButtonModalStyle}
              onPress={() => this.setState({ applyFilterModal: false })}
            >
              <Text style={{ color: "blue" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ApplyButtonModalStyle}
              onPress={() => alert("Apply")}
            >
              <Text style={{ color: "#fff" }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
}

function mapStateToProps(state) {
  return {
    sortIndex: state.categoryReducer.isPriceLowToHigh,
  };
}

const mapDispatchToProps = (dispatch) => ({
  SendProductData: (mobData) =>
    dispatch({
      type: "VIEW_PRODUCT",
      payload: mobData,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListComponent);

const styles = StyleSheet.create({
  ProductItemCoverStyling: {
    backgroundColor: "#aaa",
    height: 150,
    width: WIDTH - 20,
    marginLeft: 10,
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
  },
  ProductNameStyling: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  CancelButtonModalStyle: {
    borderWidth: 1,
    width: WIDTH / 2 - 15,
    height: 30,
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
    borderColor: "blue",
  },
  ApplyButtonModalStyle: {
    width: WIDTH / 2 - 15,
    height: 30,
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
    backgroundColor: "blue",
  },
});
