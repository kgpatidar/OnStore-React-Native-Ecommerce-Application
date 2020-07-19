import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { View } from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";

class BuyScreen extends Component {
  constructor() {
    super();

    this.state = {
      isPlacingOrder: false,
      numberIng: 5,
      valueIconNumber: "numeric-5-box",
      colorNumber: ["purple", "red", "blue", "orange", "pink", "green"],
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ProdutInfo")}
          >
            <MaterialCommunityIcons
              name="close"
              style={{
                fontSize: 27,
                marginLeft: 10,
                marginTop: 10,
                color: "#000",
              }}
            />
          </TouchableOpacity>
        </View>
        {this.ProductDetail()}
        {this.PlacingOrderModal()}
      </View>
    );
  }

  ProductDetail = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 16 }}>Product Name</Text>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {this.props.phnData.productcompany +
            " " +
            this.props.phnData.productmodel}
        </Text>
        <Text></Text>
        <View
          style={{ backgroundColor: "#eee", alignItems: "center", padding: 10 }}
        >
          <Text style={{ fontSize: 16 }}>Total Price to Pay</Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {"Rs. " + this.props.phnData.productprice}
          </Text>
        </View>
        <Text></Text>
        <Text style={{ fontSize: 16 }}>Product Owner</Text>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {this.props.userData.name}
        </Text>
        <Text></Text>
        <View
          style={{ backgroundColor: "#eee", alignItems: "center", padding: 10 }}
        >
          <Text style={{ fontSize: 16 }}>Delivery Location</Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {this.props.userData.home + "," + this.props.userData.city}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {this.props.userData.zipcode}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {this.props.userData.state}
          </Text>
          <MaterialCommunityIcons
            name="pencil-outline"
            style={{ fontSize: 16, color: "green" }}
          />
        </View>
        <TouchableOpacity
          style={styles.OrderButtonStyling}
          onPress={() => {
            if (!this.state.isPlacingOrder) {
              this.RenderTimingForOrder(5);
              this.setState({ isPlacingOrder: true });
            }
          }}
        >
          <Text style={{ color: "#000080" }}>Place Order</Text>
        </TouchableOpacity>
      </View>
    );
  };

  PlacingOrderModal = () => {
    return (
      <Modal visible={this.state.isPlacingOrder}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <MaterialCommunityIcons
              name={this.state.valueIconNumber}
              style={{
                fontSize: 150,
                color: this.state.colorNumber[this.state.numberIng],
              }}
            />
          </View>
          <Text>
            {this.state.valueIconNumber === "check-circle"
              ? "Order Placed"
              : ""}
          </Text>
          <TouchableOpacity
            onPress={this.OnActioningOnOrder}
            style={{ marginTop: 50 }}
          >
            <Text
              style={{
                fontSize: 20,
                color:
                  this.state.valueIconNumber === "check-circle"
                    ? "green"
                    : "red",
              }}
            >
              {this.state.valueIconNumber === "check-circle"
                ? "Close"
                : "Cancel"}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  OnActioningOnOrder = () => {
    if (this.state.valueIconNumber === "check-circle") {
      this.props.navigation.navigate("Home");
    } else {
      this.setState({ isPlacingOrder: false });
    }
    this.setState({
      dnumberIng: 5,
      valueIconNumber: "numeric-5-box",
    });
  };

  RenderTimingForOrder = (ind) => {
    setTimeout(() => {
      if (ind == 1) {
        this.setState({
          numberIng: --this.state.numberIng,
          valueIconNumber: "check-circle",
        });
      } else {
        this.RenderTimingForOrder(--ind);
        this.setState({
          numberIng: --this.state.numberIng,
          valueIconNumber: "numeric-" + this.state.numberIng + "-box",
        });
      }
    }, 1000);
  };
}

function mapStateToProps(state) {
  //   console.log(state);
  return {
    phnData: state.productReducer,
    userData: state.userDetail,
  };
}
export default connect(mapStateToProps, null)(BuyScreen);

const styles = StyleSheet.create({
  OrderButtonStyling: {
    borderWidth: 1,
    width: "50%",
    alignItems: "center",
    height: 35,
    justifyContent: "center",
    marginTop: 22,
    borderColor: "#000080",
  },
});
