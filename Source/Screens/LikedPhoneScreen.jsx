import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

class LikedPhoneScreen extends Component {
  constructor() {
    super();

    this.state = {
      allData: [],
      likeData: [],
      onlyShowData: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.FetchAllData();
    this.AsyncLikeData();
  }

  AsyncLikeData = async () => {
    let alreadyLiked = await AsyncStorage.getItem("qlikedPhone");
    console.log("already ", alreadyLiked);
    if (alreadyLiked.length === 0) {
      return;
    }
    this.setState({ likeData: alreadyLiked.split(",") });
  };

  render() {
    return (
      <View>
        {this.RenderHeaderComponent()}
        {this.RenderIsLoadComponent()}
      </View>
    );
  }

  RenderIsLoadComponent = () => {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" style={{ height: "100%" }} />;
    } else if (!this.state.isLoading && this.state.onlyShowData.length === 0) {
      return (
        <View
          style={{
            height: HEIGHT - 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "blue" }}>No Favorites</Text>
        </View>
      );
    }
    return (
      <FlatList
        keyExtractor={(item, index) => index}
        data={this.state.onlyShowData}
        style={styles.ListContainer}
        renderItem={(item) => {
          return this.RenderListItemOfLikeData(item);
        }}
      />
    );
  };

  RenderOnlyLikeData = () => {
    for (let i = 0; i < this.state.allData.length; i++) {
      if (this.state.likeData.includes(this.state.allData[i].productid)) {
        this.setState({
          onlyShowData: this.state.onlyShowData.concat(this.state.allData[i]),
        });
      }
    }
    console.log(this.state.likeData);
  };

  FetchAllData = () => {
    fetch("http://onstore.onlinewebshop.net/Product/productfile.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pricesort: "3",
        category: "all",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ allData: json });
        this.setState({ isLoading: false });
        this.RenderOnlyLikeData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  RenderHeaderComponent = () => {
    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 7 }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.openDrawer();
          }}
        >
          <MaterialCommunityIcons
            name="menu"
            style={{ fontSize: 25, marginLeft: 10 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 20 }}>
          Favorite Phone
        </Text>
      </View>
    );
  };

  RenderListItemOfLikeData = (item) => {
    return (
      <View style={styles.ListItemContainer}>
        <Image
          source={{ uri: item.item.productimage }}
          style={styles.ImageStyling}
        />
        <View style={{ justifyContent: "center", width: "50%" }}>
          <Text style={styles.ProductNameStyling}>
            {item.item.productcompany + " " + item.item.productmodel}
          </Text>
          <Text style={{ color: "#aaa", fontSize: 12 }}>
            by {item.item.productcompany}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 20,
                paddingLeft: 10,
                paddingRight: 10,
                borderColor: "blue",
              }}
            >
              <Text style={{ color: "blue" }}>View Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                this.setState({
                  onlyShowData: this.state.onlyShowData.filter(
                    (ind) => ind.productid !== item.item.productid
                  ),
                });
                let alreadyLiked = await AsyncStorage.getItem("qlikedPhone");
                let refurbish = alreadyLiked.split(",");
                console.log(item.item.productid);
                const filteredPeople = refurbish.filter(
                  (ind) => item.item.productid !== ind
                );
                await AsyncStorage.setItem(
                  "qlikedPhone",
                  filteredPeople.toString()
                );

                console.log(await AsyncStorage.getItem("qlikedPhone"));
              }}
            >
              <Text style={{ color: "red" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
}

export default LikedPhoneScreen;

const styles = StyleSheet.create({
  ListContainer: {
    marginTop: 20,
  },
  ListItemContainer: {
    flexDirection: "row",
    width: WIDTH - 20,
    height: HEIGHT / 4 - 10,
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    elevation: 5,
    borderRadius: 8,
  },
  ImageStyling: {
    width: WIDTH / 3,
    height: "80%",
    resizeMode: "center",
    marginTop: "5%",
  },
});
