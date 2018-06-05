import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeModules,
    Button
} from 'react-native';

const { MathNative } = NativeModules;


export default class RootsWithCallback extends Component {
    constructor(props) {
        super(props)
        this.state = {
            properData: [100, 64, 81, 4, 8],
            improperData: [100, -8],
            properResult: [],
            improperResult: []
        }
        this._handleProperButtonClick = () => {
            MathNative.rootsWithCallback(
                this.state.properData,
                err => {
                    this.setState({ properResult: err.toString() })
                    console.log(err)
                },
                result => this.setState({ properResult: result.toString() })
            )
        }
        this._handleImproperButtonClick = () => {
            MathNative.rootsWithCallback(
                this.state.improperData,
                err => this.setState({ improperResult: err.toString() }),
                result => this.setState({ improperResult: result.toString() })
            )
        }

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text textAlign='center'>Callbacks</Text>
                    <Text style={styles.welcome}>
                        {this.state.properData.toString()}
                    </Text>
                    <Text style={styles.welcome}>
                        {this.state.properResult.toString()}
                    </Text>
                    <Button onPress={this._handleProperButtonClick} title='Get roots!' />
                    <Text style={styles.welcome}>
                        {this.state.improperData.toString()}
                    </Text>
                    <Text style={styles.welcome}>
                        {this.state.improperResult.toString()}
                    </Text>
                    <Button title='Get roots!' onPress={this._handleImproperButtonClick} />
                </View>
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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
