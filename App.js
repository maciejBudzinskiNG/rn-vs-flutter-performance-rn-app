
import React from 'react';
import { FlatList, View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

const data = require('./data/shows.json');
console.log(data);

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={data} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => {
        return (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.season}>S{item.season}E{item.number}</Text>
            <Image source={{ uri: item.image.medium }} style={styles.image} resizeMode="cover" />
          </View>
        )
      }} />
    </SafeAreaView>
  )
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