"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Building2, Shield, Lock, HelpCircle } from "lucide-react"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("bg-gray-50 border-t border-gray-200", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-hib-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Health Insurance Bureau
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Empowering insurance agents with comprehensive onboarding and support. 
              Join our team of dedicated professionals serving clients nationwide.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-1">
                <Lock className="w-4 h-4" />
                <span>SSL Secured</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-hib-blue-600 transition-colors">
                  Agent Portal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-hib-blue-600 transition-colors">
                  Training Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-hib-blue-600 transition-colors">
                  Commission Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-hib-blue-600 transition-colors">
                  Marketing Materials
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 hover:text-hib-blue-600 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Help Center</span>
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="hover:text-hib-blue-600 transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@healthinsurancebureau.com" 
                  className="hover:text-hib-blue-600 transition-colors"
                >
                  support@healthinsurancebureau.com
                </a>
              </li>
              <li>
                <span className="text-xs text-gray-500">
                  Mon-Fri 8AM-8PM EST
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span>© 2024 Health Insurance Bureau. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-hib-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-hib-blue-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-hib-blue-600 transition-colors">
                Compliance
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer