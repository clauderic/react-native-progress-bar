import React from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    View
} from 'react-native';

var ProgressBar = React.createClass({
    getDefaultProps() {
        return {
            easing: Easing.inOut(Easing.ease),
            easingDuration: 300
        };
    },
    getInitialState() {
        return {
            progress: new Animated.Value(this.props.initialProgress || 0)
        };
    },
    componentDidUpdate(prevProps, prevState) {
        if (this.props.progress >= 0 && this.props.progress != prevProps.progress) {
            this.update();
        }
    },
    render() {
        let {width} = this.props;
        let fillWidth = this.state.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1 * width]
        });

        return (
            <View ref={(container) => {this._container = container}} style={[styles.background, this.props.backgroundStyle, this.props.style]}>
                <Animated.View style={[styles.fill, this.props.fillStyle, { width: fillWidth }]}/>
            </View>
        );
    },

    update() {
        Animated.timing(this.state.progress, {
            easing: this.props.easing,
            duration: this.props.easingDuration,
            toValue: this.props.progress
        }).start();
    }
});

module.exports = ProgressBar;

var styles = StyleSheet.create({
    background: {
        backgroundColor: '#bbbbbb',
        height: 5,
        overflow: 'hidden'
    },
    fill: {
        backgroundColor: '#3b5998',
        height: 5
    }
});
