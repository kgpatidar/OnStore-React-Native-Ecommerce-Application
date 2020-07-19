import React, { Component } from "react";
import { Text, StyleSheet, StatusBar, Dimensions } from "react-native";
import { View } from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

class AddressComponent extends Component {
  componentDidMount() {
    StatusBar.setBackgroundColor("#0996AE");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.HeadingContainer}>
          <MaterialIcons
            name="location-on"
            style={styles.LocationIconStyling}
          />
          <Text
            style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
          >
            Your Location
          </Text>
        </View>
        <View style={styles.ContentContainer}>
          <ScrollView>
            <Text>
              Home :{" "}
              <Text style={{ fontWeight: "bold" }}>{this.props.data.home}</Text>
              ,
            </Text>
            <Text>City : {this.props.data.city},</Text>
            <Text>ZipCode : {this.props.data.zipcode},</Text>
            <Text>{this.props.data.state}</Text>
          </ScrollView>
          <TouchableOpacity
            onPress={this.ChangeAddress}
            style={{
              alignItems: "flex-end",
              marginRight: 20,
              marginBottom: 5,
            }}
          >
            <Text style={{ color: "blue" }}>CHANGE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  ChangeAddress = () => {
    alert("N/A Now!");
  };
}

function mapStateToProps(state) {
  return { data: state.userDetail };
}

export default connect(mapStateToProps, null)(AddressComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: HEIGHT * 0.2,
    flexDirection: "row",
    marginLeft: WIDTH * 0.1,
    marginRight: WIDTH * 0.1,
    marginTop: 10,
    elevation: 10,
  },
  HeadingContainer: {
    flex: 1,
    height: HEIGHT * 0.2,
    width: WIDTH * 0.2,
    backgroundColor: "#00BCD4",
  },
  ContentContainer: {
    height: HEIGHT * 0.2,
    width: WIDTH * 0.6,
    paddingLeft: 20,
    paddingTop: 20,
  },
  LocationIconStyling: {
    fontSize: 40,
    alignSelf: "center",
    color: "#fff",
    marginTop: HEIGHT * 0.05,
  },
});
