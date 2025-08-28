"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Building2, Phone, Mail } from "lucide-react"

interface HeaderProps {
  currentStep?: number
  totalSteps?: number
  showProgress?: boolean
  className?: string
}

export function Header({ 
  currentStep = 1, 
  totalSteps = 10, 
  showProgress = true,
  className 
}: HeaderProps) {
  const progressValue = (currentStep / totalSteps) * 100

  return (
    <header className={cn("bg-white border-b border-gray-200 shadow-sm", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Company Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-hib-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Health Insurance Bureau
                </h1>
                <p className="text-sm text-gray-600">Agent Onboarding Portal</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>support@healthinsurancebureau.com</span>
            </div>
          </div>

          {/* Step Indicator */}
          {showProgress && (
            <div className="hidden sm:block">
              <Badge variant="info" size="lg">
                Step {currentStep} of {totalSteps}
              </Badge>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Onboarding Progress
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progressValue)}% Complete
              </span>
            </div>
            <Progress 
              value={progressValue} 
              className="h-2"
            />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header