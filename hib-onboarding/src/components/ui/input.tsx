"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  icon?: React.ReactNode
  mask?: string
  onMaskedChange?: (value: string, rawValue: string) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, mask, onMaskedChange, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [maskedValue, setMaskedValue] = React.useState("")

    const applyMask = (value: string, maskPattern: string): string => {
      let result = ""
      let valueIndex = 0
      
      for (let i = 0; i < maskPattern.length && valueIndex < value.length; i++) {
        if (maskPattern[i] === "X") {
          result += value[valueIndex]
          valueIndex++
        } else {
          result += maskPattern[i]
        }
      }
      
      return result
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, "")
      
      if (mask && onMaskedChange) {
        let masked = ""
        if (mask === "phone") {
          masked = rawValue.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
        } else if (mask === "ssn") {
          masked = rawValue.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3")
        } else if (mask === "zipcode") {
          masked = rawValue.slice(0, 5)
        } else {
          masked = applyMask(rawValue, mask)
        }
        
        setMaskedValue(masked)
        onMaskedChange(masked, rawValue)
      } else {
        onChange?.(e)
      }
    }

    const inputType = type === "password" && showPassword ? "text" : type

    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={inputType}
          className={cn(
            "flex h-12 w-full rounded-lg border border-gray-300 bg-background px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hib-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            icon && "pl-10",
            type === "password" && "pr-10",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          value={mask ? maskedValue : undefined}
          onChange={handleChange}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }