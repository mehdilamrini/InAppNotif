/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View ,Picker ,AppState} from 'react-native';
import PushController from './app/PushController';
import PushNotification from 'react-native-push-notification' ;


export default class App extends React.Component {

    constructor(props){

        super(props);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.state = {
            seconds:5,
        };
    }

    componentDidMount(){

    AppState.addEventListener('change' , this.handleAppStateChange);

    }

    componentWillUnmount(){

        AppState.removeEventListener('change' , this.handleAppStateChange);

    }

    handleAppStateChange(appState){

        if ( appState === 'background') {

            PushNotification.localNotificationSchedule({
                //... You can use all the options from localNotifications
                message: "My Notification Message", // (required)
                date: new Date(Date.now() + (this.state.seconds * 1000)) // in 60 secs
            });

 }


    }

    render(){


        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Choose your notification time</Text>
                <Picker

                    style={styles.picker}
                    selectedValue={this.state.seconds}
                    onValueChange={ (seconds) => this.setState({ seconds }) }>

                    <Picker.Item label="5"  value={5}  />
                    <Picker.Item label="10" value={10} />
                    <Picker.Item label="15" value={15} />

                </Picker>

<PushController/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    picker: {
        width: 100,
    },
});
