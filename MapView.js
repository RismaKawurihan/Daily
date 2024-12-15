import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted');
            setHasLocationPermission(true);
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        // Untuk iOS, lokasi biasanya diatur di konfigurasi Info.plist
        setHasLocationPermission(true);
      }
    };

    requestLocationPermission();
  }, []);

  const handleLongPress = (event) => {
    const coordinate = event.nativeEvent.coordinate;
    setMarkers((prevMarkers) => [...prevMarkers, coordinate]); // Menambahkan marker baru
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Klik lama pada peta untuk menambahkan marker</Text>
      {hasLocationPermission ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -7.774301505658536,
            longitude: 110.37444615311837,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onLongPress={handleLongPress} // Fungsi untuk menambah marker
          showsUserLocation={true} // Menampilkan lokasi pengguna
          followsUserLocation={true} // Mengikuti lokasi pengguna
          showsMyLocationButton={true} // Tombol untuk membuka lokasi saya
        >
          {markers.map((coordinate, index) => (
            <Marker key={index} coordinate={coordinate} title={`Marker ${index + 1}`} />
          ))}
        </MapView>
      ) : (
        <Text style={styles.permissionText}>Memerlukan izin lokasi untuk menampilkan peta.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    top: 20,
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 1,
  },
  permissionText: {
    fontSize: 16,
    color: 'red',
  },
});

export default App;
