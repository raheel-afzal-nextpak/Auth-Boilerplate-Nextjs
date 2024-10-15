import { StepFormMapping, StepName } from '@/interface'
import { atom } from 'recoil'

export interface Step<T> {
    formState: 'completed' | 'not-initiated' | 'initiated'
    values: T
}

export interface FormState<M extends Record<StepName, any>> {
    id: string
    uid?: string
    selectedIndex: number
    isFormCompleted: boolean
    steps: {
        [K in keyof M]: Step<M[K]>
    }
}

const defaultState: FormState<StepFormMapping> = {
    id: '',
    selectedIndex: 0,
    isFormCompleted: false,
    steps: {
        [StepName.PersonalInformation]: {
            formState: 'initiated',
            values: {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
            },
        },
        [StepName.PersonalDetail]: {
            formState: 'initiated',
            values: {
                ssn: '',
                governmentId: '',
            },
        },
        [StepName.ContactInformation]: {
            formState: 'initiated',
            values: {
                businessPhoneNumber: '',
                personalPhoneNumber: '',
                businessEmailAddress: '',
                personalEmailAddress: '',
            },
        },
        [StepName.AddressInformation]: {
            formState: 'not-initiated',
            values: {
                homeAddress: '',
                businessAddress: '',
            },
        },
        [StepName.BusinessInformation]: {
            formState: 'not-initiated',
            values: {
                companyName: '',
                businessType: '',
            },
        },
        [StepName.BusinessDetail]: {
            formState: 'not-initiated',
            values: {
                annualRevenue: 0,
                employeeCount: 0,
                businessOwnershipType: '',
            },
        },
        [StepName.BankingDetail]: {
            formState: 'not-initiated',
            values: {
                personalAccountNo: '',
                businessAccountNo: '',
            },
        },
        [StepName.BusinessStartDate]: {
            formState: 'not-initiated',
            values: {
                businessStartDate: '',
            },
        },
        [StepName.URLS]: {
            formState: 'not-initiated',
            values: {
                website: '',
            },
        },
        [StepName.AdditionalInformation]: {
            formState: 'not-initiated',
            values: {
                businessLegalStructure: '',
                personalCreditScore: 0,
            },
        },
    },
}

export const formStateAtom = atom({
    key: 'formState',
    default: defaultState,
})

export { defaultState }

