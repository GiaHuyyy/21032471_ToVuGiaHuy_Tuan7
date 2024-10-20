import { Image, Pressable, ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Screen01 = () => {
  const navigation = useNavigation();
  const [isPassword, setIsPassword] = useState(false);
  const [submit, setSubmit] = useState({
    email: "abc@gmail.com",
    password: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://6459bfa395624ceb21eebb61.mockapi.io/Tuan7/v1/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

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
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <View style={styles.container}>
          <Image source={require("../assets/Data/icon.png")} />
          <Text style={styles.title}>Hello Again!</Text>
          <Text style={styles.subtitle}>Log into your account</Text>

          <View style={styles.inputContainer}>
            <Pressable style={styles.inputBox}>
              <MaterialCommunityIcons name="email-outline" size={24} color="black" />
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={"#c6c9d1"}
                style={[styles.textInput, { outline: "none" }]}
                value={submit.email}
                onChangeText={(text) => setSubmit({ ...submit, email: text })}
              />
            </Pressable>
            <Pressable style={styles.inputBox}>
              <Image source={require("../assets/Data/lock.png")} />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={"#c6c9d1"}
                style={[styles.textInput, { outline: "none" }]}
                onChangeText={(text) => setSubmit({ ...submit, password: text })}
                secureTextEntry={!isPassword}
              />
              <TouchableOpacity onPress={() => setIsPassword(!isPassword)}>
                <Image source={require("../assets/Data/eye.png")} />
              </TouchableOpacity>
            </Pressable>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider}></View>
            <Text style={styles.orText}>or</Text>
            <View style={styles.divider}></View>
          </View>

          <View style={styles.socialContainer}>
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

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#fff",
    flex: 1,
  },
  container: {
    marginTop: 70,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  title: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    color: "#c6c9d1",
  },
  inputContainer: {
    marginTop: 30,
    gap: 16,
    width: "100%",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    width: "100%",
    height: 40,
    borderRadius: 10,
    borderColor: "#c6c9d1",
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    height: "100%",
    paddingLeft: 10,
  },
  forgotPassword: {
    color: "#519ca6",
    textAlign: "right",
  },
  continueButton: {
    marginTop: 20,
    height: 40,
    width: "100%",
    backgroundColor: "#00bdd6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  dividerContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#c6c9d1",
  },
  orText: {
    marginHorizontal: 10,
    color: "#ccc",
  },
  socialContainer: {
    flexDirection: "row",
    marginTop: 16,
    gap: 8,
  },
});

export default Screen01;
