import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from 'example/src/styles/SliderEntry.style';


//import  { DateCounterView } from 'react-native-flip-clock';
//const { FlipClockView } = require('react-native-flip-clock');


export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration, number, month, date }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: illustration }}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={[styles.image, { position: 'relative' }]}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <View>
            <Text>
              { month }
            </Text>
            <Text>
              { date }
            </Text>
            <Image
              source={{ uri: illustration }}
              style={styles.image}
            />
            </View>
        );
    }

    get innerslider () {
      const { data: { illustration, number, month, date, title, instruction, subtitle, datetime }, parallax, parallaxProps, even } = this.props;
      now = new Date();
      var d = Date.parse(datetime);
      then = new Date(d);
      if (then.getHours() > 12) {
        timestring = (then.getHours() - 12) + ":00 pm";
      } else {
        timestring = then.getHours() + ":00 am";
      }
      if(d < now.getTime()){
        return (<View style={styles.textContainer}>
            { this.uppercaseTitle }
            <Text
              style={styles.subtitle}
              numberOfLines={2}
            >
                { subtitle }
            </Text>
        </View>);
      } else {
        if (then.getDate() == now.getDate()){
          return (<View style={styles.progresstextContainer}>
              <Text style={styles.futureNumber}>
                Day {number}
              </Text>
              <Text style={styles.futureDate}>
               {month} {date}
              </Text>
              <Text style={styles.futureTime}>
                {timestring}
              </Text>
          </View>);
        } else {
          return(
          <View style={styles.futuretextContainer}>
            <Text style={styles.futureNumber}>
              Day {number}
            </Text>
            <Text style={styles.futureDate}>
             {month} {date}
            </Text>
          </View>
        );
        }
      }
    }
    get uppercaseTitle() {
      const { data: {title, number, subtitle} } = this.props;
      return (
        <View style={styles.numberContainer}>
        <Text style={styles.number} >
          Day {number}
        </Text>
        <Text
          style={styles.title}
          numberOfLines={3}
        >
            { title }
        </Text>

        </View>
    );
  }

    get clickedcontainer() {
      const { data: { title, datetime, subtitle, instruction }} = this.props;
      now = new Date();
      var d = Date.parse(datetime);
      then = new Date(d);
      if (then.getHours() > 12) {
        timestring = (then.getHours() - 12) + ":00 pm";
      } else {
        timestring = then.getHours() + ":00 am";
      }
      if(d < now.getTime()){
        Alert.alert(`New Clue: ${title}`, instruction);
      } else {
        Alert.alert('Whoa Nelly!', `Hold your horses!`);
      }
    }

    render () {
        const { data: { title, subtitle, number, datetime }, even } = this.props;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { this.clickedcontainer }}
              >
                <View style={styles.imageContainer}>
                    { this.image }
                    <View style={styles.radiusMask} />
                </View>
                { this.innerslider }
            </TouchableOpacity>
        );
    }
}
