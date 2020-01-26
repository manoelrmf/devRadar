import React, { useEffect, useState } from 'react'
import { StyleSheet, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'


function Main(){
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
                <Image style={StyleSheet.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/28743763?s=460&v=4'}}></Image>
            </Marker>
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        
    }
})

export default Main