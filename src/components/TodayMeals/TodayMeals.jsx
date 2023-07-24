import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ItemMeal from "../ItemMeal/ItemMeal";

function TodayMeals({ foods, onCompleteAddRemove }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comidas</Text>

      <ScrollView style={styles.content}>
        {foods?.map((meal, index) => (
          <ItemMeal
            key={`today-${meal.name}-${index}`}
            {...meal}
            onCompleteAddRemove={onCompleteAddRemove}
            itemPosition={index}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default TodayMeals;

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 24 },
  title: { fontSize: 18 },
  content: { marginVertical: 16 },
});
