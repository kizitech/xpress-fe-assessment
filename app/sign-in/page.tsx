"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-md shadow-sm p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 sm:mb-8">
          <div className="text-blue-500 font-bold text-2xl">XPRESS</div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">New to Xpress Rewards?</span>
            <Link href="/sign-up/step-1" className="text-blue-500 font-medium">
              Sign Up
            </Link>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl font-medium text-blue-500 mb-1">Welcome Back!</h1>
          <p className="text-sm text-gray-500">Log in to your Xpress Rewards account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-blue-500">
              Email Address
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

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm text-blue-500">
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

          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-blue-500">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}

