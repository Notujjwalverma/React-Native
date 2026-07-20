import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
    View,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface Props {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function CustomBottomSheet({
    visible,
    onClose,
    children,
}: Props) {
    const translateY = useRef(
        new Animated.Value(SCREEN_HEIGHT)
    ).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: SCREEN_HEIGHT,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
        >
            <Pressable
                style={styles.overlay}
                onPress={onClose}
            />

            <Animated.View
                style={[
                    styles.sheet,
                    {
                        transform: [{ translateY }],
                    },
                ]}
            >
                <View style={styles.handle} />
                {children}
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },

    sheet: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        maxHeight: '85%',
    },

    handle: {
        width: 60,
        height: 5,
        backgroundColor: '#d1d5db',
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 20,
    },
});