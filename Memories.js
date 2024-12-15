import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ListPlanning = () => {
    const jsonUrl = 'http://10.0.2.2:3000/planning'; // Ubah URL untuk data planning
    const [isLoading, setLoading] = useState(true);
    const [dataPlanning, setDataPlanning] = useState([]); // Ubah state untuk menyimpan data planning
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setDataPlanning(json) // Set data planning
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    function refreshPage() {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setDataPlanning(json) // Set data planning setelah refresh
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    function deleteData(id) {
        fetch(jsonUrl + '/' + id, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                alert('Planning terhapus');
                refreshPage();
            })
    }

    return (
        <SafeAreaView>
            {isLoading ? (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={styles.cardtitle}>Loading...</Text>
                </View>
            ) : (
                <View>
                    <Text style={styles.title}>Histories</Text>
                    <FlatList
                        style={{ marginBottom: 0 }}
                        data={dataPlanning}
                        onRefresh={() => { refreshPage() }}
                        refreshing={refresh}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity>
                                    <View style={styles.card}>
                                        <View style={styles.cardContent}>
                                            <Text style={styles.cardtitle}>{item.plan}</Text>
                                            <Text>{item.date}</Text>
                                            <Text>{item.place}</Text>
                                            <Text>{item.story}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <View style={styles.form}>
                                    <Button title="Hapus"
                                        onPress={() => Alert.alert('Hapus data', 'Yakin akan menghapus data ini?', [
                                            { text: 'Tidak', onPress: () => console.log('button tidak') },
                                            { text: 'Ya', onPress: () => deleteData(item.id) },
                                        ])}
                                        color={'red'}
                                    />
                                </View>
                            </View>
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
    )
}

export default ListPlanning

const styles = StyleSheet.create({
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
    cardtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4, 
        marginTop: 10,
    },
    card: {
        flexDirection: 'column', 
        padding: 10, 
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 20,
        marginVertical: 5, 
    },
    cardContent: {
        paddingBottom: 10,
    },
    form: {
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 20,
        alignItems: 'flex-end', // Memposisikan tombol di kanan
    },
    button: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 5,
    },
});
