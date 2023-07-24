import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, Icon } from "@rneui/themed";

const staticInfo = {
  name: "Felipe Silva",
  uri: "https://media.licdn.com/dms/image/D4E03AQHbjizSiQZZeQ/profile-displayphoto-shrink_800_800/0/1683630071867?e=1695254400&v=beta&t=r1XUyjpP82VUaTx6HvuQpWTg4NDvYXRl5BgOW1eScXk",
};

function Header() {
  const { canGoBack, goBack } = useNavigation();

  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View style={styles.arrowContainer}>
          <Button
            icon={<Icon name="arrow-back" size={24} color="white" />}
            type="clear"
            onPress={() => goBack()}
          />
        </View>
      ) : undefined}

      <View style={styles.leftContainer}>
        <Text style={styles.name}>{`Hola! ${staticInfo.name}`}</Text>
        <Text style={styles.subtitle}>Cumple tus metas.</Text>
      </View>
      <View style={styles.rigthContainer}>
        <Image source={{ uri: staticInfo.uri }} style={styles.profileImage} />
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: { flexDirection: "row", paddingVertical: 20 },
  name: { fontWeight: "bold", fontSize: 18, color: "#fff" },
  subtitle: {
    fontSize: 16,
    color: "#808080",
  },
  leftContainer: { flex: 2, justifyContent: "center" },
  rigthContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor:"#39d3a6",
    borderWidth:2
  },
  arrowContainer: {
    marginLeft: -15,
  },
});
