import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";

const Tab = createBottomTabNavigator();

const Screen02 = () => {
  const navigation = useNavigation();
  const [focus, setFocus] = useState("smart");
  const [selectedOption, setSelectedOption] = useState("Best Sales");
  const [product, setProduct] = useState([]);

  const CategoryItem = ({ image, backgroundColor, type }) => {
    return (
      <Pressable
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: `${backgroundColor}`,
          borderRadius: 8,
          height: 100,
          borderWidth: 2,
          borderColor: focus === type ? "#a59ac6" : "transparent",
        }}
        onPress={() => setFocus(type)}
      >
        <Image source={image} />
      </Pressable>
    );
  };

  const OptionItem = ({ title }) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          height: 26,
          borderRadius: 10,
          backgroundColor: selectedOption === title ? "#ebfdff" : "transparent",
        }}
        onPress={() => setSelectedOption(title)}
      >
        <Text style={{ color: selectedOption === title ? "#42b7c6" : "black" }}>{title}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://6459bfa395624ceb21eebb61.mockapi.io/Tuan7/v1/products");
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const ProductItem = ({ item }) => {
    console.log(item.image);
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderWidth: 1,
          borderColor: "#dce1eb",
          borderRadius: 10,
        }}
      >
        <Image source={{ uri: item.image }} style={{ width: 60, height: 60 }} resizeMode="contain" />
        <View style={{ rowGap: 12, marginLeft: 14 }}>
          <Text style={{ fontSize: 16, fontWeight: 700, marginTop: 10 }}>{item.title}</Text>
          <Image source={require("../assets/Data/ratting.png")} />
        </View>
        <View style={{ marginLeft: "auto", rowGap: 4 }}>
          <TouchableOpacity>
            <Image
              source={require("../assets/Data/plus.png")}
              style={{ width: 20, height: 20, marginLeft: "auto" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.price}</Text>
        </View>
      </View>
    );
  };

  const renderProducts = () => {
    const selectedCategory = product.find((item) => item[focus]);
    if (!selectedCategory) return null;

    return selectedCategory[focus].map((item) => <ProductItem key={item.id} item={item} />);
  };

  const MainScreen = () => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView>
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}
              >
                <Text style={{ fontSize: 20, fontWeight: 600 }}>{"<"}</Text>
                <Text style={{ fontSize: 22, fontWeight: 700 }}>ELectronics</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center", columnGap: 6 }}>
                <TouchableOpacity>
                  <AntDesign name="shoppingcart" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/Data/avatar.png")}
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: "row", columnGap: 14, marginTop: 24, height: 36 }}>
              <Pressable
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#f3f4f6",
                  paddingLeft: 10,
                }}
              >
                <Image source={require("../assets/Data/search.png")} style={{ height: 16, width: 16 }} />
                <TextInput
                  placeholder="Search"
                  placeholderTextColor={"#c6c9d1"}
                  style={{
                    width: "100%",
                    height: "100%",
                    paddingLeft: 10,
                    outline: "none",
                  }}
                />
              </Pressable>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#f3f4f6",
                  padding: 10,
                }}
              >
                <MaterialIcons name="filter-list" size={16} color="black" />
              </TouchableOpacity>
            </View>

            <View
              style={{ marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 18, fontWeight: 700 }}>Categories</Text>
              <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", columnGap: 6, marginRight: 14 }}>
                <Text style={{ color: "#c6c9d1" }}>See all</Text>
                <Text style={{ color: "#ccc" }}>{">"}</Text>
              </TouchableOpacity>
            </View>

            {/* Categories */}
            <View style={{ flexDirection: "row", alignItems: "center", columnGap: 20, marginTop: 10 }}>
              <CategoryItem image={require("../assets/Data/smart.png")} backgroundColor="#dbcaf6" type="smart" />
              <CategoryItem image={require("../assets/Data/ipad.png")} backgroundColor="#c5d1f7" type="ipad" />
              <CategoryItem image={require("../assets/Data/macbook.png")} backgroundColor="#f8d8bf" type="macbook" />
            </View>

            {/* Option */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
              <OptionItem title="Best Sales" />
              <OptionItem title="Best Matched" />
              <OptionItem title="Popular" />
            </View>

            {/* Product */}
            <View style={{ marginTop: 20, rowGap: 14 }}>{renderProducts()}</View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Search") {
            iconName = "search-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Favorite") {
            iconName = "hearto";
            return (
              <View>
                <AntDesign name={iconName} size={size} color={color} />
                <Text
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -14,
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: 50,
                    paddingHorizontal: 4,
                    fontSize: 10,
                  }}
                >
                  99+
                </Text>
              </View>
            );
          } else if (route.name === "Inbox") {
            iconName = "message1";
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === "Account") {
            iconName = "user";
            return <AntDesign name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#00bbdf",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { paddingTop: 10, height: 60, paddingBottom: 10, borderBottomWidth: 0 },
        tabBarLabelStyle: { fontSize: 10, fontWeight: 700 },
      })}
    >
      <Tab.Screen name="Home" component={MainScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={MainScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Favorite" component={MainScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Inbox" component={MainScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Account" component={MainScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default Screen02;
