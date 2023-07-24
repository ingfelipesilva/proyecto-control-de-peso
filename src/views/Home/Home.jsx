import { React, useCallback, useState } from "react";
import { View, Text, StyleSheet, Alert, StatusBar, } from "react-native";
import Header from "../../components/Header/Header";
import { Button, Icon } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useFoodStorage from "../../hooks/useFoodStorage";
import TodayCalories from "../../components/TodayCalories/TodayCalories";
import TodayMeals from "../../components/TodayMeals/TodayMeals";

function Home() {
  const { navigate } = useNavigation();
  function handleAddCaloriesPress() {
    navigate("AddFood");
  }
  const { onGetTodayFood } = useFoodStorage();
  const [todayFood, setTodayFood] = useState([]);
  const [todayStadistics, setTodayStadistics] = useState({
    consumed: 0,
    percentage: 0,
    remaining: 0,
    total: totalCaloriesPerDay,
  });
  const totalCaloriesPerDay = 3000;

  const calculateTodayStadistics = (meals = 0) => {
    try {
      const caloriesConsumed = meals.reduce((acum, curr) => acum + Number(curr.calories), 0);
      const remainingCalories = totalCaloriesPerDay - caloriesConsumed;
      const percentage = (caloriesConsumed / totalCaloriesPerDay) * 100;

      setTodayStadistics({
        total: totalCaloriesPerDay,
        consumed: caloriesConsumed,
        percentage,
        remaining: remainingCalories,
      });
    } catch (error) {
      Alert.alert("Bienvenido","Añade artículos para empezar!!!");
    }
  };

  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = await onGetTodayFood();
      setTodayFood(todayFoodResponse);
      calculateTodayStadistics(todayFoodResponse);
    } catch (error) {
      setTodayFood([]);
      console.log(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodayFood().catch(null);
    }, [loadTodayFood])
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header />
      <View style={styles.caloriesContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.caloriesLegend}>Calorias</Text>
        </View>
        <View style={styles.rigthContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color="#000" size={30} />}
            radius={"lg"}
            color={"#39d3a6"}
            onPress={handleAddCaloriesPress}
          />
        </View>
      </View>
      <TodayCalories {...todayStadistics} />
      <TodayMeals foods={todayFood} onCompleteAddRemove={loadTodayFood} />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  caloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  leftContainer: { flex: 1, justifyContent: "center" },
  rigthContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  caloriesLegend: {
    fontSize: 25,
    color: "white",
  },
});
