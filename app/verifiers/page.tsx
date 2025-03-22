"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Bell, Menu, LogOut, ArrowUp, ArrowDown, MoreHorizontal, ChevronDown, UsersRound, Banknote, Tags, AlignJustify } from "lucide-react"
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
import { verifiersData } from "@/data/verifiersData"
import { notificationsData } from "@/data/notificationsData"
import { transactionsData } from "@/data/transactionsData"

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
        <div className="p-4 border-b flex items-center justify-between">
          <div className={`font-bold text-2xl ${sidebarOpen ? "text-blue-500" : "text-white w-0"}`}>XPRESS</div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none"
          >
            <AlignJustify size={24} />
          </button>
        </div>
        <nav className="flex-1 p-4 mt-4 flex flex-col justify-between">
          <div className="space-y-6">
            <Link
              href="/verifiers"
              className="flex items-center space-x-3 px-3 py-2 rounded-md bg-blue-50 text-blue-600 border-l-4 border-blue-500"
            >
              <UsersRound />
              {sidebarOpen && <span>Verifiers</span>}
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
            >
              <Tags />
              {sidebarOpen && <span>Deals</span>}
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
            >
              <Banknote />
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
              <div className="md:hidden">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-1 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none"
                >
                  <Menu size={24} />
                </button>
              </div>
              <h1 className="ml-4 text-xl font-medium"><span className="text-blue-500 text-2xl font-bold">!!</span> Verifiers</h1>
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
                        className="flex text-nowrap items-center space-x-1 focus:outline-none"
                        onClick={() => requestSort("firstName")}
                      >
                        <span>First Name</span>
                        {getSortIcon("firstName")}
                      </button>
                    </th>
                    <th className="p-4">
                      <button
                        className="flex text-nowrap items-center space-x-1 focus:outline-none"
                        onClick={() => requestSort("lastName")}
                      >
                        <span>Last Name</span>
                        {getSortIcon("lastName")}
                      </button>
                    </th>
                    <th className="p-4">
                      <button
                        className="flex text-nowrap items-center space-x-1 focus:outline-none"
                        onClick={() => requestSort("email")}
                      >
                        <span>Email</span>
                        {getSortIcon("email")}
                      </button>
                    </th>
                    <th className="p-4">
                      <button
                        className="flex text-nowrap items-center space-x-1 focus:outline-none"
                        onClick={() => requestSort("phoneNumber")}
                      >
                        <span>Phone Number</span>
                        {getSortIcon("phoneNumber")}
                      </button>
                    </th>
                    <th className="p-4">
                      <button
                        className="flex text-nowrap items-center space-x-1 focus:outline-none"
                        onClick={() => requestSort("location")}
                      >
                        <span>Location</span>
                        {getSortIcon("location")}
                      </button>
                    </th>
                    <th className="p-4">
                      <button
                        className="flex text-nowrap items-center space-x-1 focus:outline-none"
                        onClick={() => requestSort("status")}
                      >
                        <span>Status</span>
                        {getSortIcon("status")}
                      </button>
                    </th>
                    <th className="p-4">
                      <button
                        className="flex text-nowrap items-center space-x-1 focus:outline-none"
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
                      <td className="p-4 text-nowrap">{verifier.firstName}</td>
                      <td className="p-4 text-nowrap">{verifier.lastName}</td>
                      <td className="p-4 text-nowrap">{verifier.email}</td>
                      <td className="p-4 text-nowrap">{verifier.phoneNumber}</td>
                      <td className="p-4 text-nowrap">{verifier.location}</td>
                      <td className="p-4 text-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(verifier.status)}`}
                        >
                          {verifier.status}
                        </span>
                      </td>
                      <td className="p-4 text-nowrap text-sm text-gray-500">{verifier.lastActive}</td>
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

