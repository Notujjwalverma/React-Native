import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { RootState } from '../../redux/store/store';
import { updateOptionalHolidays } from '../../redux/store/slices/employeeSlice';
import Navbar from '../../components/Navbar';
import Message from '../../components/Popups/Message';

export default function CustomizeHoliday() {
  const employee = useSelector(
    (state: RootState) => state.employee.employee
  )

  const organization = useSelector(
    (state: RootState) => state.organization.organization
  )

  const [message, setMessage] = useState<any>(null)

  const optionalHolidays = useMemo(() => {
    return organization.Holidays.filter(
      (holiday: any) => holiday.type === 'Optional'
    )
  }, [organization])

  const initiallySelected = useMemo(() => {
    return employee.optionalUserHolidays
      .filter(
        (holiday: any) =>
          holiday.status === 'Selected'
      )
      .map(
        (holiday: any) => holiday.date
      )
  }, [employee])

  const [selectedDates, setSelectedDates] =
    useState<string[]>(initiallySelected)

  const toggleHoliday = (date: string) => {
    const alreadySelected =
      selectedDates.includes(date)

    if (alreadySelected) {
      setSelectedDates(
        selectedDates.filter(
          selectedDate =>
            selectedDate !== date
        )
      )
      return
    }

    if (selectedDates.length >= 8) {
      setMessage({
        type: 'warning',
        title: 'Limit Reached',
        text: 'Maximum 8 optional holidays can be selected.',
      })
      return
    }

    setSelectedDates([
      ...selectedDates,
      date,
    ])
  }

  const dispatch = useDispatch()
  const navigation = useNavigation<any>()

  const handleUpdate = () => {
    const addedHolidays =
      selectedDates.filter(
        date =>
          !initiallySelected.includes(date)
      )

    const removedHolidays =
      initiallySelected.filter(
        date =>
          !selectedDates.includes(date)
      )

    const updatedSelectedHolidays = optionalHolidays
      .filter(holiday =>
        selectedDates.includes(holiday.date)
      )
      .map(holiday => ({
        ...holiday,
        status: 'Selected',
      }))

    dispatch(updateOptionalHolidays(updatedSelectedHolidays))

    setMessage({
      type: 'success',
      title: 'Changes Saved',
      text:
        `${addedHolidays.length} holiday request(s) created.\n` +
        `${removedHolidays.length} holiday request(s) withdrawn.`,
    })

    navigation.navigate('Holidays')
  }

  return (
    <View style={styles.screenContainer}>
      <Navbar />

      <Message
        type={message?.type ?? 'info'}
        title={message?.title}
        message={message?.text ?? ''}
        isVisible={!!message}
        onClose={() => setMessage(null)}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>
          Customize Holidays
        </Text>

        <Text style={styles.subHeading}>
          Select up to 8 optional holidays.
        </Text>

        <View style={styles.counterCard}>
          <Text style={styles.counterTitle}>
            Selected Optional Holidays
          </Text>

          <Text style={styles.counterValue}>
            {selectedDates.length}/8
          </Text>
        </View>

        {optionalHolidays.map(
          (holiday: any) => {
            const selected =
              selectedDates.includes(
                holiday.date
              )

            return (
              <Pressable
                key={holiday.date}
                onPress={() =>
                  toggleHoliday(
                    holiday.date
                  )
                }
                style={styles.holidayItem}
              >
                <View
                  style={{ flex: 1 }}
                >
                  <Text
                    style={
                      styles.holidayName
                    }
                  >
                    {holiday.holidayName}
                  </Text>

                  <Text
                    style={
                      styles.holidayMeta
                    }
                  >
                    {holiday.date}
                  </Text>

                  <Text
                    style={
                      styles.holidayMeta
                    }
                  >
                    {holiday.day}
                  </Text>
                </View>

                <View
                  style={[
                    styles.checkbox,
                    selected &&
                      styles.checkboxSelected,
                  ]}
                >
                  {selected && (
                    <Text
                      style={
                        styles.checkmark
                      }
                    >
                      ✓
                    </Text>
                  )}
                </View>
              </Pressable>
            )
          }
        )}

        <Pressable
          style={styles.updateButton}
          onPress={handleUpdate}
        >
          <Text
            style={
              styles.updateButtonText
            }
          >
            Update Holidays
          </Text>
        </Pressable>
      </ScrollView>
    </View> 
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F9FEFF',
  },

  content: {
    padding: 16,
  },

  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },

  subHeading: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    marginBottom: 16,
  },

  counterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  counterTitle: {
    color: '#64748B',
    fontSize: 14,
  },

  counterValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0EA5E9',
    marginTop: 4,
  },

  holidayItem: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    padding: 16,
    borderRadius: 12,

    marginBottom: 12,
  },

  holidayName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },

  holidayMeta: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },

  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,

    borderWidth: 2,
    borderColor: '#CBD5E1',

    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxSelected: {
    backgroundColor: '#0EA5E9',
    borderColor: '#0EA5E9',
  },

  checkmark: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  updateButton: {
    backgroundColor: '#0EA5E9',

    paddingVertical: 14,

    borderRadius: 10,

    alignItems: 'center',

    marginTop: 20,
    marginBottom: 40,
  },

  updateButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
})