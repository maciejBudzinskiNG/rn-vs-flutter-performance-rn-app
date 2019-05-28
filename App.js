
import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, SafeAreaView, Animated, Easing, StatusBar, TouchableOpacity } from 'react-native';
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js';
import { sort, shuffle } from './helpers';
import List from './List';

const jsonData = require('./data/shows.json');

const rotateValueHolder = new Animated.Value(0);

const startRotation = () => {
  rotateValueHolder.setValue(0.0);
  Animated.timing(rotateValueHolder, {
    toValue: 1,
    duration: 500,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start(() => startRotation())
}

const stopRotation = () => {
  Animated.timing(rotateValueHolder).stop();
}

const rotateDate = rotateValueHolder.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
});

const App = () => {
  const [data, setData] = useState(jsonData);

  useEffect(() => {
    startRotation();
    return () => stopRotation();
  }, [])

  const handleSortButtonPress = () => {
    setData(sort(data));
    stopRotation();
    // startRotation();
  }

  const handleShuffleButtonPress = () => {
    setData(shuffle(data));
    // startRotation();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <List data={data} rotateDate={rotateDate} />
      <View style={styles.buttonContainer}>
        <Button handlePress={handleSortButtonPress} title="sort" />
        <Button handlePress={handleShuffleButtonPress} title="shuffle" />
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
  listContainer: {
    height: 100,
  },
  container: {
    backgroundColor: 'rgb(249,249,249)',
  },
  card: {
    backgroundColor: 'rgb(255,255,255)',
    marginHorizontal: 2,
    marginVertical: 4,
    padding: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  season: {
    padding: 15,
  },
  image: {
    width: 300,
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    width: '40%',
    backgroundColor: 'rgb(50,50,200)',
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonText: {
    color: '#fff',
  }
})

export default App;