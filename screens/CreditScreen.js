import React from 'react';
import axios from 'axios';
import {ScrollView, StyleSheet, View} from "react-native";
import {ListItem} from "react-native-elements";

export default class CreditScreen extends React.Component {
    static navigationOptions = {
        title: 'İhtiyaç Kredisi',
    };

    state = {
        credit: []
    }

    componentDidMount() {
        axios.get(`https://www.hangikredi.com/Credit/GetIntersetTable?CreditCategory=%C4%B0htiya%C3%A7%20Kredisi&ListCount=0&NextIncrease=7`)
            .then(res => {
                const credit = res.data.activelist;
                this.setState({ credit });
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    {
                        this.state.credit.map((l, i) => (
                            <ListItem
                                key={i}
                                title={l.BANKA_ADI}
                                subtitle={l.ORAN}
                            />
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
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
