"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Save } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepNavigationProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onBack: () => void
  onSave?: () => void
  isNextDisabled?: boolean
  isLoading?: boolean
  nextLabel?: string
  backLabel?: string
  showSave?: boolean
  className?: string
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSave,
  isNextDisabled = false,
  isLoading = false,
  nextLabel,
  backLabel = "Back",
  showSave = true,
  className
}: StepNavigationProps) {
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  const getNextLabel = () => {
    if (nextLabel) return nextLabel
    if (isLastStep) return "Complete Onboarding"
    return "Save & Continue"
  }

  return (
    <div className={cn(
      "flex items-center justify-between pt-6 border-t border-gray-200 bg-white",
      className
    )}>
      <div className="flex items-center space-x-4">
        {!isFirstStep && (
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isLoading}
            icon={<ArrowLeft className="w-4 h-4" />}
            className="min-w-[120px]"
          >
            {backLabel}
          </Button>
        )}
        
        {showSave && onSave && (
          <Button
            variant="secondary"
            onClick={onSave}
            disabled={isLoading}
            icon={<Save className="w-4 h-4" />}
            className="hidden sm:flex"
          >
            Save Draft
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* Step indicator for mobile */}
        <div className="text-sm text-gray-500 hidden sm:block">
          Step {currentStep} of {totalSteps}
        </div>

        <Button
          onClick={onNext}
          disabled={isNextDisabled || isLoading}
          loading={isLoading}
          icon={!isLastStep ? <ArrowRight className="w-4 h-4" /> : undefined}
          className="min-w-[140px]"
        >
          {getNextLabel()}
        </Button>
      </div>
    </div>
  )
}

export default StepNavigation