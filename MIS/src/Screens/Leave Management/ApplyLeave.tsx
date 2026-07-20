import React, { useState } from 'react'
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native'
import Navbar from '../../components/Navbar'
import Dropdown from '../../components/Inputs/customDropdown'
import TextArea from '../../components/Inputs/TextArea'
import PhoneNumberInput from '../../components/Inputs/phoneNumberInput'
import Button from '../../components/Buttons/Button'
import Message from '../../components/Popups/Message'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import { addLeaveRequest } from '../../redux/store/slices/employeeSlice'
import { useDispatch } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



export default function ApplyLeave() {
  const [activeOption, setActiveOption] = useState<LeaveType | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const dispatch = useDispatch();

  const employee = useSelector((state: RootState) => state.employee.employee)
  const leaveBalances = employee.leaveDetails.availableLeaves
  const LWP = employee.leaveDetails.LWP

  const today = new Date()
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(
    today.getMonth() + 1
  ).padStart(2, '0')}-${today.getFullYear()}`;

  const getWeekendDates = (
    startDate: string,
    endDate: string
  ) => {
    const weekends = [];

    const current = new Date(formattedDate);
    const end = new Date(formattedDate);
    end.setDate(end.getDate() + 30);
    while (current <= end) {
      const day = current.getDay();

      if (day === 0 || day === 6) {
        weekends.push({
          label: current.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            weekday: 'long',
          }),
          value: current.toISOString().split('T')[0],
        });
      }

      current.setDate(current.getDate() + 1);
    }

    return weekends;
  };

  type LeaveType =
    | 'leave'
    | 'wfh'
    | 'compoff'
    | 'LWPChangeRequest'

  type FieldType = 'date' | 'dropdown' | 'textarea' | 'phone'

  type FormField = {
    name: string
    label: string
    type: FieldType
    required?: boolean
    options?: { label: string; value: string }[]
    placeholder?: string
  }

  const leaveOptions: { id: LeaveType; label: string; description: string }[] = [
    { id: 'leave', label: 'Apply Leave', description: 'Regular leave application' },
    { id: 'wfh', label: 'Apply WFH', description: 'Work from home request' },
    { id: 'compoff', label: 'Apply CompOff', description: 'Compensatory off request' },
    { id: 'LWPChangeRequest', label: 'LWP Change Request', description: 'In case of LWP marked by system' },
  ]

  const formConfig: Record<LeaveType, FormField[]> = {
    leave: [
      { name: 'startDate', label: 'Leave Start Date', type: 'date', required: true },
      { name: 'endDate', label: 'Leave End Date', type: 'date', required: true },
      {
        name: 'leaveType',
        label: 'Type of Leave',
        type: 'dropdown',
        required: true,
        placeholder: 'Select leave type',
        options: [],
      },
      { name: 'reason', label: 'Reason', type: 'textarea', required: true, placeholder: 'Enter leave reason' },
      { name: 'primaryContact', label: 'Primary Contact Number', type: 'phone', required: true, placeholder: 'Enter primary contact' },
      { name: 'secondaryContact', label: 'Secondary Contact Number', type: 'phone', placeholder: 'Enter secondary contact' },
    ],
    wfh: [
      { name: 'date', label: 'WFH Date', type: 'date', required: true },
      { name: 'reason', label: 'Reason', type: 'textarea', required: true, placeholder: 'Enter WFH reason' },
      { name: 'primaryContact', label: 'Primary Contact Number', type: 'phone', required: true, placeholder: 'Enter primary contact' },
    ],
    compoff: [
      { name: 'compoffDate', label: 'CompOff Date', type: 'dropdown', required: true, options: getWeekendDates(formattedDate, formattedDate), placeholder: 'Select CompOff date' },
      { name: 'reason', label: 'Reason', type: 'textarea', required: true, placeholder: 'Enter CompOff reason' },
    ],
    LWPChangeRequest: [
      { name: 'LWPDate', label: 'LWP Date', type: 'dropdown', required: true, placeholder: LWP.dates.length > 0 ? 'Select LWP date' : 'No LWP as of now', options: LWP.dates.map((date) => ({ label: date, value: date })) },
      {
        name: 'typeOfLeave', label: 'Type of Leave', type: 'dropdown', required: true, placeholder: 'Select leave type', options: [
          { label: ' Sick Leave', value: 'sick' },
          { label: ' Casual Leave', value: 'casual' },
        ]
      },
      { name: 'reason', label: 'Reason for LWP', type: 'textarea', required: true, placeholder: 'Enter reason for Leave Without Pay' },
    ],
  }

  const getInitialFormData = (type: LeaveType) => {
    const values: Record<string, string> = { type }
    formConfig[type].forEach((field) => {
      values[field.name] = ''
    })
    return values
  }

  const openDatePicker = (fieldName: string) => {
    setSelectedField(fieldName)

    DateTimePickerAndroid.open({
      value: formData[fieldName]
        ? new Date(formData[fieldName])
        : new Date(),
      mode: 'date',
      minimumDate : new Date(),
      is24Hour: true,
      onChange: (_, selectedDate) => {
        if (!selectedDate) return

        const formattedDate =
          selectedDate.getFullYear() +
          '-' +
          String(selectedDate.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(selectedDate.getDate()).padStart(2, '0')

        handleChange(fieldName, formattedDate)
      },
    })
  }

  const [message, setMessage] = useState<{
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    text: string
  } | null>(null)

  const holidays = [
    '2026-01-26',
    '2026-03-14',
    '2026-08-15',
    '2026-10-02',
  ]

  const calculateLeaveDays = (
    startDate: string,
    endDate: string,
    holidays: string[],
  ) => {
    const holidaySet = new Set(holidays)

    let count = 0

    const current = new Date(startDate)
    const end = new Date(endDate)

    while (current <= end) {
      const day = current.getDay()
      const dateString =
        current.getFullYear() +
        '-' +
        String(current.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(current.getDate()).padStart(2, '0')

      const isWeekend =
        day === 0 || day === 6

      const isHoliday =
        holidaySet.has(dateString)

      if (!isWeekend && !isHoliday) {
        count++
      }

      current.setDate(current.getDate() + 1)
    }
    console.log('Calculated leave days:', count)
    return count
  }


  type LeaveBalance = {
    [leaveType: string]: number;
  };

  function generateLeaveOptions(
    totalDays: number,
    balances: LeaveBalance
  ) {
    const options: {
      leaveType: string
      leaveCount: number
      lwpCount: number
      display: string
    }[] = []

    Object.entries(balances).forEach(([type, available]) => {
      if (available <= 0) return;

      const leaveUsed = Math.min(totalDays, available);
      const lwpUsed = totalDays - leaveUsed;

      let display = `${leaveUsed} ${type}`;

      if (lwpUsed > 0) {
        display += ` + ${lwpUsed} LWP`;
      }

      options.push({
        leaveType: type,
        leaveCount: leaveUsed,
        lwpCount: lwpUsed,
        display,
      });
    });

    return options;
  }

  const totalDays =
    formData.startDate && formData.endDate
      ? calculateLeaveDays(
        formData.startDate,
        formData.endDate,
        holidays
      )
      : 0

  const leaveDropDownOptions = generateLeaveOptions(
    totalDays,
    leaveBalances
  ).map((option) => ({
    label: option.display,
    value: JSON.stringify(option),
  }))


  const handleOptionSelect = (option: LeaveType) => {
    setActiveOption(option)
    setFormData(getInitialFormData(option))
    setErrors({})
  }

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validate = () => {
    if (!activeOption) return false
    const nextErrors: Record<string, string> = {}
    formConfig[activeOption].forEach((field) => {
      if (field.required && !formData[field.name]) {
        nextErrors[field.name] = `${field.label} is required`
      }
    })
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!activeOption) {
      setMessage({ type: 'warning', title: 'Select option', text: 'Please choose an application type first.' })
      return
    }

    if (!validate()) {
      setMessage({ type: 'error', title: 'Validation failed', text: 'Please fix the highlighted fields.' })
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 900))
      setMessage({ type: 'success', title: 'Submitted', text: `${leaveOptions.find((item) => item.id === activeOption)?.label} submitted successfully.` })
      dispatch(addLeaveRequest({
        id: Date.now(),
        type: activeOption,
        data: formData,
        status: 'Pending',
        appliedOn: new Date().toISOString(),
      }))
      setActiveOption(null)
      setFormData({})
      setErrors({})
    } catch (_error) {
      setMessage({ type: 'error', title: 'Submit failed', text: 'Unable to submit application. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const renderField = (field: FormField) => {
    const value = formData[field.name] || ''
    const error = errors[field.name]

    if (field.type === 'date') {
      return (
        <View key={field.name} style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>{field.label}</Text>

          <Pressable
            style={styles.dateInput}
            onPress={() => openDatePicker(field.name)}
          >
            <Text
              style={{
                color: value ? '#0F172A' : '#94A3B8',
                fontSize: 14,
              }}
            >
              {value || field.placeholder || field.label}
            </Text>
          </Pressable>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      )
    }

    if (field.type === 'dropdown') {
      return (
        <View key={field.name} style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>{field.label}</Text>
          <Dropdown
            options={
              field.name === 'leaveType'
                ? leaveDropDownOptions
                : field.options || []
            }
            value={value || null}
            onChange={(selected) => handleChange(field.name, selected)}
            placeholder={field.placeholder ?? field.label}
            style={styles.fieldControl}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      )
    }

    if (field.type === 'phone') {
      return (
        <View key={field.name} style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>{field.label}</Text>
          <PhoneNumberInput
            value={value}
            onChange={(text) => handleChange(field.name, text)}
            placeholder={field.placeholder ?? field.label}
            error={error}
            style={styles.fieldControl}
          />
        </View>
      )
    }

    return (
      <View key={field.name} style={styles.fieldWrapper}>
        <Text style={styles.fieldLabel}>{field.label}</Text>
        <TextArea
          value={value}
          onChange={(text) => handleChange(field.name, text)}
          placeholder={field.placeholder ?? field.label}
          showCharCount={field.name === 'reason'}
          style={styles.fieldControl}
          maxLength={400}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    )
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

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Apply Leave</Text>
        <Text style={styles.subHeading}>Select the option for which you want to apply:</Text>

        <View style={styles.selectorRow}>
          {leaveOptions.map((option) => {
            const active = activeOption === option.id
            return (
              <Pressable
                key={option.id}
                onPress={() => handleOptionSelect(option.id)}
                style={({ pressed }) => [
                  styles.selectorCard,
                  active && styles.selectorCardActive,
                  pressed && styles.selectorCardPressed,
                ]}
              >
                <Text style={[styles.selectorTitle, active && styles.selectorTitleActive]}>{option.label}</Text>
                <Text style={[styles.selectorDescription, active && styles.selectorDescriptionActive]}>{option.description}</Text>
              </Pressable>
            )
          })}
        </View>

        {activeOption ? (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>{leaveOptions.find((item) => item.id === activeOption)?.label}</Text>
            {formConfig[activeOption].map(renderField)}
            <Button
              label="Submit Request"
              onPress={handleSubmit}
              loading={loading}
              style={styles.submitButton}
            />
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>Apply for the selected leave type</Text>
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F9FEFF',
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 18,
    lineHeight: 20,
  },
  selectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  selectorCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 16,
    width: '48%',
    marginBottom: 12,
  },
  selectorCardActive: {
    backgroundColor: '#349fa2',
    borderColor: '#349fa2',
  },
  selectorCardPressed: {
    opacity: 0.85,
  },
  selectorTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  selectorTitleActive: {
    color: '#FFFFFF',
  },
  selectorDescription: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  selectorDescriptionActive: {
    color: '#E0F2FE',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(203, 213, 225, 0.8)',
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },
  fieldWrapper: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },
  fieldControl: {
    width: '100%',
  },
  errorText: {
    marginTop: 6,
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '500',
  },
  submitButton: {
    marginTop: 8,
    shadowOpacity : 0,
    
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(203, 213, 225, 0.8)',
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  dateInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
})
