export interface Agent {
  id?: string
  firstName: string
  lastName: string
  dateOfBirth: string
  phone: string
  email: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  ssn: string
  npn?: string
  bankDetails: {
    accountNumber: string
    routingNumber: string
    bankName: string
  }
  licensedStates: string[]
  upline: {
    name: string
    email: string
  }
  onboardingStatus: OnboardingStatus
  documents: DocumentStatus[]
  createdAt?: Date
  updatedAt?: Date
}

export interface OnboardingStatus {
  currentStep: number
  completedSteps: number[]
  isComplete: boolean
  personalInfoComplete: boolean
  documentsComplete: boolean
  goHighLevelComplete: boolean
  uplineNotificationComplete: boolean
  googleEmailComplete: boolean
  payrollComplete: boolean
  googleSheetComplete: boolean
  licenseVerificationComplete: boolean
  ahipCertificationComplete: boolean
  lastActiveAt: Date
}

export interface DocumentStatus {
  id: string
  name: string
  type: DocumentType
  status: 'pending' | 'signed' | 'completed'
  signedAt?: Date
  signatureData?: string
  required: boolean
}

export type DocumentType = 'w4' | 'i9' | 'employee_agreement' | 'contract'

export interface FormData {
  personalInfo: PersonalInfo
  documents: DocumentSignature[]
  signatures: { [key: string]: string }
}

export interface PersonalInfo {
  firstName: string
  lastName: string
  dateOfBirth: string
  phone: string
  email: string
  street: string
  city: string
  state: string
  zipCode: string
  ssn: string
  npn?: string
  accountNumber: string
  routingNumber: string
  bankName: string
  licensedStates: string[]
  uplineName: string
  uplineEmail: string
}

export interface DocumentSignature {
  documentId: string
  documentType: DocumentType
  signatureData: string
  signedAt: Date
}

export interface OnboardingStep {
  id: number
  title: string
  description: string
  component: string
  isComplete: boolean
  isActive: boolean
  canAccess: boolean
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface GoHighLevelResponse {
  success: boolean
  contactId?: string
  message?: string
}

export interface GoogleEmailResponse {
  success: boolean
  email?: string
  message?: string
}

export interface PayrollResponse {
  success: boolean
  employeeId?: string
  message?: string
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  htmlContent: string
  textContent: string
  variables: string[]
}

export interface AdminDashboardData {
  totalAgents: number
  completedOnboarding: number
  inProgress: number
  pendingDocuments: number
  recentActivity: Activity[]
  completionRate: number
  monthlyStats: MonthlyStats[]
}

export interface Activity {
  id: string
  agentName: string
  action: string
  timestamp: Date
  status: 'success' | 'pending' | 'error'
}

export interface MonthlyStats {
  month: string
  completed: number
  started: number
  dropped: number
}

export interface ValidationError {
  field: string
  message: string
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

export interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  showStepInfo?: boolean
  className?: string
}

export interface StepNavigationProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onBack: () => void
  onSave?: () => void
  isNextDisabled?: boolean
  isLoading?: boolean
  nextLabel?: string
  backLabel?: string
}

export interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  type?: 'info' | 'warning' | 'error' | 'success'
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  message?: string
}

export interface SignaturePadProps {
  onSignatureChange: (signature: string) => void
  width?: number
  height?: number
  className?: string
  required?: boolean
}

export interface FileUploadProps {
  onFileUpload: (file: File) => void
  acceptedTypes?: string[]
  maxSize?: number
  className?: string
  label?: string
}

export interface StateSelectProps {
  value: string[]
  onChange: (states: string[]) => void
  multiple?: boolean
  placeholder?: string
  className?: string
  required?: boolean
}

export interface FormFieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  className?: string
  tooltip?: string
  mask?: string
  value?: string
  onChange?: (value: string) => void
}

export interface CardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  footer?: React.ReactNode
  icon?: React.ReactNode
}

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  className?: string
  icon?: React.ReactNode
  fullWidth?: boolean
}