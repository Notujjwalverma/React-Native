import { Organization } from '../types/organization'

export const mockOrganization: Organization = {
  Holidays: [
    {
      date: '01/01/2026',
      holidayName: 'New Year',
      day: 'Thursday',
      type: 'Optional',
    },
    {
      date: '15/08/2026',
      holidayName: 'Independence Day',
      day: 'Saturday',
      type: 'National',
    },
    {
      date: '26/08/2026',
      holidayName: 'Onam',
      day: 'Wednesday',
      type: 'Optional',
    },
    {
      date: '28/08/2026',
      holidayName: 'Varah Laxmi/Raksha Bandhan',
      day: 'Friday',
      type: 'Optional',
    },
    {
      date: '04/09/2026',
      holidayName: 'Janmashtami',
      day: 'Friday',
      type: 'Optional',
    },
    {
      date: '02/10/2026',
      holidayName: 'Gandhi Jayanti',
      day: 'Friday',
      type: 'National',
    },
    {
      date: '25/12/2026',
      holidayName: 'Christmas',
      day: 'Friday',
      type: 'Optional',
    },
  ],
}