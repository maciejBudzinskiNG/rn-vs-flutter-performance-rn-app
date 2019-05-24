
import React from 'react';
import { FlatList, View, Text, Image, StyleSheet, SafeAreaView, Animated, Easing } from 'react-native';

const data = require('./data/shows.json');
console.log(data);

class App extends React.Component {
  constructor() {
    super();
    this.rotateValueHolder = new Animated.Value(0);
  }

  componentDidMount(){
    this.startRotation();
  }

  startRotation(){
    this.rotateValueHolder.setValue(0);
    Animated.timing(this.rotateValueHolder, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      // useNativeDriver: true,
    }).start(()=>this.startRotation());
  }


  render() {
    const rotateDate = this.rotateValueHolder.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <SafeAreaView style={styles.container}>
        <FlatList data={data} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              <Animated.Text style={[styles.season, {transform: [{rotate: rotateDate }]}]}>S{item.season}E{item.number}</Animated.Text>
              <Image source={{ uri: item.image.medium }} style={styles.image} resizeMode="cover" />
            </View>
          )
        }} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(249,249,249)',
    paddingTop: 20,
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
})

export default App;