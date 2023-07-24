import { Button, Icon, Input } from "@rneui/themed";
import { React, useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, StatusBar, TextInput } from "react-native";
import useFoodStorage from "../../hooks/useFoodStorage";

function AddFoodModal({ onClose, visible }) {
  const [calories, setCalories] = useState("");
  const [name, setName] = useState("");
  const [portion, setPortion] = useState("");
  const { onSaveFood } = useFoodStorage();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setCalories("");
    setName("");
    setPortion("");
  }, [visible]);

  const handleAddPress = async () => {
    try {
      await onSaveFood({ calories, name, portion });
      onClose(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal visible={visible} onRequestClose={() => onClose()} transparent animationType="slide">
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button
              icon={<Icon name="close" size={30} color="#000" />}
              onPress={() => onClose()}
              type="clear"
            />
          </View>

          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                keyboardType="default" // Mostrar el teclado numérico
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
                cursorColor="#191b27"
                
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Nombre</Text>
            </View>
          </View>

          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                keyboardType="numeric" // Mostrar el teclado numérico
                value={portion}
                onChangeText={(text) => {
                  setPortion(text);
                }}
                cursorColor="#191b27"
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Porcion (gr)</Text>
            </View>
          </View>

          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                keyboardType="numeric" // Mostrar el teclado numérico
                value={calories}
                onChangeText={(text) => {
                  setCalories(text);
                }}
                cursorColor="#191b27"
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Calorias (Cal)</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Agregar"
              titleStyle={{ color: "#fff" }}
              icon={<Icon name="add" color="#fff" />}
              color="#191b27"
              radius="lg"
              disabled={calories.trim() === "" || name.trim() === "" || portion.trim() === ""}
              disabledTitleStyle={{ color: "#505050" }}
              onPress={handleAddPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AddFoodModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",

  },
  content: {
    width: "80%",
    backgroundColor: "#34e9b4",

    padding: 18,
    borderRadius: 20,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },
  closeContainer: {
    alignItems: "flex-end",
  },
  formItem: { flexDirection: "row", alignItems: "center", paddingVertical: 15 },
  inputContainer: { flex: 3 },
  legendContainer: { flex: 2 },
  legend: {
    fontWeight: "500",
    fontSize: 18,
    color: "#000",
  },
  buttonContainer: {
    alignItems: "flex-end",
    paddingVertical: 20,
  },
  input: {
    color: "#000",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginRight: 10,
    fontSize: 20,
    fontWeight: "500",
    
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});
