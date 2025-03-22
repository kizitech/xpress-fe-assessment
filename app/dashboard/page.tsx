"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Bell, Menu, LogOut, ArrowUp, ArrowDown, MoreHorizontal, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"

// Enhanced sample data for the table
const verifiersData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    phoneNumber: "+1 (555) 123-4567",
    location: "New York",
    status: "ACTIVE",
    email: "john.smith@example.com",
    joinDate: "2023-05-12",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Williams",
    phoneNumber: "+1 (555) 987-6543",
    location: "Dallas",
    status: "ACTIVE",
    email: "jane.williams@example.com",
    joinDate: "2023-06-18",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    phoneNumber: "+1 (555) 234-5678",
    location: "Chicago",
    status: "PENDING",
    email: "michael.johnson@example.com",
    joinDate: "2023-07-24",
    lastActive: "5 days ago",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Brown",
    phoneNumber: "+1 (555) 876-5432",
    location: "Miami",
    status: "ACTIVE",
    email: "emily.brown@example.com",
    joinDate: "2023-04-30",
    lastActive: "3 hours ago",
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Jones",
    phoneNumber: "+1 (555) 345-6789",
    location: "Seattle",
    status: "INACTIVE",
    email: "david.jones@example.com",
    joinDate: "2023-03-15",
    lastActive: "2 weeks ago",
  },
  {
    id: 6,
    firstName: "Sarah",
    lastName: "Miller",
    phoneNumber: "+1 (555) 765-4321",
    location: "Boston",
    status: "PENDING",
    email: "sarah.miller@example.com",
    joinDate: "2023-08-05",
    lastActive: "1 week ago",
  },
  {
    id: 7,
    firstName: "James",
    lastName: "Davis",
    phoneNumber: "+1 (555) 456-7890",
    location: "Austin",
    status: "ACTIVE",
    email: "james.davis@example.com",
    joinDate: "2023-02-28",
    lastActive: "5 hours ago",
  },
  {
    id: 8,
    firstName: "Jennifer",
    lastName: "Garcia",
    phoneNumber: "+1 (555) 654-3210",
    location: "Denver",
    status: "INACTIVE",
    email: "jennifer.garcia@example.com",
    joinDate: "2023-01-10",
    lastActive: "3 weeks ago",
  },
  {
    id: 9,
    firstName: "Robert",
    lastName: "Rodriguez",
    phoneNumber: "+1 (555) 567-8901",
    location: "Phoenix",
    status: "ACTIVE",
    email: "robert.rodriguez@example.com",
    joinDate: "2023-09-20",
    lastActive: "12 hours ago",
  },
  {
    id: 10,
    firstName: "Lisa",
    lastName: "Wilson",
    phoneNumber: "+1 (555) 543-2109",
    location: "Portland",
    status: "SUSPENDED",
    email: "lisa.wilson@example.com",
    joinDate: "2023-10-01",
    lastActive: "4 days ago",
  },
  {
    id: 11,
    firstName: "Thomas",
    lastName: "Anderson",
    phoneNumber: "+1 (555) 678-9012",
    location: "San Francisco",
    status: "ACTIVE",
    email: "thomas.anderson@example.com",
    joinDate: "2023-11-15",
    lastActive: "1 hour ago",
  },
  {
    id: 12,
    firstName: "Jessica",
    lastName: "Martinez",
    phoneNumber: "+1 (555) 789-0123",
    location: "Los Angeles",
    status: "PENDING",
    email: "jessica.martinez@example.com",
    joinDate: "2023-12-05",
    lastActive: "2 days ago",
  },
  {
    id: 13,
    firstName: "Daniel",
    lastName: "Taylor",
    phoneNumber: "+1 (555) 890-1234",
    location: "San Diego",
    status: "ACTIVE",
    email: "daniel.taylor@example.com",
    joinDate: "2023-10-22",
    lastActive: "6 hours ago",
  },
  {
    id: 14,
    firstName: "Amanda",
    lastName: "Thomas",
    phoneNumber: "+1 (555) 901-2345",
    location: "Houston",
    status: "INACTIVE",
    email: "amanda.thomas@example.com",
    joinDate: "2023-09-14",
    lastActive: "1 month ago",
  },
  {
    id: 15,
    firstName: "Kevin",
    lastName: "White",
    phoneNumber: "+1 (555) 012-3456",
    location: "Atlanta",
    status: "SUSPENDED",
    email: "kevin.white@example.com",
    joinDate: "2023-08-30",
    lastActive: "2 months ago",
  },
]

// Sample notifications
const notificationsData = [
  {
    id: 1,
    title: "New verifier registered",
    description: "Sarah Miller has registered as a new verifier",
    time: "2 hours ago",
    read: false,
  },
  { id: 2, title: "Status update", description: "John Smith is now active", time: "5 hours ago", read: false },
  {
    id: 3,
    title: "Account suspended",
    description: "Kevin White's account has been suspended",
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    title: "New transaction",
    description: "Emily Brown processed a new transaction",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    title: "System update",
    description: "The system will undergo maintenance tonight",
    time: "3 days ago",
    read: true,
  },
]

// Mock data for dashboard
const transactionsData = [
  {
    id: "TX123456",
    customer: "John Smith",
    amount: 1250.0,
    type: "deposit",
    date: "2025-03-20",
    status: "completed",
  },
  {
    id: "TX123457",
    customer: "Sarah Johnson",
    amount: 890.5,
    type: "withdrawal",
    date: "2025-03-19",
    status: "completed",
  },
  {
    id: "TX123458",
    customer: "Michael Brown",
    amount: 3500.0,
    type: "deposit",
    date: "2025-03-19",
    status: "pending",
  },
  {
    id: "TX123459",
    customer: "Emily Davis",
    amount: 750.25,
    type: "withdrawal",
    date: "2025-03-18",
    status: "completed",
  },
  {
    id: "TX123460",
    customer: "Robert Wilson",
    amount: 1800.0,
    type: "deposit",
    date: "2025-03-18",
    status: "failed",
  },
  {
    id: "TX123461",
    customer: "Jennifer Taylor",
    amount: 2100.75,
    type: "deposit",
    date: "2025-03-17",
    status: "completed",
  },
  {
    id: "TX123462",
    customer: "David Martinez",
    amount: 450.0,
    type: "withdrawal",
    date: "2025-03-17",
    status: "completed",
  },
]

type SortConfig = {
  key: string
  direction: "ascending" | "descending"
} | null

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [verifiers, setVerifiers] = useState(verifiersData)
  const [selectAll, setSelectAll] = useState(false)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [sortConfig, setSortConfig] = useState<SortConfig>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [notifications, setNotifications] = useState(notificationsData)
  const [unreadCount, setUnreadCount] = useState(notificationsData.filter((n) => !n.read).length)
  const router = useRouter()
  const [addVerifierOpen, setAddVerifierOpen] = useState(false)
  const [newVerifier, setNewVerifier] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    status: "ACTIVE",
  })

  // Filter transactions based on search and status
  const filteredTransactions = transactionsData.filter((transaction) => {
    const matchesSearch =
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter ? transaction.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  // Calculate summary statistics
  const totalDeposits = transactionsData
    .filter((t) => t.type === "deposit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalWithdrawals = transactionsData
    .filter((t) => t.type === "withdrawal" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 border border-green-200"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200"
      case "INACTIVE":
        return "bg-gray-100 text-gray-800 border border-gray-200"
      case "SUSPENDED":
        return "bg-red-100 text-red-800 border border-red-200"
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200"
    }
  }

  const getStatusFilterColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return statusFilter === "ACTIVE"
          ? "bg-green-100 text-green-800 border-green-300 hover:bg-green-200"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      case "PENDING":
        return statusFilter === "PENDING"
          ? "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      case "INACTIVE":
        return statusFilter === "INACTIVE"
          ? "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      case "SUSPENDED":
        return statusFilter === "SUSPENDED"
          ? "bg-red-100 text-red-800 border-red-300 hover:bg-red-200"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      default:
        return "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
    }
  }

  // Sorting logic
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })
  }

  const getSortedData = (data: typeof verifiersData) => {
    if (!sortConfig) return data

    return [...data].sort((a, b) => {
      // @ts-ignore - We know these keys exist in our data
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      // @ts-ignore - We know these keys exist in our data
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })
  }

  const getSortIcon = (name: string) => {
    if (!sortConfig || sortConfig.key !== name) {
      return <ChevronDown className="h-4 w-4 opacity-50" />
    }
    return sortConfig.direction === "ascending" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  // Apply both filters and sorting
  const filteredVerifiers = getSortedData(
    verifiers.filter(
      (verifier) =>
        (statusFilter ? verifier.status === statusFilter : true) &&
        (verifier.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          verifier.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          verifier.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          verifier.email.toLowerCase().includes(searchTerm.toLowerCase())),
    ),
  )

  const handleSelectAll = () => {
    setSelectAll(!selectAll)
    if (!selectAll) {
      setSelectedRows(filteredVerifiers.map((v) => v.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const handleLogout = () => {
    logout()
  }

  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status === statusFilter ? null : status)
  }

  const handleNotificationRead = (id: number) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    )
    setNotifications(updatedNotifications)
    setUnreadCount(updatedNotifications.filter((n) => !n.read).length)
  }

  const handleMarkAllRead = () => {
    const updatedNotifications = notifications.map((notification) => ({ ...notification, read: true }))
    setNotifications(updatedNotifications)
    setUnreadCount(0)
  }

  const handleAddVerifier = (e: React.FormEvent) => {
    e.preventDefault()

    // Create a new verifier with the form data
    const verifier = {
      id: verifiers.length + 1,
      ...newVerifier,
      joinDate: new Date().toISOString().split("T")[0],
      lastActive: "Just now",
    }

    // Add the new verifier to the list
    setVerifiers([verifier, ...verifiers])

    // Reset the form and close the modal
    setNewVerifier({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      location: "",
      status: "ACTIVE",
    })
    setAddVerifierOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`${isMobile ? "fixed z-30 h-full" : ""} bg-white shadow-sm ${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 flex flex-col ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"}`}
      >
        <div className="p-4 border-b">
          <div className="text-blue-500 font-bold text-2xl">XPRESS</div>
        </div>
        <nav className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-3 py-2 rounded-md bg-blue-50 text-blue-600 border-l-4 border-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              {sidebarOpen && <span>Dashboard</span>}
            </Link>
            <Link
              href="/verifiers"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              {sidebarOpen && <span>Verifiers</span>}
            </Link>
            <Link
              href="/transactions"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              {sidebarOpen && <span>Transactions</span>}
            </Link>
          </div>

          {/* Logout Button */}
          <div className="mt-auto pt-4 border-t">
            <button
              onClick={handleLogout}
              className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
            >
              <LogOut size={20} />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none"
              >
                <Menu size={24} />
              </button>
              <h1 className="ml-4 text-xl font-medium">Verifiers</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="relative p-1 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none">
                    <Bell className="h-6 w-6" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-medium">Notifications</h3>
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMarkAllRead}
                        className="text-xs text-blue-500 hover:text-blue-600"
                      >
                        Mark all as read
                      </Button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">No notifications</div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b last:border-b-0 ${notification.read ? "bg-white" : "bg-blue-50"}`}
                          onClick={() => handleNotificationRead(notification.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-sm font-medium">{notification.title}</h4>
                              <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && <Badge className="bg-blue-500 text-white">New</Badge>}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm">
            {/* Toolbar */}
            <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 w-full">
                <div className="w-[150px]">
                  <Select
                    value={statusFilter || "all"}
                    onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
                  >
                    <SelectTrigger className="bg-white border-gray-200">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="ACTIVE">Active Verifiers</SelectItem>
                      <SelectItem value="PENDING">Pending Verifiers</SelectItem>
                      <SelectItem value="INACTIVE">Deactivated Verifiers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Name/Phone/Location"
                    className="pl-10 border-gray-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Dialog open={addVerifierOpen} onOpenChange={setAddVerifierOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-500 hover:bg-blue-600 whitespace-nowrap">
                    <Plus className="mr-2 h-4 w-4" /> Add New Verifier
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Verifier</DialogTitle>
                    <DialogDescription>Fill in the details to add a new verifier to the system.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddVerifier}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={newVerifier.firstName}
                            onChange={(e) => setNewVerifier({ ...newVerifier, firstName: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={newVerifier.lastName}
                            onChange={(e) => setNewVerifier({ ...newVerifier, lastName: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newVerifier.email}
                          onChange={(e) => setNewVerifier({ ...newVerifier, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          value={newVerifier.phoneNumber}
                          onChange={(e) => setNewVerifier({ ...newVerifier, phoneNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newVerifier.location}
                          onChange={(e) => setNewVerifier({ ...newVerifier, location: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={newVerifier.status}
                          onValueChange={(value) => setNewVerifier({ ...newVerifier, status: value })}
                        >
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                            <SelectItem value="SUSPENDED">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setAddVerifierOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                        Add Verifier
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="p-4 w-10">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="p-4">
                      <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => requestSort("firstName")}
                      >
                        <span>First Name</span>
                        {getSortIcon("firstName")}
                      </button>
                    </th>
                    <th className="p-4">
                      <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => requestSort("lastName")}
                      >
                        <span>Last Name</span>
                        {getSortIcon("lastName")}
                      </button>
                    </th>
                    <th className="p-4">
                      <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => requestSort("email")}
                      >
                        <span>Email</span>
                        {getSortIcon("email")}
                      </button>
                    </th>
                    <th className="p-4">
                      <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => requestSort("phoneNumber")}
                      >
                        <span>Phone Number</span>
                        {getSortIcon("phoneNumber")}
                      </button>
                    </th>
                    <th className="p-4">
                      <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => requestSort("location")}
                      >
                        <span>Location</span>
                        {getSortIcon("location")}
                      </button>
                    </th>
                    <th className="p-4">
                      <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => requestSort("status")}
                      >
                        <span>Status</span>
                        {getSortIcon("status")}
                      </button>
                    </th>
                    <th className="p-4">
                      <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => requestSort("lastActive")}
                      >
                        <span>Last Active</span>
                        {getSortIcon("lastActive")}
                      </button>
                    </th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredVerifiers.map((verifier) => (
                    <tr key={verifier.id} className="hover:bg-gray-50">
                      <td className="p-4 w-10">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                          checked={selectedRows.includes(verifier.id)}
                          onChange={() => handleSelectRow(verifier.id)}
                        />
                      </td>
                      <td className="p-4">{verifier.firstName}</td>
                      <td className="p-4">{verifier.lastName}</td>
                      <td className="p-4">{verifier.email}</td>
                      <td className="p-4">{verifier.phoneNumber}</td>
                      <td className="p-4">{verifier.location}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(verifier.status)}`}
                        >
                          {verifier.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">{verifier.lastActive}</td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500 text-center sm:text-left">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredVerifiers.length}</span> of{" "}
                <span className="font-medium">{verifiers.length}</span> results
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

