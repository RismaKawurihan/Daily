import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouseUser, faGlobe, faGears } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';
import MapView from './MapView';
import LandingPage from './Landing';


function HomeScreen() {
  return (
    <LandingPage />
  );
}

function MapScreen() {
  return (
    <MapView />
  );
}

function WebScreen() {
  return (
    <WebView
      />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
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
        <Tab.Screen name="GITHUB" component={WebScreen}
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