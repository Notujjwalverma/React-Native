export interface Employee {
  profileDetails: {
    basicDetails: {
      name: string
      email: string
      designation: string
      employeeId: string
      contactNo: string
    }

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
  }

  leaveDetails: {
    availableLeaves: {
      CL: number
      EL: number
      SL: number
      PL: number
    }

    leaveRequests: any[],
    LWP : {
      count: number,
      dates: string[],
    }
  }

  attendanceDetails: Record<string, any>

  assetsDetails: Record<string, any>

  phishingDetails: Record<string, any>
}