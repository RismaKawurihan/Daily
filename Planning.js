import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; // Import Picker

const Createdata = () => {
    const jsonUrl = 'http://10.0.2.2:3000/planning';
    const [plan, setPlan] = useState('');
    const [date, setDate] = useState(new Date());  // Set default as current date
    const [place, setPlace] = useState('');
    const [identify, setIdentify] = useState(''); // Keperluan
    const [story, setStory] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);  // State untuk menampilkan DatePicker


    const submit = () => {
        const data = {
            plan: plan,
            date: date.toISOString().split('T')[0], // Convert date to 'YYYY-MM-DD' format
            place: place,
            identify: identify,
            story: story,
        };

        fetch(jsonUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                alert('Data tersimpan');
                setPlan('');
                setDate(new Date());  // Reset to current date after submission
                setPlace('');
                setIdentify('');
                setStory('');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Gagal menyimpan data');
            });
    };

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);  // Sembunyikan DatePicker setelah memilih tanggal
        if (selectedDate) {
            setDate(selectedDate);  // Set tanggal yang dipilih
        }
    };

    return (
        <SafeAreaView>
            <View>
                <Text style={styles.title}>Rencana Main</Text>
                <ScrollView style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Rencana"
                        value={plan}
                        onChangeText={(value) => setPlan(value)}
                    />

                    {/* Kolom untuk memilih Tanggal */}
                    <TextInput
                        style={styles.input}
                        placeholder="Pilih Tanggal"
                        value={date.toISOString().split('T')[0]}  // Tampilkan tanggal dalam format YYYY-MM-DD
                        onFocus={() => setShowDatePicker(true)}  // Tampilkan DatePicker saat kolom diklik
                    />

                    {/* Menampilkan DatePicker hanya jika showDatePicker true */}
                    {showDatePicker && (
                        <DatePicker
                            value={date}
                            mode="date"
                            display="calendar"
                            onChange={onDateChange}
                        />
                    )}

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
                    <Button title="Simpan" style={styles.button} onPress={submit} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Createdata;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    title: {
        paddingVertical: 12,
        backgroundColor: '#A294F9',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 8,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    form: {
        padding: 7,
        marginTop: 60,
        marginBottom: 100,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        position: 'relative',
    },
    input: {
        backgroundColor: '#B692C2',
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        padding: 8,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        height: 50,
        alignItems: 'center',
        width: '50%',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});
