"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function SignUpStep2() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [contactPreference, setContactPreference] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPendingModal, setShowPendingModal] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowPendingModal(true)
  }

  const handleCloseModal = () => {
    setShowPendingModal(false)
    router.push("/sign-in")
  }

  const handleBack = () => {
    router.push("/sign-up/step-1")
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-md shadow-sm p-4 sm:p-8">
        <div className="grid gap-1 md:flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">XPRESS</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Already have an account?</span>
            <Link href="/sign-in" className="text-blue-500 font-medium">
              Sign In
            </Link>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl font-medium text-blue-500 mb-1">Welcome to Xpress Rewards</h1>
          <p className="text-sm text-gray-500">Complete the form to sign up</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm text-blue-500 mb-1">
                  First Name
                </label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm text-blue-500 mb-1">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-blue-500 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm text-blue-500 mb-1">
                  City
                </label>
                <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} className="w-full" required />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm text-blue-500 mb-1">
                  State
                </label>
                <Select value={state} onValueChange={setState} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AL">Alabama</SelectItem>
                    <SelectItem value="AK">Alaska</SelectItem>
                    <SelectItem value="AZ">Arizona</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="CO">Colorado</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    {/* Add more states as needed */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="contactPreference" className="block text-sm text-blue-500 mb-1">
                Contact Preference (Optional)
              </label>
              <Select value={contactPreference} onValueChange={setContactPreference}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm text-blue-500 mb-1">
                Contact Phone Number
              </label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-blue-500 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-blue-500 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
            <div className="text-sm text-gray-500 order-2 sm:order-1">
              Step <span className="font-medium">2</span> of 2
            </div>
            <div className="flex gap-2 w-full sm:w-auto order-1 sm:order-2">
              <Button type="button" variant="outline" onClick={handleBack} className="flex-1 sm:flex-auto">
                Back
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 flex-1 sm:flex-auto">
                Continue
              </Button>
            </div>
          </div>
        </form>

        {/* Pending Modal */}
        {showPendingModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md bg-white rounded-md shadow-sm p-6 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-yellow-400"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <h1 className="text-xl font-medium mb-2">Pending</h1>
                <p className="text-gray-500 mb-6">Your application is pending. Approval may take up to 48 hours</p>
              </div>

              <Button onClick={handleCloseModal} className="w-full bg-blue-500 hover:bg-blue-600">
                Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

