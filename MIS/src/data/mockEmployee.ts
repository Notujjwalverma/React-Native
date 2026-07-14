import { Employee } from '../types/employee'
import { mockOrganization } from './mockOrganization'

export const mockEmployee: Employee = {
    profileDetails: {
        basicDetails: {
            name: 'Ujjwal Anand',
            email: 'ujjwal.anand@example.com',
            designation: 'Software Developer Trainee',
            employeeId: 'GSI GI 0001',
            contactNo: '+91 9876543210',
            officeLocation: 'Canaan Tower, Gurgaon',
            joiningDate: '2023-01-15',
        },
        profilePicture: 'https://img.freepik.com/premium-photo/indian-bank-employee-smiling-camera-with-welcoming-gesture_1101231-6591.jpg?w=360',
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
            deliveryManagerId: 'GSI GI 0002',
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
        skills: [
            {
                id: '1',
                skillName: 'JavaScript',
                proficiency: 'Advanced',
                experience: '3 years',
                skillType: 'primary',
                updatedOn: '2024-05-01'
            },
            {
                id: '2',
                skillName: 'React',
                proficiency: 'Advanced',
                experience: '2 years',
                skillType: 'primary',
                updatedOn: '2024-05-01'
            },
            {
                id: '3',
                skillName: 'Node.js',
                proficiency: 'Intermediate',
                experience: '1 year',
                skillType: 'secondary',
                updatedOn: '2024-05-01'
            },
            {
                id: '4',
                skillName: 'Angular',
                proficiency: 'Intermediate',
                experience: '1 year',
                skillType: 'secondary',
                updatedOn: '2024-05-01'
            },
        ]
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
        LWP: {
            count: 0,
            dates: [
                '10-06-2026',
                '11-06-2026',
            ],
        },
    },

    optionalUserHolidays: [

    ],

    attendanceDetails: {
        attendanceLogs: [
            {
                id: 1,
                day: 'Monday',
                date: '2026-06-15',
                inTime: '09:05 AM',
                outTime: '06:10 PM',
                workingHours: '09:05',
            },
            {
                id: 2,
                day: 'Tuesday',
                date: '2026-06-16',
                inTime: '09:00 AM',
                outTime: '06:00 PM',
                workingHours: '09:00',
            },
            {
                id: 3,
                day: 'Wednesday',
                date: '2026-06-17',
                inTime: '09:15 AM',
                outTime: '05:45 PM',
                workingHours: '08:30',
            },
        ],
    },

    assetsDetails: [
        {
            assetName: 'Dell Laptop',
            assetType: 'Electronics',
            assignedDate: '2023-01-20',
            status: 'Assigned',

        },
        {
            assetName: 'Office Chair',
            assetType: 'Furniture',
            assignedDate: '2023-02-15',
            status: 'Assigned',
        }
    ],

    phishingDetails: {

    },

}