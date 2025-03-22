"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function SignUpStep1() {
  const [businessName, setBusinessName] = useState("")
  const [businessAddress, setBusinessAddress] = useState("")
  const [businessPhone, setBusinessPhone] = useState("")
  const [businessCategory, setBusinessCategory] = useState("")
  const [accountId, setAccountId] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/sign-up/step-2")
  }

  const handleFileUpload = () => {
    setIsUploading(true)
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false)
    }, 1500)
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
          <div>
            <h2 className="text-sm font-medium text-blue-500 mb-4">Business Information</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="businessName" className="block text-sm text-blue-500 mb-1">
                  Business Name
                </label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="businessAddress" className="block text-sm text-blue-500 mb-1">
                  Business Street Address
                </label>
                <Input
                  id="businessAddress"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="businessPhone" className="block text-sm text-blue-500 mb-1">
                  Business Phone Number
                </label>
                <Input
                  id="businessPhone"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="businessCategory" className="block text-sm text-blue-500 mb-1">
                  Business Category
                </label>
                <Select value={businessCategory} onValueChange={setBusinessCategory} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="accountId" className="block text-sm text-blue-500 mb-1">
                  Account ID
                </label>
                <Input
                  id="accountId"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-blue-500 mb-1">Upload Logo (optional)</label>
                <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-500"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">Drag & drop or click to upload</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={handleFileUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Browse Files"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <div className="text-sm text-gray-500">
              Step <span className="font-medium">1</span> of 2
            </div>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

