import React from 'react';
import {
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    View,
} from 'react-native';

import axios from 'axios';
import {Button, List, ListItem} from 'react-native-elements'
import {Actions, Scene, Router} from 'react-native-router-flux';
import {Icon} from 'react-native-elements'

import {RkButton} from 'react-native-ui-kitten';
import TouchableItem from "react-navigation/src/views/TouchableItem";


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Döviz Kurları',
    };

    state = {
        currencies: []
    }

    _onPressButton = (item) => {
        Actions.DetailScreen({item: item});
    }

    componentDidMount() {
        axios.get(`https://currency.digitistanbul.com/`)
            .then(res => {
                const currencies = res.data.collection;
                this.setState({currencies});
            })
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView  contentContainerStyle={styles.contentContainer}>

                    {
                        this.state.currencies.map((l, i) => (
                            <TouchableHighlight onPress={() => this._onPressButton(l)}>
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
                    <TouchableItem style={{...styles.footerTab ,...styles.activeTab}} ><Icon name='attach-money'/><Text>Döviz</Text></TouchableItem>
                    <TouchableItem style={styles.footerTab} onPress={() => Actions.GoldScreen()}><Icon name='attach-money'/><Text>Altın</Text></TouchableItem>
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
        paddingBottom: 73
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
        borderBottomWidth: 0.7,
        borderStyle: 'solid',
        borderColor: '#ddd'
    }
});
