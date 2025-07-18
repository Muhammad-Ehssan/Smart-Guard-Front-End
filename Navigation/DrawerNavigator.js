// ./navigation/DrawerNavigator.js

import React, { useState, useEffect, useRef, useContext } from "react";
import { View } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import { MainStackNavigator } from "./Navigotr";
import LiveStreaming from "../Components/LiveStreaming";
import Speech from "../Components/voice";
import Try from "../Components/try";
import Sir from "../Components/siren";
import cam1 from "../Components/Selector";
import AppContext from "../Components/AppContext";
import { createStackNavigator } from "@react-navigation/stack";
import Logout from "../Components/Logout";
import Call from "../Components/Call";
import Notification_Subscribe from "../Components/Notification_Subscribe";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import forget_Password from "../Components/forget_Password";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert("Link to help")} />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  const myContext = useContext(AppContext);
  if (myContext.issignedin) {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={MainStackNavigator}
          options={{
            headerTransparent: true,
            headerRight: () => <View></View>,
            drawerIcon: ({ focused, size }) => (
              <Entypo name="home" size={24} color="black" />
            ),
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="New Person"
          component={cam1}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons name="person-add" size={24} color="black" />
            ),
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Live Streaming"
          component={LiveStreaming}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons name="cctv" size={24} color="black" />
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="Search Video"
          component={Speech}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="movie-search"
                size={24}
                color="black"
              />
            ),
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Siren"
          component={Sir}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Entypo name="bell" size={24} color="black" />
            ),
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Emergency Call"
          component={Call}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons name="call" size={24} color="black" />
            ),
            headerShown: false,
          }}
        />

        <Drawer.Screen
          name="Settings"
          component={Try}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons name="settings" size={24} color="black" />
            ),
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons name="logout" size={24} color="black" />
            ),
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Subscribe"
          component={Notification_Subscribe}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Entypo name="mail" size={24} color="black" />
            ),
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forget Password"
          component={forget_Password}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
};

export default DrawerNavigator;
