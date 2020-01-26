import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'

function Main({ navigation }){
    const [devs, setDevs] = useState([])
    const [currentRegion, setCurrentRegion] = useState(null)

    useEffect(() => {
       async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync()
            if(granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }
       loadInitialPosition()
    }, []);

    async function loadDevs(){
        const { latitude, longitude} = currentRegion

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs: 'ReactJS'
            }
        })

        setDevs(response.data)
    }

    function handleRegionChanged(region){
        setCurrentRegion(region)
    }

    if(!currentRegion) {
        return null
    }

    return (
      <>
        <MapView 
        onRegionChangeComplete={handleRegionChanged} 
        initialRegion={currentRegion} 
        style={styles.map}>
            <Marker coordinate={{ latitude: -22.8634532, longitude: -43.2481356}}>
                <Image style={styles.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/28743763?s=460&v=4'}}></Image>
                <Callout onPress={() => {
                    navigation.navigate('Profile', {
                        github_username: 'manoribeiro'
                    })
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Manoel Ribeiro</Text>
                        <Text style={styles.devBio}>Carreira em desenvolvimento de software, com competência para atuar na construção de aplicações web Full Stack.</Text>
                        <Text style={styles.devTechs}>React JS, React Native, Java, PHP</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
        <View style={styles.searchForm}>
            <TextInput 
                style={styles.searchInput}
                placeholder="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}    
            ></TextInput>
            <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
      </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'

    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,        
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
})

export default Main