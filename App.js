import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";



var app;

const firebaseConfig = {
  apiKey: "AIzaSyBZGZtKZJr6Xj8iq2NP2c-NvDa2rhb-hAU",
  authDomain: "demoapplication-1d0db.firebaseapp.com",
  projectId: "demoapplication-1d0db",
  storageBucket: "demoapplication-1d0db.appspot.com",
  messagingSenderId: "872148470051",
  appId: "1:872148470051:web:7174cff118e92fe75ea496"
};

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}



const db = app.firestore();
const auth = firebase.auth();
const dbreal = app.database(
  "https://bseb-f0d27-default-rtdb.asia-southeast1.firebasedatabase.app"
);


export default function App() {
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState();
  const [state, setState] = React.useState([]);

  const view = () => {
    var newArray = [];
    firebase
      .firestore()
      .collection("Studentsl")
      .get()
      .then((querySnapshot) => {
        console.log("total user", querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then((testing) => {
        console.log("new array", newArray);
        setState({ data: newArray });
      });
  };
  const update = () => {
    db.collection("stuedent")
      .doc("bde2FTvotGophSOuq89u")
      .update({
        name: "asdhsadhsabashdsadsa",
        rollno: 23,
      })
      .then(() => {
        console.log("Document successfully updated!");
      });
  };
  const del = () => {
    db.collection("12")
      .doc("u9KEVJHViIg6foXOoOhA")

      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const database = () => {
    db.collection("Studentsl")

      .add({
        name: name,
        number: number,

        // number: setNumber.number,
      })
      .then(() => {
        console.log("User added!");
      });
  };
  useEffect(() => {
    console.log("useEffect");
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 90,
        }}
      >
        <Text style={{ fontSize: 56, fontWeight: "bold" }}>Crud App</Text>
      </View>
      <View style={{ marginHorizontal: 19 }}>
        <ScrollView>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="name"
          />
          <TextInput
            style={styles.input}
            onChangeText={setNumber}
            value={number}
            placeholder="Number"
          />
        </ScrollView>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={asim}>
          <Text>Insert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={update}>
          <Text>Updates</Text>
        </TouchableOpacity>

        {/* <TextInput
          style={styles.input}
          onChangeText={setNumber}
          value={number}
          placeholder="Number"
        /> */}

        <TouchableOpacity style={styles.button} onPress={del}>
          <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={view}>
          <Text>View</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={state.data}
        renderItem={({ item }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 34, backgroundColor: "red", marginTop: 23 }}
            >
              {item.name}
            </Text>
            <Text
              style={{ fontSize: 34, backgroundColor: "yellow", marginTop: 23 }}
            >
              {item.number}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
