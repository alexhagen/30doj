import React, { Component } from 'react';
import { View, ScrollView, Text, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from 'example/src/styles/SliderEntry.style';
import SliderEntry from 'example/src/components/SliderEntry';
import styles, { colors } from 'example/src/styles/index.style';
//import { ENTRIES1 } from 'example/src/static/entries';
import { Video } from 'expo';
import { Constants, Permissions, Notifications } from 'expo';
import * as Progress from 'react-native-progress';

const SLIDER_1_FIRST_ITEM = 0;

async function getvals(){
    let result = await fetch('https://gist.githubusercontent.com/alexhagen/da70c9cd16341f2d8c5ff658099ca86f/raw/3b68ba4d82c4f726dcb999e4d95b6048cdb570e5/entries.json',
    {
    	method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
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
            slideentries: ENTRIES1
        };
        this.getEntries();
        const localNotification = {
            title: 'x',
            body: 'y', // (string) — body text of the notification.
            ios: { // (optional) (object) — notification configuration specific to iOS.
              sound: true // (optional) (boolean) — if true, play a sound. Default: false.
            },
        android: // (optional) (object) — notification configuration specific to Android.
            {
              sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
              //icon (optional) (string) — URL of icon to display in notification drawer.
              //color (optional) (string) — color of the notification icon in notification drawer.
              priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
              sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
              vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
              // link (optional) (string) — external link to open when notification is selected.
            }
          };
        let t = new Date();
        t.setSeconds(t.getSeconds() + 10);
        const schedulingOptions = {
            time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
            repeat: 'day'
          };
        //Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
        Notifications.presentLocalNotificationAsync(localNotification);

    }

    async getEntries(){
      ENTRIES1 = await getvals();
      this.setState({ slideentries: ENTRIES1});
    }

    _handleNotification = (notification) => {
      this.setState({notification: notification});
      //alert(`You've clicked '${notification.title}'`);
    };

    async componentDidMount() {
      let result = await
      Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (Constants.lisDevice && resut.status === 'granted') {
       console.log('Notification permissions granted.')
      }
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
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


    get example1 () {
        const { slider1ActiveSlide, slider1Ref, slideentries } = this.state;
        return (
            <View style={styles.exampleContainer}>
                <Text style={styles.title}>The 30 Days of Justine</Text>
                <Text style={styles.subtitle}>
                    These will come available as the day comes!
                </Text>
                <Progress.Bar progress={0.3} width={200} />
                <Carousel
                  ref={(c) => { if (!this.state.slider1Ref) { this.setState({ slider1Ref: c }); } }}
                  data={this.state.slideentries}
                  renderItem={this._renderItemWithParallax}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={true}
                  firstItem={SLIDER_1_FIRST_ITEM}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  enableMomentum={false}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={true}
                  loopClonesPerSide={2}
                  autoplay={false}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                <Pagination
                  dotsLength={30}
                  activeDotIndex={slider1ActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={'rgba(255, 255, 255, 0.92)'}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={colors.black}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={slider1Ref}
                  tappableDots={!!slider1Ref}
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
                  source={ require('./vid2.mp4') }
                  rate={1.0}
                  volume={1.0}
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
