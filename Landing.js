import React, { useState } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Planning from './Planning';
import Memories from './Memories';
import Recommended from './Recommended';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = { fontFamily: 'Georgia' };

const LandingPage = () => {
    const [activeComponent, setActiveComponent] = useState(null); // State untuk menentukan konten

    // Fungsi untuk menangani penekanan tombol
    const handleButtonPress = (buttonId) => {
        setActiveComponent((prev) => (prev === buttonId ? null : buttonId)); // Toggle komponen
    };

    const renderContent = () => {
        switch (activeComponent) {
            case 1:
                return <Planning />;
            case 2:
                return <Memories />;
            case 3:
                return <Recommended />;
            default:
                return null;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground
                source={require('./assets/DailyApp1.png')}
                style={styles.background}
                resizeMode="cover"
            >
            </ImageBackground>
            <View style={styles.content}>
                <Text style={[styles.subtitle, { fontFamily: 'Georgia', color: '#555555' }]}>
                    Teman setiamu untuk mengatur aktivitas, perjalanan, dan menemukan tempat seru!
                </Text>

                {/* Button Planning */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.leftButton]}
                        onPress={() => handleButtonPress(1)}
                    >
                        <Text style={styles.buttonText}>Planning</Text>
                    </TouchableOpacity>
                    <Text style={styles.buttonLabel}>Rencanakan agenda perjalananmu</Text>
                </View>

                {/* Button Memories */}
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonLabel}>Raingkaian Cerita</Text>
                    <TouchableOpacity
                        style={[styles.button, styles.rightButton]}
                        onPress={() => handleButtonPress(2)}
                    >
                        <Text style={styles.buttonText}>Memories</Text>
                    </TouchableOpacity>
                </View>

                {/* Button Recommended */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.leftButton]}
                        onPress={() => handleButtonPress(3)}
                    >
                        <Text style={styles.buttonText}>Recommended</Text>
                    </TouchableOpacity>
                    <Text style={styles.buttonLabel}>Rekomendasi tempat</Text>
                </View>

                {/* Kontainer di bawah semua tombol */}
                <View style={styles.contentContainer}>
                    {renderContent()}
                </View>
            </View>
            <ImageBackground
                source={require('./assets/bg.png')}
                style={styles.below}
                resizeMode="cover" // Menyesuaikan gambar dengan ukuran kontainer
            >
            </ImageBackground>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        paddingBottom: 30,
        paddingTop: 130,
        paddingHorizontal: 32,
        alignItems: 'center',
        width: '100%',
    },
    below: {
        paddingBottom: 30,
        paddingTop: 5,
        paddingHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#D4F6FF',
    },
    content: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 5,
        fontFamily: 'Georgia',
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 50,
        textAlign: 'center',
        marginHorizontal: 10,
        fontFamily: 'Georgia',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
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
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Georgia',
    },
    buttonLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 10,
        width: '40%',
        textAlign: 'center',
        fontFamily: 'Georgia',
    },
    leftButton: {
        alignSelf: 'flex-start',
    },
    rightButton: {
        alignSelf: 'flex-end',
    },
    contentContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#D4F6FF',
        borderRadius: 8,
        width: '100%',
    },
});

export default LandingPage;
