import { StyleSheet, Text, View, FlatList } from "react-native";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";

export default function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!!!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(place) => place.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
