import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, FlatList, View, Text, Image, TouchableOpacity, BackHandler, RefreshControl, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/styles'; // Import styles
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for star icon

const DATA_URL = 'https://app-version.jandiweb.de/jandi-app/restaurants.json'; // Replace with your JSON URL
const COMPANY_LOGO_URL = 'https://app-version.jandiweb.de/jandi-app/Logo Jandiweb.png'; // Replace with your company logo URL
const COMPANY_WEBSITE_URL = 'https://jandiweb.de/gastronomie/'; // URL to open when header is clicked

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loadingWebView, setLoadingWebView] = useState(false); // New state for loading indicator
  const webViewRef = useRef(null); // Reference for WebView
  const [canGoBack, setCanGoBack] = useState(false); // State to track if WebView can go back
  const initialUrl = useRef(null); // Track the initial URL

  const fetchData = () => {
    setRefreshing(true);
    const url = `${DATA_URL}?timestamp=${new Date().getTime()}`; // Cache-busting URL
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setRestaurants(data.restaurants);
        setRefreshing(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setRefreshing(false);
      });
  };

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const loadShowFavorites = async () => {
    try {
      const storedShowFavorites = await AsyncStorage.getItem('showFavorites');
      if (storedShowFavorites !== null) {
        setShowFavorites(JSON.parse(storedShowFavorites));
      }
    } catch (error) {
      console.error('Error loading showFavorites state:', error);
    }
  };

  const saveShowFavorites = async (newShowFavorites) => {
    try {
      await AsyncStorage.setItem('showFavorites', JSON.stringify(newShowFavorites));
    } catch (error) {
      console.error('Error saving showFavorites state:', error);
    }
  };

  useEffect(() => {
    fetchData();
    loadFavorites();
    loadShowFavorites();
  }, []);

  const handleBackNavigation = () => {
    if (selectedUrl) {
      if (canGoBack) {
        webViewRef.current.goBack(); // Go back in WebView
      } else {
        setSelectedUrl(null); // Exit WebView and return to the app
      }
    }
  };

  useEffect(() => {
    const backAction = () => {
      handleBackNavigation();
      return true; // Prevent default back action
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [selectedUrl, canGoBack]);

  const toggleFavorite = (restaurant) => {
    let newFavorites;
    if (favorites.includes(restaurant.name)) {
      newFavorites = favorites.filter(fav => fav !== restaurant.name);
    } else {
      newFavorites = [...favorites, restaurant.name];
    }
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const toggleShowFavorites = () => {
    const newShowFavorites = !showFavorites;
    setShowFavorites(newShowFavorites);
    saveShowFavorites(newShowFavorites);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => {
      setSelectedUrl(item.url);
      setLoadingWebView(true); // Show loading indicator
    }}>
      <Image source={{ uri: item.headerImage }} style={styles.headerImage} />
      <View style={styles.itemContent}>
        <Image source={{ uri: item.logoImage }} style={styles.logoImage} />
        <View style={styles.textContent}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subText}>{item.tel}</Text>
          <Text style={styles.subText}>{item.address}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <FontAwesome name={favorites.includes(item.name) ? 'star' : 'star-o'} size={24} color="#FFD700" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (selectedUrl) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={handleBackNavigation} style={styles.headerDetail}>
          <FontAwesome name="arrow-left" size={30} color="#fff" />
          <Text style={styles.headerText}>Jandi Restaurants</Text>
        </TouchableOpacity>
        {loadingWebView && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} />
          </View>
        )}
        <WebView
          ref={webViewRef} // Set the reference
          source={{ uri: selectedUrl }}
          style={styles.webview}
          onLoadEnd={() => setLoadingWebView(false)}
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack); // Update state based on navigation state
            if (initialUrl.current === null) {
              initialUrl.current = navState.url; // Set the initial URL when it first loads
            }
          }}
        />
      </SafeAreaView>
    );
  }

  const filteredRestaurants = showFavorites
    ? restaurants.filter(restaurant => favorites.includes(restaurant.name))
    : restaurants;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleShowFavorites}>
        <Image source={{ uri: COMPANY_LOGO_URL }} style={styles.companyLogo} />
        <Text style={styles.headerText}>Jandi Restaurants</Text>
        <FontAwesome name={showFavorites ? 'star' : 'star-o'} size={24} color="#FFD700" />
      </TouchableOpacity>
      <FlatList
        data={filteredRestaurants}
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