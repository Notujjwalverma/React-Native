export interface Holiday {
  date: string
  holidayName: string
  day: string
  type: 'Optional' | 'National'
}

export interface Organization {
  Holidays: Holiday[]
}