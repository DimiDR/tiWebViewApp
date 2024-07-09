import React from "react";
import { SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import { WebView } from "react-native-webview";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          // uri: "https://bestellen.primavera-pizza-wickede.de/default/menus",
          uri: "https://dimitrir14.sg-host.com/loc1/menus",
        }}
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  webview: {
    flex: 1,
  },
});

export default App;
