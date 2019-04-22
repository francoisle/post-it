import { CameraRoll, PermissionsAndroid } from "react-native";

export function hasWriteExternalStoragePermission() {
  console.log("2");
  try {
    return PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
  } catch (e) {
    console.warn("Error while checking for writeExternalStoragePermission", e);
    return false;
  }
}

export function askWriteExternalStoragePermission() {
  console.log("ask for write permission");
  try {
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Permission to save pictures",
        message: "Your authorization is necessary to save the pictures",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "Proceed"
      }
    );
  } catch (e) {
    console.warn("Error while asking for writeExternalStoragePermission", e);
    return false;
  }
}

export function savePicture(imageUri) {
  CameraRoll.saveToCameraRoll(imageUri, "photo");
}
