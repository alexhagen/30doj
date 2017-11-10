import { StyleSheet } from 'react-native';

export const colors = {
    black: '#142735',
    gray: '#888888',
    background1: '#DDDDDD',
    background2: '#21D4FD'
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
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
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
        color: colors.black,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: colors.black,
        fontSize: 20,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 25
    },
    sliderContentContainer: {
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
});
