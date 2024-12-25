import RoutineList from "@/components/RoutineList";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useRouter } from "expo-router";

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, List } from "react-native-paper";
import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function Tab() {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quick Start</Text>
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          <FontAwesome6 size={24} name="plus" color={"black"}></FontAwesome6>{" "}
          Start Empty Workout
        </Text>
      </TouchableOpacity> */}

      <Button
        icon="prescription"
        mode="contained"
        style={styles.button}
        labelStyle={{ fontSize: 18, height: 18, color: '#fff' }}
        onPress={() => console.log("Pressed")}
      >
        Start Empty Workout
      </Button>

      <Text style={styles.subHeader}>Routines</Text>

      <View style={styles.routineRow}>
        <Button
          icon="prescription"
          mode="contained"
          style={styles.rowButtonStyle}
          labelStyle={{ fontSize: 18, height: 18}}
          onPress={() => router.push("/createRoutine")}
        >
          New Routine
        </Button>

        <Button
          icon="magnify"
          mode="contained"
          style={styles.rowButtonStyle}
          labelStyle={{ fontSize: 18, height: 18 }}
          onPress={() => console.log("Pressed")}
        >
          Explore
        </Button>
      </View>
      
      {/* TODO: Enable when folder structure added in backend
      <View style={styles.routineList}>
      <RoutineList/>
      </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 5,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  header: {
    fontSize: 25,
  },
  subHeader: {
    fontSize: 22,
  },
  button: {
    height: 50,
    width: "98%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
  },
  rowButtonStyle: {
    height: 50,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  routineRow: {
    flex: 1,
    flexDirection: 'row',
    width: "98%",
    marginRight: 10,
    height: 80,
    minHeight: 35,
    justifyContent: 'space-between'
  },
  routineList: {
    flex: 15,
    width: "100%",
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start'
    
  }
});
