import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  AsyncStorage,
} from "react-native";
import { View } from "react-native-animatable";
import { connect } from "react-redux";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

class ProductInfoScreen extends Component {
  constructor() {
    super();

    this.state = {
      isLiked: false,
      viewImage: false,
      likedPhoneCollection: [-1],
    };
  }

  componentDidMount() {
    this.letGetisLiked();
  }

  letGetisLiked = async () => {
    let alreadyLiked = await AsyncStorage.getItem("qlikedPhone");
    if (alreadyLiked.split(",").includes(this.props.phnData.productid)) {
      this.setState({ isLiked: true });
    }
  };

  RenderRatingOfProduct = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <MaterialCommunityIcons
          style={{ fontSize: 18, color: "green" }}
          name={
            parseFloat(this.props.phnData.productrating) >= 1
              ? "star"
              : "star-outline"
          }
        />
        <MaterialCommunityIcons
          style={{ fontSize: 18, color: "green" }}
          name={
            parseFloat(this.props.phnData.productrating) >= 2
              ? "star"
              : "star-outline"
          }
        />
        <MaterialCommunityIcons
          style={{ fontSize: 18, color: "green" }}
          name={
            parseFloat(this.props.phnData.productrating) >= 3
              ? "star"
              : "star-outline"
          }
        />
        <MaterialCommunityIcons
          style={{ fontSize: 18, color: "green" }}
          name={
            parseFloat(this.props.phnData.productrating) >= 4
              ? "star"
              : "star-outline"
          }
        />
        <MaterialCommunityIcons
          style={{ fontSize: 18, color: "green" }}
          name={
            parseFloat(this.props.phnData.productrating) >= 5
              ? "star"
              : "star-outline"
          }
        />
      </View>
    );
  };

  RenderProductDetail = (title, titleValue) => {
    return (
      <View style={styles.PhnDetailSectionStyling}>
        <Text style={{ fontSize: 16 }}>{title}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{titleValue}</Text>
      </View>
    );
  };

  HeaderComponent = () => {
    return (
      <View style={styles.headerContainerStyling}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Product");
          }}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            style={{ fontSize: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            this.setState({ isLiked: this.state.isLiked ? false : true });
            if (!this.state.isLiked) {
              try {
                let alreadyLiked = await AsyncStorage.getItem("qlikedPhone");
                console.log(alreadyLiked);
                await AsyncStorage.setItem(
                  "qlikedPhone",
                  alreadyLiked === null
                    ? this.props.phnData.productid
                    : alreadyLiked + "," + this.props.phnData.productid
                );
              } catch (error) {
                console.log(error);
              }
            } else {
              let alreadyLiked = await AsyncStorage.getItem("qlikedPhone");
              let refurbish = alreadyLiked.split(",");
              const filteredPeople = refurbish.filter(
                (item) => item !== this.props.phnData.productid
              );
              await AsyncStorage.setItem(
                "qlikedPhone",
                filteredPeople.toString()
              );
            }
          }}
        >
          <MaterialCommunityIcons
            name={this.state.isLiked ? "heart" : "heart-outline"}
            style={{ fontSize: 30, color: this.state.isLiked ? "red" : "#000" }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  RenderProductDetailInTable = () => {
    return (
      <View>
        {this.RenderProductDetail("RAM", this.props.phnData.productram + " GB")}
        {this.RenderProductDetail("ROM", this.props.phnData.peoductrom + " GB")}
        {this.RenderProductDetail(
          "Front Camer",
          this.props.phnData.productfrontcamera + " mp"
        )}
        {this.RenderProductDetail(
          "Rear Camera",
          this.props.phnData.productrearcamera + " mp"
        )}
        {this.RenderProductDetail("CPU", this.props.phnData.productcpu)}
        {this.RenderProductDetail(
          "Size",
          this.props.phnData.productheight +
            "*" +
            this.props.phnData.productwidth +
            " px"
        )}
        {this.RenderProductDetail(
          "Diagonal Size",
          this.props.phnData.productinch + " inch"
        )}
        {this.RenderProductDetail(
          "Product Color",
          this.props.phnData.productcolor
        )}
        {this.RenderProductDetail(
          "Battery",
          this.props.phnData.productbattery + " mAh"
        )}
        {this.RenderProductDetail(
          "Release Data",
          this.props.phnData.productdate
        )}
      </View>
    );
  };

  ShowModal = () => {
    this.setState({ viewImage: true });
  };

  RenderModalComponent = () => {
    return (
      <Modal
        visible={this.state.viewImage}
        animationType="slide"
        onRequestClose={() => {
          this.setState({ viewImage: false });
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Image
            source={{ uri: this.props.phnData.productimage }}
            style={{ width: WIDTH, height: HEIGHT / 2 }}
          />
          <Text style={{ fontSize: 16, marginTop: 20, fontWeight: "bold" }}>
            {this.props.phnData.productcompany +
              " " +
              this.props.phnData.productmodel}
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({ viewImage: false })}
            style={{
              marginTop: 30,
              borderWidth: 2,
              width: 100,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="close"
              style={{
                fontSize: 30,
                color: "red",
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.HeaderComponent()}
        <View>
          <View>
            <TouchableWithoutFeedback onPress={this.ShowModal}>
              <Image
                source={{ uri: this.props.phnData.productimage }}
                style={{
                  width: WIDTH,
                  height: HEIGHT / 3,
                  resizeMode: "center",
                }}
              />
            </TouchableWithoutFeedback>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  marginTop: 7,
                }}
              >
                {this.props.phnData.productcompany +
                  " " +
                  this.props.phnData.productmodel}
              </Text>
              <Text style={{ textAlign: "center", color: "#aaa" }}>
                {this.props.phnData.productcompany} products
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 23,
                  fontWeight: "bold",
                  color: "blue",
                }}
              >
                {"\u20B9 "}
                <Text style={{ fontSize: 16, color: "#000" }}>
                  {this.props.phnData.productprice + " "}
                </Text>
                <Text style={{ fontSize: 16, color: "#000" }}>(MRP)</Text>
              </Text>
            </View>
            <Text style={{ textAlign: "center" }}>-----</Text>
            {this.RenderProductDetailInTable()}
            <View style={styles.ProductRatingComponentStyling}>
              <Text style={{ fontSize: 16 }}>Product Rating</Text>
              {this.RenderRatingOfProduct()}
            </View>
            {this.RenderProductDetail("Mode Of Payment", "Cash, PayTM")}
          </View>
          <TouchableOpacity
            style={styles.BuyNowButtonStyling}
            onPress={() => this.props.navigation.navigate("Buy")}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
              BUY NOW
            </Text>
          </TouchableOpacity>

          {this.RenderModalComponent()}
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.productReducer);
  return {
    phnData: state.productReducer,
  };
}
export default connect(mapStateToProps, null)(ProductInfoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainerStyling: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    backgroundColor: "#fff",
  },
  PhnDetailSectionStyling: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginLeft: "15%",
  },
  ProductRatingComponentStyling: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginLeft: "15%",
  },
  BuyNowButtonStyling: {
    marginTop: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue",
    borderBottomWidth: 10,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderColor: "#fff",
  },
});
