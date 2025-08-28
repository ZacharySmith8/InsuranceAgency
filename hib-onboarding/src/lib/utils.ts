import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(value: string): string {
  const phoneNumber = value.replace(/\D/g, "")
  const phoneNumberLength = phoneNumber.length
  
  if (phoneNumberLength < 4) return phoneNumber
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
}

export function formatSSN(value: string): string {
  const ssn = value.replace(/\D/g, "")
  if (ssn.length < 4) return ssn
  if (ssn.length < 6) return `${ssn.slice(0, 3)}-${ssn.slice(3)}`
  return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5, 9)}`
}

export function formatBankAccount(value: string): string {
  const account = value.replace(/\D/g, "")
  return account.replace(/(\d{4})(?=\d)/g, "$1-")
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/
  return phoneRegex.test(phone)
}

export function validateSSN(ssn: string): boolean {
  const ssnRegex = /^\d{3}-\d{2}-\d{4}$/
  return ssnRegex.test(ssn)
}

export function validateNPN(npn: string): boolean {
  const npnRegex = /^\d{8,10}$/
  return npnRegex.test(npn.replace(/\D/g, ""))
}

export function generateEmailFromName(firstName: string, lastName: string): string {
  const cleanFirst = firstName.toLowerCase().replace(/[^a-z]/g, "")
  const cleanLast = lastName.toLowerCase().replace(/[^a-z]/g, "")
  return `${cleanFirst}.${cleanLast}@healthinsurancebureau.com`
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export function calculateProgress(currentStep: number, totalSteps: number): number {
  return Math.round((currentStep / totalSteps) * 100)
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
]

export const ONBOARDING_STEPS = [
  { id: 1, title: 'Personal Information', description: 'Basic details and credentials' },
  { id: 2, title: 'Document Signing', description: 'W-4, I-9, and agreements' },
  { id: 3, title: 'GoHighLevel Setup', description: 'CRM workspace creation' },
  { id: 4, title: 'Upline Notification', description: 'Email and Teams setup' },
  { id: 5, title: 'Google Admin Email', description: 'Professional email creation' },
  { id: 6, title: 'Payroll Setup', description: 'iSolved Quickhire process' },
  { id: 7, title: 'Data Recording', description: 'Google Sheet integration' },
  { id: 8, title: 'Completion Review', description: 'Final verification' },
  { id: 9, title: 'License Verification', description: 'NPN and state licenses' },
  { id: 10, title: 'AHIP Certification', description: 'Training completion' },
]