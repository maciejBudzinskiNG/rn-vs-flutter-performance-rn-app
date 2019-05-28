
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated, Easing, TouchableOpacity, Platform } from 'react-native';
import { sort, shuffle } from './helpers';
import List from './List';

const jsonData = require('./data/shows.json');

const rotateValueHolder = new Animated.Value(0.0);

const startRotation = () => {
  rotateValueHolder.setValue(0.0);
  Animated.timing(rotateValueHolder, {
    toValue: 1,
    duration: 500,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start(() => startRotation())
}

const rotateDate = rotateValueHolder.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
});

const App = () => {
  const [data, setData] = useState(jsonData);

  useEffect(() => {
    startRotation();
  }, [])

  const handleSortButtonPress = () => {
    setData(sort(data));
  }

  const handleShuffleButtonPress = () => {
    setData(shuffle(data));
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <List data={data} rotateDate={rotateDate} />
      <View style={styles.buttonContainer}>
        <Button handlePress={handleShuffleButtonPress} title="Shuffle" />
        <Button handlePress={handleSortButtonPress} title="Sort" />
      </View>
    </SafeAreaView>
  )
}

const Button = ({ handlePress, title }) => (
  <TouchableOpacity style={styles.button} onPress={handlePress} >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  button: {
    width: '50%',
    backgroundColor: 'rgb(219,219,219)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: 2.22,
      },
      android: {
        elevation: 3,
      }
    })
  },
  buttonText: {
    opacity: 0.9,
  }
})

export default App;