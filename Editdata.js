import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGraduationCap, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-native-modal-datetime-picker';  // Assuming you're using this package

const Createdata = () => {
    const jsonUrl = 'http://10.0.2.2:3000/planning';
    
    const [plan, setPlan] = useState('');
    const [date, setDate] = useState(new Date());
    const [place, setPlace] = useState('');
    const [identify, setIdentify] = useState('');
    const [story, setStory] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false); 

    const [isLoading, setLoading] = useState(true);
    const [dataUser, setDataUser] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setDataUser(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    function refreshPage() {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setDataUser(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    const selectItem = (item) => {
        setPlan(item.plan);
        setDate(new Date(item.date));  // Assuming 'date' is in a compatible format
        setPlace(item.place);
        setIdentify(item.identify);
        setStory(item.story);
    };

    const submit = () => {
        const data = {
            plan,
            date: date.toISOString(),
            place,
            identify,
            story,
        };

        fetch(`http://10.0.2.2:3000/planning/${selectedUser.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                alert('Data saved');
                setPlan('');
                setDate(new Date());
                setPlace('');
                setIdentify('');
                setStory('');
                refreshPage();
            })
            .catch((error) => console.error(error));
    };

    return (
        <SafeAreaView>
            <View>
                {isLoading ? (
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={styles.cardtitle}>Loading...</Text>
                    </View>
                ) : (
                    <View >
                        <Text style={styles.title}>Edit Rencanamu</Text>
                        <View style={styles.form}>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Rencana" 
                                value={plan} 
                                onChangeText={(value) => setPlan(value)} 
                            />
                            <TextInput 
                                style={styles.input} 
                                placeholder="Tempat" 
                                value={place} 
                                onChangeText={(value) => setPlace(value)} 
                            />
                            <TextInput 
                                style={styles.input} 
                                placeholder="Keperluan" 
                                value={identify} 
                                onChangeText={(value) => setIdentify(value)} 
                            />
                            <TextInput 
                                style={styles.input} 
                                placeholder="Cerita" 
                                value={story} 
                                onChangeText={(value) => setStory(value)} 
                            />
                            <TextInput 
                                style={styles.input} 
                                placeholder="Pilih Tanggal" 
                                value={date.toISOString().split('T')[0]} 
                                onFocus={() => setShowDatePicker(true)} 
                            />
                            {showDatePicker && (
                                <DatePicker
                                    mode="date"
                                    date={date}
                                    onDateChange={setDate}
                                    onConfirm={() => setShowDatePicker(false)}
                                    onCancel={() => setShowDatePicker(false)}
                                />
                            )}
                            <Button title="Edit" style={styles.button} onPress={submit} />
                        </View>

                        <View style={styles.devider}></View>
                        <ScrollView>
                            <FlatList
                                style={{ marginBottom: 10 }}
                                data={dataUser}
                                onRefresh={refreshPage}
                                refreshing={refresh}
                                keyExtractor={({ id }) => id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => selectItem(item)}>
                                        <View style={styles.card}>
                                            <View>
                                                <Text style={styles.cardtitle}>{item.plan}</Text>
                                                <Text>{item.place}</Text>
                                                <Text>{item.identify}</Text>
                                            </View>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                                <FontAwesomeIcon icon={faPenToSquare} size={20} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </ScrollView>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Createdata;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#D4F6FF',
    },
    title: {
        padding: 12,
        marginTop: 20,
        backgroundColor: '#A294F9', 
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 8,
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
    },
    form: {
        padding: 15, 
        marginTop: 80, 
        marginBottom: 20, 
        borderRadius: 8,
        backgroundColor: '#f4f4f4', 
        position: 'relative',
    },
    input: {
        backgroundColor: '#E2D3F0', 
        borderWidth: 1,
        borderColor: '#ddd', 
        borderRadius: 8,
        padding: 12,
        fontWeight: 'bold',
        marginVertical: 8, 
    },
    button: {
        marginVertical: 15, 
        backgroundColor: '#A294F9', 
        borderRadius: 8,
    },
    avatar: {
        borderRadius: 100,
        width: 80,
    },
    cardtitle: {
        fontSize: 16, 
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: 20,
        marginVertical: 5, 
    },
    devider: {
        height: 1,
        backgroundColor: '#D4F6FF', 
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center', 
    },
});

