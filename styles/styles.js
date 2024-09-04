import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#f0f0f0', // Light background color
  },
  webview: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content
    padding: 15,
    backgroundColor: '#4CAF50', // Green background color
    position: 'relative', // Ensure absolute positioning of back button works
  },
  headerDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content
    padding: 19,
    backgroundColor: '#4CAF50', // Green background color
    position: 'relative', // Ensure absolute positioning of back button works
  },
  companyLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text color
    flex: 1,
    textAlign: 'center', // Center the text
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
  },
  logoImage: { 
    width: 70,
    height: 70,
    marginRight: 10,
  },
  headerImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20, // Increased font size for the name
    fontWeight: 'bold',
    color: '#333', // Dark text color
  },
  subText: {
    fontSize: 14,
    color: '#666', // Gray text color for subtext
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888', // Gray text color
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure it appears above other elements
  },
  loadingIndicator: {
    zIndex: 2, // Ensure it appears above the background
  },
});

export default styles;