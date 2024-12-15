import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouseUser, faGlobe, faGears } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';
import EditView from './Editdata';
import LandingPage from './Landing';


function HomeScreen() {
  return (
    <LandingPage />
  );
}

function MapScreen() {
  return (
    <WebView
      source={{ uri: 'https://leaflet-inky-tau.vercel.app/home' }} />
  );
}

function EditScreen() {
  return (
    <EditView />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            position: 'absolute', // Membuat tab bar mengambang
            bottom: 15, // Jarak dari bagian bawah layar
            left: 10, // Jarak dari sisi kiri
            right: 10, // Jarak dari sisi kanan
            elevation: 5, // Memberikan efek bayangan (Android)
            backgroundColor: '#ffffff', // Warna latar belakang tab bar
            borderRadius: 20, // Membuat border-radius
            height: 50, // Tinggi tab bar
            shadowColor: '#000', // Warna bayangan (iOS)
            shadowOffset: { width: 0, height: 10 }, // Posisi bayangan (iOS)
            shadowOpacity: 0.25, // Transparansi bayangan (iOS)
            shadowRadius: 3.5, // Radius bayangan (iOS)
          },
          tabBarActiveTintColor: 'blue', // Warna tab aktif
          tabBarInactiveTintColor: 'gray', // Warna tab tidak aktif
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: -5, // Ukuran teks label
          },
          headerShown: false, 
          paddingVertical: 5,// Menonaktifkan header
        }}
      >
        <Tab.Screen name="Landing" component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faHouseUser} color={color} size={20} />
            ),
          }} />
        <Tab.Screen name="MapView" component={MapScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faGlobe} color={color} size={20} />
            ),
          }} />
        <Tab.Screen name="Editing" component={EditScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faGears} color={color} size={20} />
            ),
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}