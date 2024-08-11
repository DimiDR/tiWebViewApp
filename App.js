import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, View, Text, Image, TouchableOpacity, BackHandler, RefreshControl } from "react-native";
import { WebView } from "react-native-webview";
import styles from './styles/styles'; // Import styles

const DATA_URL = 'https://app-version.jandiweb.de/jandi-app/restaurants.json'; // Replace with your JSON URL
const COMPANY_LOGO_URL = 'https://app-version.jandiweb.de/jandi-app/Logo Jandiweb.png'; // Replace with your company logo URL
const COMPANY_WEBSITE_URL = 'https://jandiweb.de/gastronomie/'; // URL to open when header is clicked

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    setRefreshing(true);
    const url = `${DATA_URL}?timestamp=${new Date().getTime()}`; // Cache-busting URL
    fetch(url)
      .then(response => response.json())
      .then(data => {
        //console.log('Fetched data:', data); // Debugging: log fetched data
        setRestaurants(data.restaurants);
        setRefreshing(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (selectedUrl) {
        setSelectedUrl(null);
        return true; // Prevent default back action
      }
      return false; // Allow default back action
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [selectedUrl]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => setSelectedUrl(item.url)}>
      <Image source={{ uri: item.headerImage }} style={styles.headerImage} />
      <View style={styles.itemContent}>
        <Image source={{ uri: item.logoImage }} style={styles.logoImage} />
        <View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subText}>{item.tel}</Text>
          <Text style={styles.subText}>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (selectedUrl) {
    return (
      <SafeAreaView style={styles.container}>
        <WebView source={{ uri: selectedUrl }} style={styles.webview} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => setSelectedUrl(COMPANY_WEBSITE_URL)}>
        <Image source={{ uri: COMPANY_LOGO_URL }} style={styles.companyLogo} />
        <Text style={styles.headerText}>Jandi Restaurants</Text>
      </TouchableOpacity>
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No restaurants available</Text>}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchData}
          />
        }
      />
    </SafeAreaView>
  );
};

export default App;