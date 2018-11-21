import React from 'react';

import {Actions, Scene, Router} from 'react-native-router-flux';
import HomeScreen from "./screens/HomeScreen";
import GoldScreen from "./screens/GoldScreen";
import CreditScreen from "./screens/CreditScreen";
import DetailScreen from "./screens/DetailScreen";


export default class App extends React.Component {

    render() {
        const scenes = Actions.create(
            <Scene key="root">
                <Scene key="HomeScreen" component={HomeScreen}/>
                <Scene key="GoldScreen" component={GoldScreen}/>
                <Scene key="CreditScreen" component={CreditScreen}/>
                <Scene key="DetailScreen" component={DetailScreen}/>
            </Scene>
        );

        return <Router scenes={scenes}/>
    }
}

