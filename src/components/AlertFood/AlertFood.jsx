import { Alert, StyleSheet } from "react-native";

function AlertFood() {
  return Alert.alert(
    "Título del Alert",
    "Mensaje del Alert",

    {
      titleStyle: styles.title,
      messageStyle: styles.message,
    }
  );
}

export default AlertFood;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
  message: {
    fontSize: 16,
    color: "green",
  },
});
