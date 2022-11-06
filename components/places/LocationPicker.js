import { StyleSheet, Alert, View, Image ,Text} from "react-native";
import { useState } from "react";
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../../components/ui/OutlinedButton";
import { getMapPreview } from "../../util/location";

export default function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState();

  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      const permissionResponse = await requestPermission();
      if (!permissionResponse.granted) {
        Alert.alert(
          "Insufficient Permissions!",
          "You need to grant location permission to use this app."
        );
        return false;
      }
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      const location = await getCurrentPositionAsync({
        accuracy: LocationAccuracy.Highest,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      console.log(getMapPreview(pickedLocation.lat, pickedLocation.lng))
    } catch (error) {
      Alert.alert("Something wrong", "Failed to get location. Please try again.");
    }
  }

  function pickOnMaphandler() {}

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate user
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMaphandler}>
          Pick On Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
},
actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
},
  image: {
      width: "100%",
      height: "100%",
      borderRadius: 4,
  },
});
