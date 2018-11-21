import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    View,
} from 'react-native';

import axios from 'axios';
import {Button, List, ListItem} from 'react-native-elements'
import {Actions, Scene, Router} from 'react-native-router-flux';

import {RkButton} from 'react-native-ui-kitten';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Döviz Kurları',
    };

    state = {
        currencies: []
    }

    _onPressButton = (code) => {
        Actions.DetailScreen({code: code});
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
                <RkButton rkType='success' style={{width: '100%',marginBottom:4}} onPress={() => Actions.GoldScreen()}>Altın</RkButton>
                <RkButton rkType='info' style={{width: '100%',marginBottom:4}} onPress={() => Actions.CreditScreen()}>Kredi</RkButton>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    {
                        this.state.currencies.map((l, i) => (
                            <TouchableHighlight onPress={() => this._onPressButton(l.code)}>
                                <ListItem
                                    roundAvatar
                                    key={i}
                                    title={l.name}
                                    avatar={{uri: l.icon}}
                                    subtitle={l.sales}
                                />
                            </TouchableHighlight>
                        ))
                    }

                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
