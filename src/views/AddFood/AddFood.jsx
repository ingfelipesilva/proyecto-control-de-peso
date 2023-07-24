import { React, useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import Header from "../../components/Header/Header";
import { Button, Icon, Input } from "@rneui/themed";
import AddFoodModal from "../../components/AddFoodModal/AddFoodModal";
import useFoodStorage from "../../hooks/useFoodStorage";
import ItemMeal from "../../components/ItemMeal/ItemMeal";
import { useEffect } from "react";

function AddFood() {
  const [visible, setIsVisible] = useState(false);
  const [foods, setFoods] = useState([]);

  const { onGetFoods } = useFoodStorage();

  const [search, setSearch] = useState("");

  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFoods();
      setFoods(foodsResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFoods().catch(null);
  }, []);

  const handleModalClose = async (shouldUpdate) => {
    if (shouldUpdate) {
      Alert.alert("¡Excelente!", "Agregaste un nuevo Artículo.");

      try {
        const foodsResponse = await onGetFoods();
        loadFoods();
      } catch (error) {
        console.log(error);
      }
    }
    setIsVisible(false);
  };

  const handleSearchPress = async () => {
    try {
      const result = await onGetFoods();
      setFoods(
        result.filter((item) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      );
    } catch (error) {
      console.log(error);
      setFoods([]);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.addFoodLegend}>Agregar artículos</Text>
        </View>
        <View style={styles.addFoodButtonContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color="#000" size={30}/>}
            color="#39d3a6"
            radius="lg"
            onPress={() => setIsVisible(true)}
            
          />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Manzanas, papas, soda..."
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={styles.input}
            cursorColor="#39d3a6"
          />
        </View>
        <Button
          title="Buscar"
          color="#39d3a6"
          titleStyle={styles.searchButtonTitle}
          radius="lg"
          onPress={handleSearchPress}
          
        />
      </View>
      <ScrollView style={styles.content}>
        {foods?.map((meal, index) => (
          <ItemMeal key={`${meal.name}-${index}`} {...meal} isAbleToAdd />
        ))}
      </ScrollView>
      <AddFoodModal visible={visible} onClose={handleModalClose} />
    </View>
  );
}

export default AddFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,
    backgroundColor: "#000",
  },
  legendContainer: {
    flex: 2,
  },
  addFoodButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  addFoodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  addFoodLegend: {
    fontSize: 25,
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
  },
  inputContainer: { flex: 1, marginLeft: -10 },
  searchButtonTitle: {
    color: "#000",
    fontSize: 18,
  },
  content: {},
  input: {
    color: "white",
  },
});
