import React, { useMemo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import Navbar from '../../components/Navbar'
import { RootState } from '../../redux/store/store';

export default function Holidays() {
  const employee = useSelector(
    (state: RootState) => state.employee.employee
  )

  const organization = useSelector(
    (state: RootState) => state.organization.organization
  )

  const holidays = useMemo(() => {
    return organization.Holidays.map((holiday: any) => {
      const isWeekend =
        holiday.day === 'Saturday' ||
        holiday.day === 'Sunday'

      const isSelected =
        holiday.type === 'National'
          ? !isWeekend
          : employee.optionalUserHolidays.some(
              (selectedHoliday: any) =>
                selectedHoliday.date === holiday.date &&
                selectedHoliday.status === 'Selected'
            )

      return {
        ...holiday,
        status: isSelected ? 'Selected' : 'Not Selected',
      }
    })
  }, [employee, organization])

  const selectedCount = holidays.filter(
    (holiday: any) => holiday.status === 'Selected'
  ).length

  const navigation = useNavigation<any>()

  return (
    <View style={styles.screenContainer}>
      <Navbar />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>
              Holiday Management
            </Text>

            <Text style={styles.subHeading}>
              View your configured holidays.
            </Text>
          </View>

          <Pressable
            style={styles.customizeButton}
            onPress={() => {
              navigation.navigate('CustomizeHoliday')
            }}
          >
            <Text style={styles.customizeButtonText}>
              Customize
            </Text>
          </Pressable>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            Selected Holidays
          </Text>

          <Text style={styles.summaryValue}>
            {selectedCount} / 10
          </Text>
        </View>

        {holidays.map((holiday: any) => (
          <View
            key={holiday.date}
            style={styles.holidayItem}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.holidayName}>
                {holiday.holidayName}
              </Text>

              <Text style={styles.holidayMeta}>
                {holiday.date}
              </Text>

              <Text style={styles.holidayMeta}>
                {holiday.day}
              </Text>

              <Text style={styles.holidayType}>
                {holiday.type} Holiday
              </Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                holiday.status === 'Selected'
                  ? styles.selectedBadge
                  : styles.notSelectedBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  holiday.status === 'Selected'
                    ? styles.selectedText
                    : styles.notSelectedText,
                ]}
              >
                {holiday.status}
              </Text>
            </View>
          </View>
        ))}
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  },

  customizeButton: {
    backgroundColor: '#0EA5E9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  customizeButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
  },

  summaryTitle: {
    fontSize: 14,
    color: '#64748B',
  },

  summaryValue: {
    marginTop: 6,
    fontSize: 28,
    fontWeight: '700',
    color: '#0EA5E9',
  },

  holidayItem: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    padding: 16,
    borderRadius: 12,

    marginBottom: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
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

  holidayType: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#0369A1',
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  selectedBadge: {
    backgroundColor: '#DCFCE7',
  },

  notSelectedBadge: {
    backgroundColor: '#FEE2E2',
  },

  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },

  selectedText: {
    color: '#166534',
  },

  notSelectedText: {
    color: '#991B1B',
  },
})