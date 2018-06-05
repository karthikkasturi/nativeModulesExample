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
            properData: [100, 64],
            improperData: [100, 0],
            properResult: [],
            improperResult: []
        }
        this._handleProperButtonClick = async () => {
            try {
                console.log(MathNative)
                var data = await MathNative.divide(this.state.properData[0], this.state.properData[1])
                this.setState({properResult: data.toString()})
            }
            catch (err) {
                this.setState({ properResult: err.toString() })
            }
        }
        this._handleImproperButtonClick = () => {
            MathNative.divide(this.state.improperData[0], this.state.improperData[1]).
            then((data)=>this.setState({improperResult: data.toString()}))
            .catch (err => 
                this.setState({ improperResult: err.toString() })
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
                    <Button onPress={this._handleProperButtonClick} title='Divide!' />
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
