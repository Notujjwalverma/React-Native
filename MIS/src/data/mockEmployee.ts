import { Employee } from '../types/employee'

export const mockEmployee: Employee = {
    profileDetails: {
        basicDetails: {
            name: 'Ujjwal Anand',
            email: 'ujjwal.anand@example.com',
            designation: 'Software Developer Trainee',
            employeeId: 'GSI GI 0001',
            contactNo: '+91 9876543210',
        },
        professionalDetails: {
            dateOfJoining: '2023-01-15',
            engineeringCouncil: 'Full stack (Angular / Node / React)',
            primaryDeliveryCouncil: 'ABC-XYZ',
            secondaryDeliveryCouncil: null,
            experiencePriorToJoining: '2 years',
            primaryDCmanager: 'Moirangthem Subhakluxmi',
            location: 'Gurgaon',
        },
        engineeringCouncilDetails: {
            councilName: 'Full stack (Angular / Node / React)',
            currentSprint: 'Sprint 12',
        },
        deliveryCouncilDetails: {
            deliveryHead: 'Asha Sharma',
            deliveryManager: 'Moirangthem Subhakluxmi',
        },
        reportees: {
            directReports: '0',
            indirectReports: '0',
        },
        careerDetail: {
            lastPromotion: 'N/A',
            careerAspiration: 'Full stack developer',
            performanceRating: 'Exceeds Expectations',
        },
    },

    leaveDetails: {
        availableLeaves: {
            CL: 4,
            EL: 10,
            SL: 8,
            PL: 5,
        },
        leaveRequests: [
            
        ],
        LWP : {
            count: 0,
            dates: [
                '10-06-2026',
                '11-06-2026',
            ],
        },
    },

    attendanceDetails: {},

    assetsDetails: {},

    phishingDetails: {},
}