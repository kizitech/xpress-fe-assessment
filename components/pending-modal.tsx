"use client"

import { useRouter } from "next/navigation"

interface PendingModalProps {
    isOpen: boolean
    onClose: () => void
}

export function PendingModal({ isOpen, onClose }: PendingModalProps) {
    const router = useRouter()

    if (!isOpen) return null

    const handleSignIn = () => {
        router.push("/signin")
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-amber-400"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-center mb-2">Pending</h3>
                <p className="text-gray-500 text-center text-sm mb-6">
                    Your registration is awaiting approval from our partnership team.
                </p>
                <button
                    onClick={handleSignIn}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Done
                </button>
            </div>
        </div>
    )
}

