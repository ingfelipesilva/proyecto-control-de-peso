import AsyncStorage from "@react-native-async-storage/async-storage";
import isToday from "date-fns/isToday";

const MY_FOOS_KEY = "@MyFood:Key";
const MY_TODAY_FOOD_KEY = "@MyTodayFood:Key";

const useFoodStorage = () => {
  const saveInfoToStorage = async (storageKey, meal) => {
    try {
      const currentSaveFood = await AsyncStorage.getItem(storageKey);
      if (currentSaveFood !== null) {
        const currentSaveFoodParsed = JSON.parse(currentSaveFood);
        currentSaveFoodParsed.push(meal);

        await AsyncStorage.setItem(storageKey, JSON.stringify(currentSaveFoodParsed));
        return Promise.resolve();
      }

      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleSaveFood = async ({ calories, name, portion }) => {
    try {
      const result = await saveInfoToStorage(MY_FOOS_KEY, {
        calories,
        name,
        portion,
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_FOOS_KEY);
      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(parsedFoods);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleSaveTodayFood = async ({ calories, name, portion }) => {
    try {
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        calories,
        name,
        portion,
        date: new Date().toISOString(),
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetTodayFood = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);
      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(
          parsedFoods.filter((meal) => meal.date && isToday(new Date(meal.date)))
        );
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleRemoveTodayFood = async (index) => {
    try {
      const todayFood = await handleGetTodayFood();
      const filteredItem = todayFood?.filter((item, itemIndex) => {
        return itemIndex !== index;
      });
      await AsyncStorage.setItem(MY_TODAY_FOOD_KEY, JSON.stringify(filteredItem));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onGetFoods: handleGetFoods,
    onSaveTodayFood: handleSaveTodayFood,
    onGetTodayFood: handleGetTodayFood,
    onDeleteTodayFood: handleRemoveTodayFood,
  };
};

export default useFoodStorage;
