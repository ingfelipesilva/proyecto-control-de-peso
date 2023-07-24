import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

function TodayCalories({ total = 0, consumed = 0, remaining = 0, percentage = 0 }) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <CircularProgress
          value={percentage}
          valueSuffix="%"
          activeStrokeColor="#39d3a6"
          circleBackgroundColor="#1d2331"
        />
      </View>
      <View style={styles.rigthContainer}>
        <Text style={styles.today}>Hoy</Text>
        <View style={styles.rigthItem}>
          <Text style={styles.rightItemLegend}>Total</Text>
          <Text style={styles.rightItemValue}>{total}</Text>
        </View>
        <View style={styles.rigthItem}>
          <Text style={styles.rightItemLegend}>Consumidas</Text>
          <Text style={styles.rightItemValue}>{consumed}</Text>
        </View>
        <View style={styles.rigthItem}>
          <Text style={styles.rightItemLegend}>Restantes</Text>
          <Text style={styles.rightItemValue}>{remaining}</Text>
        </View>
      </View>
    </View>
  );
}

export default TodayCalories;

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  leftContainer: {
    flex: 1,
  },
  rigthContainer: { flex: 1, justifyContent: "center" },
  rigthItem: { flexDirection: "row", marginBottom: 10 },
  rightItemLegend: { flex: 1, color: "white" },
  rightItemValue: { flex: 1, textAlign: "right", color: "white" },
  today: { fontSize: 20, fontWeight: "500", marginBottom: 14, color: "#fff" },
});
