import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Screen01 = () => {
  const navigation = useNavigation();
  const [isPassword, setIsPassword] = useState(false);
  const users = [
    {
      email: "abc@gmail.com",
      password: "12345",
    },
    {
      email: "abc1@gmail.com",
      password: "12345",
    },
    {
      email: "abc2@gmail.com",
      password: "12345",
    },
    {
      email: "abc3@gmail.com",
      password: "12345",
    },
    {
      email: "abc4@gmail.com",
      password: "12345",
    },
  ];

  const [submit, setSubmit] = useState({
    email: "abc@gmail.com",
    password: "",
  });

  const handleSubmit = () => {
    if (submit.email === "" || submit.password === "") {
      alert("Please fill all the fields");
    } else {
      const user = users.find((user) => user.email === submit.email && user.password === submit.password);
      if (user) {
        navigation.navigate("Screen02");
      } else {
        alert("Invalid email or password");
      }
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView>
        <View style={{ marginTop: 70, alignItems: "center", paddingHorizontal: 40 }}>
          <Image source={require("../assets/Data/icon.png")} />
          <Text style={{ marginTop: 16, fontSize: 28, fontWeight: 700 }}>Hello Again!</Text>
          <Text style={{ marginTop: 6, fontSize: 12, color: "#c6c9d1" }}>Log into your account</Text>

          <View style={{ marginTop: 30, gap: 16, width: "100%" }}>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
                width: "100%",
                height: 40,
                borderRadius: 10,
                borderColor: "#c6c9d1",
                borderWidth: 1,
              }}
            >
              <MaterialCommunityIcons name="email-outline" size={24} color="black" />
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={"#c6c9d1"}
                style={{
                  flex: 1,
                  height: "100%",
                  paddingLeft: 10,
                  outline: "none",
                }}
                value={submit.email}
                onChangeText={(text) => setSubmit({ ...submit, email: text })}
              />
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                width: "100%",
                height: 40,
                borderRadius: 10,
                borderColor: "#c6c9d1",
                borderWidth: 1,
              }}
            >
              <Image source={require("../assets/Data/lock.png")} />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={"#c6c9d1"}
                style={{
                  flex: 1,
                  height: "100%",
                  paddingLeft: 10,
                  outline: "none",
                }}
                onChangeText={(text) => setSubmit({ ...submit, password: text })}
                secureTextEntry={!isPassword}
              />
              <TouchableOpacity onPress={() => setIsPassword(!isPassword)}>
                <Image source={require("../assets/Data/eye.png")} />
              </TouchableOpacity>
            </Pressable>
            <TouchableOpacity>
              <Text style={{ color: "#519ca6", textAlign: "right" }}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              marginTop: 20,
              height: 40,
              width: "100%",
              backgroundColor: "#519ca6",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleSubmit}
          >
            <Text>Continute</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 30, flexDirection: "row", alignItems: "center", width: "100%" }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "#c6c9d1" }}></View>
            <Text style={{ marginHorizontal: 10, color: "#ccc" }}>or</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#c6c9d1" }}></View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 16, gap: 8 }}>
            <TouchableOpacity>
              <Image source={require("../assets/Data/google.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../assets/Data/face.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../assets/Data/apple.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Screen01;
