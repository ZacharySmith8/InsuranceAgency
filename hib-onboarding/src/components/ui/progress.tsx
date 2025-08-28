"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    showSteps?: boolean
    currentStep?: number
    totalSteps?: number
    stepLabels?: string[]
  }
>(({ className, value, showSteps, currentStep, totalSteps, stepLabels, ...props }, ref) => (
  <div className="w-full">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-gradient-to-r from-hib-blue-500 to-hib-blue-600 transition-all duration-500 ease-out"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
    
    {showSteps && currentStep && totalSteps && (
      <div className="mt-4">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        
        <div className="flex justify-between">
          {Array.from({ length: totalSteps }, (_, i) => {
            const stepNumber = i + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep
            
            return (
              <div
                key={stepNumber}
                className={cn(
                  "flex flex-col items-center space-y-2",
                  "w-full max-w-[100px]"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
                    isCompleted && "bg-green-500 text-white",
                    isCurrent && "bg-hib-blue-500 text-white ring-4 ring-hib-blue-200",
                    !isCompleted && !isCurrent && "bg-gray-200 text-gray-500"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                
                {stepLabels && stepLabels[i] && (
                  <span
                    className={cn(
                      "text-xs text-center leading-tight",
                      isCurrent && "text-hib-blue-600 font-medium",
                      isCompleted && "text-green-600",
                      !isCompleted && !isCurrent && "text-gray-500"
                    )}
                  >
                    {stepLabels[i]}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )}
  </div>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }