import { Industries } from '@/components/common/Industires'
import { FieldType, FormStep, StepName } from '@/interface'
import {
    AdditionalInformationSchema,
    AddressInformationSchema,
    BankingDetailSchema,
    BusinessDetailSchema,
    BusinessInformationSchema,
    BusinessStartDateSchema,
    ContactInformationSchema,
    PersonalDetailSchema,
    PersonalInformationSchema,
    UrlsSchema,
} from '@/schema/formSchema'
import {
    BookUser,
    Calendar,
    CirclePlus,
    Info,
    Landmark,
    Link,
    MapPin,
    NotebookTabs,
    Phone,
    User,
} from 'lucide-react'

export const dashboard_constant = {
    page: {
        main_heading: 'Dashboard',
    },
    thanks_message: {
        title: 'Form Completed',
        desc: `Thank you for completing the form. Your information has been submitted successfully.`,
        redirect_to_home: 'Go to Form',
    },
    form_content: {
        sameAsBusiness: ' Same as business',
        separateField: (name: string) => `Separate ${name.split(' ').pop()}`,
        backBtn: 'Back',
        nextBtn: 'Next',
        finishBtn: 'Finish',
        saveBtn: 'Save',
        saveAndNext: 'Save & Next',
    },
}

export const formSteps: FormStep<any>[] = [
    // Step 1: Personal Information
    {
        stepName: StepName.PersonalInformation,
        icon: User,
        title: 'Tell Us About Yourself',
        schema: PersonalInformationSchema,
        fields: [
            {
                label: 'Full Name',
                type: FieldType.TEXT,
                placeholder: '',
                name: 'firstName',
            },
            {
                label: 'Last Name',
                type: FieldType.TEXT,
                placeholder: '',
                name: 'lastName',
            },
            {
                label: 'Date of Birth',
                type: FieldType.DATE,
                placeholder: '',
                name: 'dateOfBirth',
            },
        ],
    },
    {
        stepName: StepName.PersonalDetail,
        icon: BookUser,
        title: 'Personal Detail',
        schema: PersonalDetailSchema,
        fields: [
            {
                label: 'SSN',
                type: FieldType.TEXT,
                placeholder: '',
                name: 'ssn',
            },
            {
                label: 'Government ID',
                type: FieldType.TEXT,
                placeholder: '',
                name: 'governmentId',
            },
        ],
    },
    {
        stepName: StepName.ContactInformation,
        icon: Phone,
        title: 'How Can We Contact You?',
        schema: ContactInformationSchema,
        fields: [
            {
                label: 'Business Phone Number',
                type: FieldType.PHONE_NUMBER,
                placeholder: '',
                name: 'businessPhoneNumber',
            },
            {
                label: 'Personal Phone Number',
                type: FieldType.PHONE_NUMBER,
                placeholder: '',
                name: 'personalPhoneNumber',
                sameAsBusiness: 'yes',
            },
            {
                label: 'Business Email Address',
                type: FieldType.TEXT,
                placeholder: '',
                name: 'businessEmailAddress',
            },
            {
                label: 'Personal Email Address',
                type: FieldType.TEXT,
                placeholder: '',
                name: 'personalEmailAddress',
            },
        ],
    },
    {
        stepName: StepName.AddressInformation,
        icon: MapPin,
        title: 'Where Do You Live?',
        schema: AddressInformationSchema,
        fields: [
            {
                label: 'Business Address',
                type: FieldType.LOCATION,
                placeholder: '',
                name: 'businessAddress',
            },
            {
                label: 'Home Address',
                sameAsBusiness: 'yes',
                type: FieldType.LOCATION,
                placeholder: '',
                name: 'homeAddress',
            },
        ],
    },
    {
        stepName: StepName.BusinessInformation,
        icon: Info,
        title: 'Tell Us About Your Company',
        schema: BusinessInformationSchema,
        fields: [
            {
                label: 'Business Name',
                type: FieldType.TEXT,
                placeholder: '',
                name: 'companyName',
            },

            {
                label: 'Business Type/Industry',
                type: FieldType.AUTO_COMPLETE,
                placeholder: '',
                name: 'businessType',
                options: Industries,
            },
        ],
    },
    {
        stepName: StepName.BusinessDetail,
        icon: NotebookTabs,
        title: 'Company Financials at a Glance',
        schema: BusinessDetailSchema,
        fields: [
            {
                label: 'Annual Revenue',
                type: FieldType.NUMBER,
                placeholder: '',
                name: 'annualRevenue',
            },
            {
                label: 'Number of Employees',
                type: FieldType.NUMBER,
                placeholder: '',
                name: 'employeeCount',
            },
            {
                label: 'Business Ownership Type',
                type: FieldType.RADIO_GROUP,
                placeholder: '',
                name: 'businessOwnershipType',
                options: ['Individual', 'Joint', 'Trust', 'Multiple'],
            },
        ],
    },
    {
        stepName: StepName.BankingDetail,
        icon: Landmark,
        title: 'Your Banking Information',
        schema: BankingDetailSchema,
        fields: [
            {
                label: 'Personal Account Number',
                type: FieldType.TEXT,
                placeholder: '',
                name: 'personalAccountNo',
            },
            {
                label: 'Business Account Number',
                type: FieldType.TEXT,
                placeholder: '',
                name: 'businessAccountNo',
            },
        ],
    },
    {
        stepName: StepName.BusinessStartDate,
        icon: Calendar,
        title: 'When Did Your Business Start?',
        schema: BusinessStartDateSchema,
        fields: [
            {
                label: 'Business Start Date',
                type: FieldType.RADIO_GROUP,
                placeholder: '',
                name: 'businessStartDate',
                options: [
                    'Less than 3 years',
                    '3-10 years',
                    'More than 10 years',
                ],
            },
        ],
    },
    {
        stepName: StepName.URLS,
        icon: Link,
        title: 'Do you have a website?',
        schema: UrlsSchema,
        fields: [
            {
                label: 'Website Url (leave the field blank if you do not have one)',
                type: FieldType.TEXT,
                placeholder: '',
                name: 'website',
            },
        ],
    },
    // Step 4: Business Ownership and Employees
    {
        stepName: StepName.AdditionalInformation,
        icon: CirclePlus,
        title: 'Additional Information',
        subTitle:
            'Skip these fields if they do not apply to you and hit save. Quick and easy!',
        schema: AdditionalInformationSchema,
        fields: [
            {
                label: 'Business Legal Structure',
                helpingText:
                    'e.g. Sole Proprietorship, Partnership, Corporation',
                type: FieldType.TEXT,
                placeholder: '',
                name: 'businessLegalStructure',
            },
            {
                label: 'Personal Credit Score',
                type: FieldType.NUMBER,
                placeholder: '',
                name: 'personalCreditScore',
            },
        ],
    },
]
