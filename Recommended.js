import React from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Recommended from './data/cafe.json'; // Mengimpor data JSON langsung

const Cafe = () => {
  const dataCafes = Recommended; // Menggunakan data yang sudah diimpor

  return (
    <View>
      <Text style={styles.title}>Rumah Makan</Text>
      <FlatList
        data={dataCafes}
        renderItem={({ item }) => {
          const cafe = item; // Menggunakan 'item' sebagai objek cafe
          return (
            <TouchableOpacity
              onPress={() => Linking.openURL(`google.navigation:q=${cafe.Latitude},${cafe.Longitude}`)}
            >
              <View style={styles.card}>
                <View style={styles.infoContainer}>
                  <View style={styles.cafeInfo}>
                    <Text style={styles.cafeTitle}>{cafe["Nama Café"]}</Text>
                    <Text>{`Alamat: ${cafe.Address}`}</Text>
                    <Text>{`Rating: ${cafe.Rating}`}</Text>
                    <Text>{`Harga: ${cafe.Harga}`}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  title: {
    paddingVertical: 10,
    backgroundColor: '#A294F9',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 8,
    marginBottom: 7,
    top: 0,
    left: 0,
    right: 0,
  },
  infoContainer: {
    padding: 10,
  },
  cafeInfo: {
    marginBottom: 10,
  },
  cafeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cafe;
