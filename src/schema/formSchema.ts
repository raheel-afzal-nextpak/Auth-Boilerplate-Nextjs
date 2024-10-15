import {
    AdditionalInformationType,
    AddressInformationType,
    BankingDetailType,
    BusinessDetailType,
    BusinessInformationType,
    BusinessStartDateType,
    ContactInformationType,
    PersonalDetailType,
    PersonalInformationType,
} from '@/interface'
import { ZodSchema, z } from 'zod'

export function createSchema<T extends Record<string, any>>(
    definition: z.ZodRawShape,
): ZodSchema<T> {
    return z.object(definition) as unknown as ZodSchema<T>
}

export const PersonalInformationSchema = createSchema<PersonalInformationType>({
    firstName: z
        .string()
        .min(1, { message: 'Full name is required' })
        .max(100, { message: 'Full name should not exceed 100 characters' }),
    lastName: z
        .string()
        .min(1, { message: 'Last name is required' })
        .max(100, { message: 'Last name should not exceed 100 characters' }),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date of birth should be in MM-DD-YYYY format',
    }),
})
export const PersonalDetailSchema = createSchema<PersonalDetailType>({
    ssn: z
        .string()
        .regex(/^\d{9}$/, { message: 'SSN should be exactly 9 digits' }),
    governmentId: z.string().min(1, { message: 'GovernmentId is required' }),
})
export const ContactInformationSchema = createSchema<ContactInformationType>({
    businessPhoneNumber: z
        .string()
        .refine((val) => /^\+?\d{10,15}$/.test(val), {
            message: 'Invalid phone number format',
        }),
    personalPhoneNumber: z.string().nullable(),
    businessEmailAddress: z
        .string()
        .email({ message: 'Business email address is invalid' })
        .min(1, { message: 'Business email address is required' })
        .max(100, {
            message: 'Business email address should not exceed 100 characters',
        }),
    personalEmailAddress: z
        .string()
        .email({ message: 'Personal email address is invalid' })
        .min(1, { message: 'Personal email address is required' })
        .max(100, {
            message: 'Personal email address should not exceed 100 characters',
        }),
})
export const AddressInformationSchema = createSchema<AddressInformationType>({
    homeAddress: z.string().nullable(),
    businessAddress: z
        .string()
        .min(1, { message: 'Business address is required' })
        .max(200, {
            message: 'Business address should not exceed 200 characters',
        }),
})

export const BusinessInformationSchema = createSchema<BusinessInformationType>({
    companyName: z.string().min(1, { message: 'Company name is required' }),
    businessType: z.string().min(1, {
        message: 'Business type is required',
    }),
})
export const BusinessDetailSchema = createSchema<BusinessDetailType>({
    annualRevenue: z.number().int().nonnegative(),
    employeeCount: z.number().int().nonnegative(),
    businessOwnershipType: z
        .string()
        .min(1, { message: 'Business ownership type is required' }),
})
export const BankingDetailSchema = createSchema<BankingDetailType>({
    personalAccountNo: z.string().nullable(),
    businessAccountNo: z.string().nullable(),
})
export const BusinessStartDateSchema = createSchema<BusinessStartDateType>({
    businessStartDate: z
        .string()
        .min(1, { message: 'Business start date is required' }),
})
export const UrlsSchema = createSchema<BusinessStartDateType>({
    website: z.string().optional(),
})

export const AdditionalInformationSchema =
    createSchema<AdditionalInformationType>({
        personalCreditScore: z.number().nonnegative(),
        businessLegalStructure: z.string(),
    })
