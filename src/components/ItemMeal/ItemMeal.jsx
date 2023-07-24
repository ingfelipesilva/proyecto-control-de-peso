import { Button, Icon } from "@rneui/base";
import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import useFoodStorage from "../../hooks/useFoodStorage";

function ItemMeal({ calories, portion,name, isAbleToAdd, onCompleteAddRemove, itemPosition }) {
  const { onSaveTodayFood, onDeleteTodayFood } = useFoodStorage();

  const handleIconPress = async () => {
    try {
      if (isAbleToAdd) {
        await onSaveTodayFood({ calories, portion, name });
        Alert.alert("¡Excelente!", "Agregaste un nuevo Artículo.");

      } else {
        await onDeleteTodayFood(itemPosition ?? -1);
        Alert.alert("¡Excelente!", "Eliminaste un Artículo.");
      }
      onCompleteAddRemove?.();
    } catch (error) {
      Alert.alert("¡Lo Sentimos!", "No pudimos agregar el artículo.");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rigthContainer}>
        <Button
          icon={<Icon name={isAbleToAdd ? "add-circle-outline" : "close"} color="#000" size={30}/>}
          type="clear"
          onPress={handleIconPress}
        />
        <Text style={styles.calories}>{calories} Calorias</Text>
      </View>
    </View>
  );
}

export default ItemMeal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#39d3a6",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    height: 110,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rigthContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  name: { fontSize: 25, fontWeight: "600", color:"#000" },
  portion: { fontSize: 18, color: "#000", fontWeight: "500" },
  calories: { fontSize: 18,fontWeight:"500" },
});
