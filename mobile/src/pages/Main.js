import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'


function Main({ navigation }){
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

    if(!currentRegion) {
        return null
    }

    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
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
    }
})

export default Main