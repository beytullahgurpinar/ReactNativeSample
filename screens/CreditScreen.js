import React from 'react';
import axios from 'axios';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Icon, ListItem} from "react-native-elements";
import TouchableItem from "react-navigation/src/views/TouchableItem";
import {Actions} from "react-native-router-flux";

export default class CreditScreen extends React.Component {
    static navigationOptions = {
        title: 'İhtiyaç Kredisi',
    };

    state = {
        credit: []
    }

    componentDidMount() {
        axios.get('https://www.hangikredi.com/Credit/GetIntersetTable?CreditCategory=%C4%B0htiya%C3%A7%20Kredisi&ListCount=0&NextIncrease=7')
            .then(res => {
                const credit = res.data.activelist;
                this.setState({credit});
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    {
                        this.state.credit.map((l, i) => (
                            <ListItem
                                style={{...styles.itemList}}
                                key={i}
                                title={l.BANKA_ADI}
                                rightSubtitle={l.ORAN}
                            />
                        ))
                    }

                </ScrollView>
                <View style={{flex: 1, flexDirection: 'row', position: 'absolute', left: 0, right: 0, bottom: -3}}>
                    <TouchableItem style={styles.footerTab} onPress={() => Actions.HomeScreen()}><Icon name='attach-money'/><Text>Döviz</Text></TouchableItem>
                    <TouchableItem style={styles.footerTab} onPress={() => Actions.GoldScreen()}><Icon name='attach-money'/><Text>Altın</Text></TouchableItem>
                    <TouchableItem style={{...styles.footerTab, ...styles.activeTab}} onPress={() => Actions.CreditScreen()}><Icon name='attach-money'/><Text>Kredi</Text></TouchableItem>
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
    itemList: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ddd'
    }
});
