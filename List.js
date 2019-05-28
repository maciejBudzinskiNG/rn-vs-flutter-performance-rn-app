import React from 'react';
import { FlatList, Text, Animated, Image, View, StyleSheet } from 'react-native';

const placeholderUrl = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081';

const List = ({ data, rotateDate }) => {
    return (
        <FlatList data={data} keyExtractor={(item) => item.id.toString()} renderItem={({ item, index }) => <ListItem item={item} index={index} rotateDate={rotateDate} />} />
    )
}

const ListItem = React.memo(({ item, index, rotateDate }) => {
    console.log('list item')
    const name = item.name;
    const season = item.season;
    const episode = item.number;
    const imgUrl = item.image ? item.image.medium : placeholderUrl;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{index + 1}. {name}</Text>
            <Animated.Text style={[styles.season, { transform: [{ rotate: rotateDate }] }]}>S{season}E{episode}</Animated.Text>
            <Image source={{ uri: imgUrl }} style={styles.image} resizeMode="cover" />
        </View>)
})

const styles = StyleSheet.create({
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


export default List;