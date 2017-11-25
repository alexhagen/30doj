import React, { Component } from 'react';
import { View, ScrollView, Text, StatusBar, Platform, Alert } from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from 'example/src/styles/SliderEntry.style';
import SliderEntry from 'example/src/components/SliderEntry';
import styles, { colors } from 'example/src/styles/index.style';
//import { ENTRIES1 } from 'example/src/static/entries';
import { Video, LinearGradient, Asset } from 'expo';
import { Constants, Permissions, Notifications } from 'expo';
//import  { DateCounterView } from 'react-native-flip-clock';

const SLIDER_1_FIRST_ITEM = 15;

async function getvals(){
    let result = await fetch('https://alexhagen.github.io/30doj/entries.json',
    {
    	method: "GET",
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      //console.log(responseData);
      return responseData;
    })
    .catch(error => console.warn(error));
    return result;
  }




export default class example extends Component {

    constructor (props) {
        super(props);
        ENTRIES1 = [];
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            slider1Ref: null,
            notification: {},
            slideentries: ENTRIES1,
            videonumber: Asset.fromModule(require('./vid1.mp4'))
        };
        this.getEntries();
    }

    set_notification() {
      for (var i = 0; i < ENTRIES1.length; i++){
        var datetime = ENTRIES1[i]['datetime'];
        var title = ENTRIES1[i]['title'];
        var subtitle = ENTRIES1[i]['subtitle'];
        var instruction = ENTRIES1[i]['instruction'];
        console.log(datetime);
        now = new Date();
        var d = Date.parse(datetime);
        then = new Date(d);

        if(d >= now.getTime()){
          if (then.getDate() == now.getDate()){
            Notifications.scheduleLocalNotificationAsync(
              {
                title: 'You have a new gift/activity!',
                body: `Open the app to check! The title is "${title}", with clue "${instruction}"`,
                data: {
                  hello: 'You have a new gift/activity!',
                  future: `Open the app to check! The title is "${title}", with clue "${instruction}"`,
                },
                ios: {
                  sound: true,
                },
                android: {
                  vibrate: true,
                },
              },
              {
                time: d,
              }
            );
          }
        }
      }
    }

    async getEntries(){
      ENTRIES1 = await getvals();
      this.setState({ slideentries: ENTRIES1});
      this.set_notification();
    }

    _handleNotification = notification => {
      let { data, origin, remote } = notification;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      /**
       * Currently on Android this will only fire when selected for local
       * notifications, and there is no way to distinguish between local
       * and remote notifications
       */

      let message;
      if (Platform.OS === 'android') {
        message = `Notification ${origin} with data: ${JSON.stringify(data)}`;
      } else {
        if (remote) {
          message = `Push notification ${origin} with data: ${JSON.stringify(data)}`;
        } else {
          title = data['hello']
          message = data['future'];
        }
      }

      // Calling alert(message) immediately fails to show the alert on Android
      // if after backgrounding the app and then clicking on a notification
      // to foreground the app
      setTimeout(() => Alert.alert(title, message), 1000);
    };

    async componentDidMount() {
      let result = await
      Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (Constants.lisDevice && resut.status === 'granted') {
       console.log('Notification permissions granted.')
      }
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    componentWillUnmount() {
      this._notificationSubscription && this._notificationSubscription.remove();
      this._tabPressedListener.remove();
    }


    _renderItem ({item, index}) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
            />
        );
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

    check_video(index) {
      this.setState({ slider1ActiveSlide: index });
      //console.log(ENTRIES1[index]['number']);
      var number = parseInt(ENTRIES1[index]['number']);
      console.log(number);
      if (number < 10) {
        if (this.state.videonumber != Asset.fromModule(require('./vid1.mp4'))){
        this.setState({ videonumber: Asset.fromModule(require('./vid1.mp4')) });
        console.log(this.state.videonumber);
      }
      } else {
        if (number < 20) {
          if (this.state.videonumber != Asset.fromModule(require('./vid2.mp4'))){
          this.setState({ videonumber: Asset.fromModule(require('./vid2.mp4')) });
          console.log(this.state.videonumber);
        }
        } else {
          if (this.state.videonumber != Asset.fromModule(require('./vid3.mp4'))){
          this.setState({ videonumber: Asset.fromModule(require('./vid3.mp4')) });
          console.log(this.state.videonumber);
        }
        }
      }
    }


    get example1 () {
        const { slider1ActiveSlide, slider1Ref, slideentries } = this.state;
        return (
            <View style={styles.exampleContainer}>
                <Text style={styles.title}>The 30 Days of Justine</Text>
                <Text style={styles.subtitle}>
                    Check the slides below for every days present or activity!
                </Text>
                <Carousel
                  ref={(c) => { if (!this.state.slider1Ref) { this.setState({ slider1Ref: c }); } }}
                  data={this.state.slideentries}
                  renderItem={this._renderItemWithParallax}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={true}
                  enableMomentum={false}
                  firstItem={SLIDER_1_FIRST_ITEM}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={true}
                  loopClonesPerSide={4}
                  autoplay={false}
                  onSnapToItem={(index) => this.check_video(index) }
                />
            </View>
        );
    }

    render () {
        return (
            <View style={styles.container}>
                <StatusBar
                  translucent={true}
                  backgroundColor={'rgba(0, 0, 0, 0.3)'}
                  barStyle={'light-content'}
                />
                <Video
                  source={ this.state.videonumber }
                  rate={1.0}
                  volume={0.0}
                  muted={true}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={styles.video}
                />
                <ScrollView
                  style={styles.scrollview}
                  contentContainerStyle={styles.scrollviewContentContainer}
                  indicatorStyle={'white'}
                  scrollEventThrottle={200}
                  directionalLockEnabled={true}
                >
                    { this.example1 }
                </ScrollView>
            </View>
        );
    }
}
