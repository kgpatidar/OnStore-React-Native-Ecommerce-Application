import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Header } from "native-base";
import { View } from "react-native-animatable";

import HeaderComponent from "../Component/HomeComponent/HeaderComponent";
import BannerComponent from "../Component/HomeComponent/BannerComponent";
import CategoryComponent from "../Component/HomeComponent/CategoryComponent";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.headerStyle}>
          <HeaderComponent
            callBackDrawerOpening={() => {
              this.props.navigation.openDrawer();
            }}
          />
        </Header>
        <ScrollView>
          <View>
            <View>
              <TouchableOpacity>
                <BannerComponent />
              </TouchableOpacity>
            </View>
            <View>
              <CategoryComponent NavigateToProduct={this.NavigationToProduct} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  NavigationToProduct = () => {
    this.props.navigation.navigate("Product");
  };
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerStyle: {
    backgroundColor: "#fff",
    elevation: 10,
  },
});
