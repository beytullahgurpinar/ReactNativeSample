import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet, Text,
    TouchableHighlight,
    View,
} from 'react-native';

import axios from 'axios';
import {Icon, ListItem} from 'react-native-elements'
import TouchableItem from "react-navigation/src/views/TouchableItem";
import {Actions} from "react-native-router-flux";

export default class DetailScreen extends React.Component {

    state = {
        code: this.props.item.code,
        currencies: [],
        comments: [],
    }

    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.item.name + ' Yorumları'
    })

    componentDidMount() {


        this.state.code = this.props.item.code;

        const config = {headers: {'Content-Type': 'multipart/form-data'}};

        let data = new FormData();

        data.append('object_type', 'currency');
        data.append('object_id', this.props.item.code);
        data.append('p', 1);
        data.append('render', 0);

        axios.post('https://www.kolayfinans.com.tr/api/comments/more',
            data, config)
            .then(res => {
                console.log(res.data);
                const comments = res.data.data;
                this.setState({comments});
            })
        ;
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>

                    {
                        this.state.comments.map((l, i) => (
                            <TouchableHighlight>
                                <ListItem
                                    style={{...styles.itemList}}
                                    roundAvatar
                                    key={i}
                                    title={l.username}
                                    leftAvatar={{source: {uri: 'https://www.gravatar.com/avatar/' + l.security + '?d=&s=400'}}}
                                    subtitle={l.comment}
                                    rightSubtitle={l.created_date.date}
                                />
                            </TouchableHighlight>
                        ))
                    }

                </ScrollView>
                <View style={{flex: 1, flexDirection: 'row', position: 'absolute', left: 0, right: 0, bottom: -3}}>
                    <TouchableItem style={styles.footerTab} onPress={() => Actions.HomeScreen()}><Icon name='attach-money'/><Text>Döviz</Text></TouchableItem>
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
        borderTopWidth: 1,
        backgroundColor: 'white'
    },
    itemList: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ddd'
    }
});
