import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from 'example/src/styles/index.style';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    imageContainerEven: {
        backgroundColor: colors.white
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on ios; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'transparent'
    },
    radiusMaskEven: {
        backgroundColor: colors.black
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 10 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    progresstextContainer: {
        justifyContent: 'center',
        paddingTop: 10 - entryBorderRadius,
        paddingBottom: 20,
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: entryBorderRadius,
        right: 0,
        backgroundColor: 'rgba(251, 113, 138, 0.5)',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    progressbar: {
      justifyContent: 'center'
    },
    futuretextContainer: {
        justifyContent: 'center',
        paddingTop: 10 - entryBorderRadius,
        paddingBottom: 20,
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: entryBorderRadius,
        right: 0,
        backgroundColor: 'rgba(251, 113, 138, 0.5)',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    futureNumber: {
      textAlign: "center",
      fontSize: 40,
      color: colors.black,
    },
    futureDate: {
      textAlign: "center",
      fontSize: 28,
      color: colors.black
    },
    futureTime: {
      textAlign: "center",
      fontSize: 28,
      color: colors.black
    },
    title: {
        color: colors.black,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        color: colors.gray,
        fontSize: 12,
        fontStyle: 'italic'
    },
    number: {
      color: colors.black,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 0
    },
    numberContainer: {
      paddingTop: 0,
      marginTop: 0
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.8)'
    }
});
