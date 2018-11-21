import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import axios from 'axios';
import {ListItem} from "react-native-elements";

export default class GoldScreen extends React.Component {

    static navigationOptions = {
    title: 'Altın Fiyatları',
  };

    state = {
        gold: []
    }

    componentDidMount() {
        axios.get('https://currency.digitistanbul.com/gold')
            .then(res => {
                const gold = res.data.collection;
                this.setState({ gold });
            })
    }

  render() {
    return (
      <ScrollView style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

              {
                  this.state.gold.map((l, i) => (
                      <ListItem
                          roundAvatar
                          key={i}
                          title={l.name}
                          avatar={{uri:l.icon}}
                          subtitle={l.sales}
                      />
                  ))
              }

          </ScrollView>
      </ScrollView>
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
