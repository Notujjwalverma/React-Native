import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars'

const App = () => {
    const [selected, setSelected] = useState('');
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    return (
        <View style={styles.container}>
            <Calendar
                style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: 'rgba(203, 213, 225, 0.7)',
                height: 'auto',
                marginBottom: 20,
            }}
            theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#0F172A',
                monthTextColor: 'black',
                dayTextColor: '#2d4150',
                selectedDayBackgroundColor: '#0EA5E9',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#0EA5E9',
                todayBackgroundColor: '#E0F2FE',
                textDisabledColor: '#94A3B8',
                dotColor: '#0EA5E9',
                selectedDotColor: '#ffffff',
                textDisabledColor: '#94A3B8',
                arrowColor: '#0EA5E9',
            }}
            // Specify the current date
            current={formattedToday}
            onDayPress={day => {
                setSelected(day.dateString);
            }}
            markedDates={{
                '2026-05-02': { selected: true, selectedColor: 'grey' },
                '2026-05-03': { selected: true, selectedColor: 'grey' },
                '2026-05-09': { selected: true, selectedColor: 'grey' },
                '2026-05-10': { selected: true, selectedColor: 'grey' },
                '2026-05-16': { selected: true, selectedColor: 'grey' },
                '2026-05-17': { selected: true, selectedColor: 'grey' },
                '2026-05-23': { selected: true, selectedColor: 'grey' },
                '2026-05-24': { selected: true, selectedColor: 'grey' },
            }}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        padding: 16,
    },
});

export default App;