import React from 'react'
import Datamahasiswa from './data/mahasiswa.json'
import { FlatList, Text, View, TouchableOpacity, Linking, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserGraduate, faVenus, faMars} from '@fortawesome/free-solid-svg-icons';

const Mahasiswa = () => {
    return (
        <FlatList
            data={Datamahasiswa}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() =>
                        Linking.openURL('google.navigation:q=' + item.latitude + ',' + item.longitude)} >
                    <View style={styles.card}>
                        <View styles={styles.avatar} >
                            <FontAwesomeIcon icon={faUserGraduate} size={50}
                                color={item.gender == 'male' ? 'blue' : 'red'} />
                        </View>
                        <View>
                            <Text style={ styles.cardtitle }>{item.first_name} {item.last_name}</Text>
                            <FontAwesomeIcon
                                icon={item.gender == 'male' ? faMars : faVenus}
                                color={item.gender == 'male' ? 'lightblue' : 'pink'}
                                size={14}
                            />
                            <Text> Kelas {item.class}</Text>
                            <Text>{item.latitude}, {item.longitude}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />

    )
}

export default Mahasiswa

const styles = StyleSheet.create({
    title: {
        paddingVertical: 12,
        backgroundColor: '#D7B2E0',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    avatar: {
        borderRadius: 100,
        width: 70,
    },
    cardtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        padding: 25,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 20,
        marginVertical: 7
    },
})

