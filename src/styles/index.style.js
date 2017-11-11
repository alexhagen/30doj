import { StyleSheet } from 'react-native';

export const colors = {
    black: '#142735',
    gray: '#888888',
    background1: '#DDDDDD',
    background2: '#21D4FD',
    purple: '#40223C',
    teal: '#42988F',
    green: '#B1C592',
    yellow: '#F1DDBA',
    pink: '#FB718A',
    white: '#EEEEFF'
};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    scrollview: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: 'rgba(64, 34, 60, 0.6)'
    },
    scrollviewContentContainer: {
        paddingBottom: 50
    },
    exampleContainer: {
        marginBottom: 30
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: colors.white,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: colors.white,
        fontSize: 20,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
      position: 'absolute',
      top: 320
    },
    sliderContentContainer: {
    },
    paginationContainer: {
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 580,
        left: 0,
        right: 0
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
});
