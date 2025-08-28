"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "border-gray-200 bg-white text-gray-900",
        success: "border-green-200 bg-green-50 text-green-800",
        error: "border-red-200 bg-red-50 text-red-800",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
        info: "border-blue-200 bg-blue-50 text-blue-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof toastVariants> & {
      onClose?: () => void
    }
>(({ className, variant, onClose, ...props }, ref) => {
  const getIcon = () => {
    switch (variant) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "info":
        return <Info className="h-5 w-5 text-blue-600" />
      default:
        return null
    }
  }

  return (
    <div
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <div className="flex items-center space-x-3">
        {getIcon()}
        <div className="flex-1">{props.children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
})
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = "ToastDescription"

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & {
    altText?: string
  }
>(({ className, altText, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = "ToastAction"

export {
  type ToastProps,
  type ToastActionElement,
  Toast,
  ToastAction,
  ToastTitle,
  ToastDescription,
}

// Toast Provider and Hook
interface ToastContextType {
  toasts: ToastMessage[]
  addToast: (toast: Omit<ToastMessage, "id">) => void
  removeToast: (id: string) => void
}

interface ToastMessage {
  id: string
  title: string
  description?: string
  variant?: "default" | "success" | "error" | "warning" | "info"
  duration?: number
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([])

  const addToast = React.useCallback((toast: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    
    setToasts((prev) => [...prev, newToast])

    // Auto remove toast after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration || 5000)
    }
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:bottom-0 sm:right-0 sm:flex-col md:max-w-[420px]">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            onClose={() => removeToast(toast.id)}
            className="mb-2 last:mb-0"
          >
            <div>
              <ToastTitle>{toast.title}</ToastTitle>
              {toast.description && (
                <ToastDescription>{toast.description}</ToastDescription>
              )}
            </div>
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}