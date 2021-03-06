import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import axios from 'axios';
import {Icon, ListItem} from "react-native-elements";
import {Actions} from "react-native-router-flux";
import TouchableItem from "react-navigation/src/views/TouchableItem";

export default class GoldScreen extends React.Component {

    static navigationOptions = {
        title: 'Altın Fiyatları',
    };

    state = {
        gold: []
    }

    _onPressButton = (code) => {
        Actions.GoldDetailScreen({code: code});
    }

    componentDidMount() {
        axios.get('https://currency.digitistanbul.com/gold')
            .then(res => {
                const gold = res.data.collection;
                this.setState({gold});
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    {
                        this.state.gold.map((l, i) => (
                            <TouchableHighlight onPress={() => this._onPressButton(l.code)}>
                                <ListItem
                                    style={{...styles.itemList}}
                                    roundAvatar
                                    key={i}
                                    title={l.name}
                                    leftAvatar={{ source: { uri: l.icon } }}
                                    rightTitle={l.sales}
                                />
                            </TouchableHighlight>
                        ))
                    }

                </ScrollView>
                <View style={{flex: 1, flexDirection: 'row', position: 'absolute', left: 0, right: 0, bottom: -3}}>
                    <TouchableItem style={styles.footerTab} onPress={() => Actions.HomeScreen()}><Icon name='attach-money'/><Text>Döviz</Text></TouchableItem>
                    <TouchableItem style={{...styles.footerTab ,...styles.activeTab}} onPress={() => Actions.GoldScreen()}><Icon name='attach-money'/><Text>Altın</Text></TouchableItem>
                    <TouchableItem style={styles.footerTab} onPress={() => Actions.CreditScreen()}><Icon name='attach-money'/><Text>Kredi</Text></TouchableItem>
                    <TouchableItem style={styles.footerTab} onPress={() => Actions.CreditScreen()}><Icon name='attach-money'/><Text>Ayarlar</Text></TouchableItem>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    footerTab: {
        width: '25%',
        marginBottom: 4, alignItems: 'center',
        paddingBottom: 15,
        paddingTop: 15,
        borderRightWidth: 1,
        borderStyle: 'solid', borderColor: '#ddd',
        borderTopWidth: 1
    },
    activeTab: {
        backgroundColor: '#6699cc',
        color: '#fff'
    },
    itemList : {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ddd'
    }
});
