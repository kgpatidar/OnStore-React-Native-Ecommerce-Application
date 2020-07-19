import React, { Component } from "react";
import { Text, StyleSheet, Dimensions, Image, FlatList } from "react-native";
import { View } from "react-native-animatable";
import { Icon, Right } from "native-base";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import CategoryData from "../../Constant/CategoryData";
import { connect } from "react-redux";

const WIDTH = Dimensions.get("window").width;

class CategotyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryList: CategoryData,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.TextCategoryStyle}>Choose Category</Text>
        <Text style={{ textAlign: "center", fontSize: 13, marginBottom: 10 }}>
          Click to Browse Product
        </Text>
        {/* <View style={{ flexDirection: "row", flex: 1 }}> */}
        <FlatList
          numColumns="4"
          data={this.state.categoryList}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          // horizontal={true}
          renderItem={(item, index) => {
            return this.renderCategoryItem(item, index);
          }}
        />
        {/* </View> */}
        <Text style={{ textAlign: "center", fontSize: 10, marginBottom: 10 }}>
          Swipe Down For More
        </Text>
      </View>
    );
  }

  renderCategoryItem = (item, index) => {
    return (
      <TouchableOpacity
        style={[
          styles.CategoryItemCover,
          {
            backgroundColor: "#fff",
            // parseInt(item.item.id) % 2 === 0 ? "#99ddff" : "#cc99ff",
          },
        ]}
        onPress={() => {
          this.props.SetCategoryToRedux(item.item.value);
          this.props.NavigateToProduct();
        }}
      >
        <Image
          style={{
            height: "80%",
            width: "80%",
            alignSelf: "center",
            resizeMode: "center",
          }}
          source={{ uri: item.item.uri }}
        ></Image>
        {/* <Text style={styles.CategoryTextStyle}>{item.item.value}</Text> */}
      </TouchableOpacity>
    );
  };
}

const mapDispatchToProps = (dispatch) => ({
  SetCategoryToRedux: (cat) =>
    dispatch({
      type: "CHANGE_CATEGORY",
      payload: cat,
    }),
});

export default connect(null, mapDispatchToProps)(CategotyComponent);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  TextCategoryStyle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  CategoryTextStyle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
  },
  CategoryItemCover: {
    height: 100,
    borderRadius: 10,
    borderColor: "#000",
    // borderWidth: 1,
    width: WIDTH / 4 - 15,
    shadowColor: "#000",
    marginRight: 10,
    justifyContent: "center",
    elevation: 5,
    marginBottom: 10,
  },
});
