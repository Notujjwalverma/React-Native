import { mockOrganization } from "../data/mockOrganization"
import { Organization } from "./organization"
const optionaOrganizationlHolidays = mockOrganization.Holidays.filter((holiday) => { holiday.type == 'Optional' })

export interface Employee {
  profileDetails: {
    basicDetails: {
      name: string
      email: string
      designation: string
      employeeId: string
      contactNo: string
      officeLocation: string
      joiningDate: string
    }
    profilePicture: string
    professionalDetails: {
      dateOfJoining: string
      engineeringCouncil: string
      primaryDeliveryCouncil: string
      secondaryDeliveryCouncil: string | null
      experiencePriorToJoining: string
      primaryDCmanager: string
      location: string
    }

    engineeringCouncilDetails: {
      councilName: string
      currentSprint: string
    }

    deliveryCouncilDetails: {
      deliveryHead: string
      deliveryManager: string
      deliveryManagerId: string
    }

    reportees: {
      directReports: string
      indirectReports: string
    }

    careerDetail: {
      lastPromotion: string
      careerAspiration: string
      performanceRating: string
    }
    skills: {
      id: string,
      skillName: string,
      proficiency: string,
      experience: string,
      skillType: 'primary' | 'secondary',
      updatedOn: string,
    }[]
  }

  leaveDetails: {
    availableLeaves: {
      CL: number
      EL: number
      SL: number
      PL: number
    }

    leaveRequests: {
      requestId: string,

      requestType:
      | 'Leave'
      | 'WFH'
      | 'CompOff'
      | 'OptionalHoliday',

      holidayDate?: string,

      holidayName?: string,

      status:
      | 'Pending'
      | 'Approved'
      | 'Rejected'
      | 'Withdrawn',

      appliedOn: string,

      approverId: string,
    },
    
    LWP: {
      count: number,
      dates: string[],
    }
  }

  optionalUserHolidays: {
    date: string
  }[]

  attendanceDetails: Record<string, any>

  assetsDetails: Record<string, any>

  phishingDetails: Record<string, any>
}