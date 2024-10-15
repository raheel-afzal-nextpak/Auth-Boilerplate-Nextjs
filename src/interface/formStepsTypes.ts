import { LucideIcon } from 'lucide-react'
import { ZodSchema } from 'zod'

export enum FieldType {
    TEXT = 'text',
    RADIO_GROUP = 'radio_group',
    SELECT = 'select',
    PHONE_NUMBER = 'phone_number',
    NUMBER = 'number',
    LOCATION = 'location',
    DATE = 'date',
    AUTO_COMPLETE = 'auto_complete',
}

export interface FormFieldLocation {
    label: string
    type: FieldType.LOCATION
    placeholder: string
    sameAsBusiness?: 'yes' | 'no'
    name: keyof AddressInformationType
}

export interface FormFieldInput {
    label: string
    helpingText?: string
    type:
        | FieldType.TEXT
        | FieldType.NUMBER
        | FieldType.DATE
        | FieldType.PHONE_NUMBER
    placeholder: string
    sameAsBusiness?: 'yes' | 'no'
    name:
        | keyof PersonalInformationType
        | keyof PersonalDetailType
        | keyof BusinessInformationType
        | keyof BusinessStartDateType
        | keyof AdditionalInformationType
        | keyof ContactInformationType
        | keyof BusinessDetailType
        | keyof BankingDetailType
        | keyof URLSType
}

export type AutoCompleteOptions = {
    label: string
    value: string
}

// Define the base FormFieldOption interface
interface BaseFormFieldOption {
    label: string
    placeholder: string
    name:
        | keyof PersonalInformationType
        | keyof PersonalDetailType
        | keyof AddressInformationType
        | keyof BusinessInformationType
        | keyof BusinessStartDateType
        | keyof AdditionalInformationType
        | keyof BusinessDetailType
    sameAsBusiness?: 'yes' | 'no'
}

// Extend the base interface for each field type that requires options
interface SelectFormFieldOption extends BaseFormFieldOption {
    type: FieldType.SELECT
    options: string[]
}

interface AutoCompleteFormFieldOption extends BaseFormFieldOption {
    type: FieldType.AUTO_COMPLETE
    options: AutoCompleteOptions[]
}

interface RadioGroupFormFieldOption extends BaseFormFieldOption {
    type: FieldType.RADIO_GROUP
    options: string[]
}

// Union type for the FormFieldOption
export type FormFieldOption =
    | SelectFormFieldOption
    | AutoCompleteFormFieldOption
    | RadioGroupFormFieldOption

export type FormField = FormFieldInput | FormFieldOption | FormFieldLocation

export interface FormStep<T> {
    stepName: StepName
    icon: LucideIcon
    title: string
    subTitle?: string
    fields: FormField[]
    schema: ZodSchema<T>
}

export enum StepName {
    PersonalInformation = 'Personal Information',
    PersonalDetail = 'Personal Detail',
    ContactInformation = 'Contact Information',
    AddressInformation = 'Address Information',
    BusinessInformation = 'Business Information',
    BusinessDetail = 'Business Detail',
    BankingDetail = 'Banking Detail',
    AdditionalInformation = 'Additional Information',
    BusinessStartDate = 'Business Start Date',
    URLS = 'URLS',
}

export type PersonalInformationType = {
    firstName: string
    lastName: string
    dateOfBirth: string
}
export type PersonalDetailType = {
    ssn: string
    governmentId: string
}
export type ContactInformationType = {
    businessPhoneNumber: string
    personalPhoneNumber: string
    businessEmailAddress: string
    personalEmailAddress: string
}
export type AddressInformationType = {
    homeAddress: string
    businessAddress: string
}
export type BusinessDetailType = {
    annualRevenue: number
    employeeCount: number
    businessOwnershipType: string
}
export type BusinessInformationType = {
    companyName: string
    businessType: string
}

export type BusinessStartDateType = {
    businessStartDate: string
}
export type URLSType = {
    website: string
}
export type BankingDetailType = {
    personalAccountNo: string
    businessAccountNo: string
}
export type AdditionalInformationType = {
    businessLegalStructure: string
    personalCreditScore: number
}

export type UnifiedFormTypes = {
    // Personal Information
    firstName: string
    lastName: string
    dateOfBirth: string

    //Personal Detail
    ssn: string
    governmentId: number

    // Address Information
    homeAddress: string
    businessAddress: string

    // Business Information
    companyName: string
    businessType: string
    businessPhoneNumber: string
    personalPhoneNumber: string
    businessEmailAddress: string
    personalEmailAddress: string
    annualRevenue: number

    //Banking Detail
    personalAccountNo: string
    businessAccountNo: string

    // Business Start Date
    businessStartDate: string

    // Additional Information
    businessOwnershipType: string
    employeeCount: number
    website: string
    businessLegalStructure: string
    personalCreditScore: number
}

export type StepFormMapping = {
    [StepName.PersonalInformation]: PersonalInformationType
    [StepName.PersonalDetail]: PersonalDetailType
    [StepName.ContactInformation]: ContactInformationType
    [StepName.AddressInformation]: AddressInformationType
    [StepName.BusinessInformation]: BusinessInformationType
    [StepName.BusinessDetail]: BusinessDetailType
    [StepName.BankingDetail]: BankingDetailType
    [StepName.BusinessStartDate]: BusinessStartDateType
    [StepName.URLS]: URLSType
    [StepName.AdditionalInformation]: AdditionalInformationType
}
