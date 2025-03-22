"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check for existing session on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Protect routes
  useEffect(() => {
    if (!isLoading) {
      // If user is not logged in and trying to access dashboard
      if (!user && pathname.startsWith("/verifiers")) {
        router.push("/signin")
      }

      // If user is logged in and trying to access auth pages
      if (user && (pathname === "/signin" || pathname === "/signup")) {
        router.push("/verifiers")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Mock API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // Mock successful login
        const mockUser = {
          id: "user-123",
          name: "John Doe",
          email: email,
        }

        setUser(mockUser)
        try {
          localStorage.setItem("user", JSON.stringify(mockUser))
        } catch (error) {
          console.error("Error setting localStorage:", error)
        }
        setIsLoading(false)
        resolve(true)
      }, 1000)
    })
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Mock API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // Mock successful signup
        const mockUser = {
          id: "user-" + Math.floor(Math.random() * 1000),
          name: name,
          email: email,
        }

        setUser(mockUser)
        try {
          localStorage.setItem("user", JSON.stringify(mockUser))
        } catch (error) {
          console.error("Error setting localStorage:", error)
        }
        setIsLoading(false)
        resolve(true)
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem("user")
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
    router.push("/signin")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

