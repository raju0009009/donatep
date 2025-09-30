"use client"

import React from "react"
import { X, Heart, Shield, CreditCard, Smartphone, Banknote, Flag, User, Mail, MapPin, Building2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent } from "@/components/ui/card"

type Props = {
  open: boolean
  onClose: () => void
  initialAmount?: number
}

const PRESETS = [500, 1000, 2500, 5000, 10000]
const TIP_OPTIONS = [0, 5, 10, 15, 20]
const PAYMENT_METHODS = [
  { value: 'upi', label: 'UPI Payment', icon: Smartphone, description: 'Instant & Secure' },
  { value: 'card', label: 'Credit/Debit Card', icon: CreditCard, description: 'All Major Cards' },
  { value: 'bank', label: 'Bank Transfer', icon: Banknote, description: 'Direct Deposit' }
]

export function DonationModal({ open, onClose, initialAmount }: Props) {
  const [selectedPreset, setSelectedPreset] = React.useState<number>(3000)
  const [amount, setAmount] = React.useState<string>("3000")
  const [fullName, setFullName] = React.useState<string>("")
  const [email, setEmail] = React.useState<string>("")
  const [phone, setPhone] = React.useState<string>("")
  const [address, setAddress] = React.useState<string>("")
  const [tipPct, setTipPct] = React.useState<number>(10)
  const [paymentMethod, setPaymentMethod] = React.useState<string>('upi')
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false)

  React.useEffect(() => {
    // keep input in sync when preset changes
    setAmount(selectedPreset.toString())
  }, [selectedPreset])

  React.useEffect(() => {
    if (initialAmount && open) {
      setSelectedPreset(initialAmount)
      setAmount(initialAmount.toString())
    }
  }, [initialAmount, open])

  const minAmount = 300
  const amountNum = parseInt(amount) || 0
  const tipAmount = Math.max(0, Math.round((amountNum * tipPct) / 100))
  const total = amountNum + tipAmount

  const formatINR = (n: number) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`

  const handleAttemptClose = () => setConfirmOpen(true)

  const handlePayment = async () => {
    if (amountNum < minAmount || !fullName || !email || !phone) {
      return
    }

    setIsProcessing(true)
    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          phone: `+91${phone.replace(/\s/g, '')}`,
          fullName,
          email,
          address,
          tipPercentage: tipPct,
        }),
      })

      const data = await response.json()

      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        alert('Payment failed. Please try again.')
        setIsProcessing(false)
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
      setIsProcessing(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full min-w-full md:min-w-[50vw] flex flex-col h-[calc(100%-1.2rem)] md:h-[90vh] max-w-4xl mx-4 bg-background border rounded-2xl shadow-2xl overflow-hidden">
        {/* Background illustration with opacity */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07] z-0">
          <Image
            src="/flood1.png"
            alt="Donation illustration"
            width={300}
            height={300}
            className="w-[300px] h-[300px] object-cover rounded-lg"
          />
        </div>

        {/* Close button */}
        <button
          onClick={handleAttemptClose}
          className="absolute top-2 right-2 z-10"
          aria-label="Close Dialog"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4">
            <p className="font-bold text-lg">Donate Now</p>
          </div>

          {/* Main content */}
          <div className="px-4 md:px-8 lg:px-10 py-3 flex-1 overflow-y-auto z-1">
            <div className="pb-24">
              {/* Mobile Amount Selection */}
              <div className="block lg:hidden mb-4">
                <p className="mb-2">Choose an amount to donate</p>
                <div className="flex items-center justify-around gap-2 flex-row">
                  {[1500, 3000, 5000, 19999].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setSelectedPreset(amt)
                        setAmount(amt.toString())
                      }}
                      className={cn(
                        "flex-1 text-sm md:text-lg px-3 py-2 rounded-lg border transition-all",
                        selectedPreset === amt
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:bg-accent"
                      )}
                    >
                      {formatINR(amt)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label htmlFor="amount" className="text-sm font-medium mb-2 block">
                  Amount (INR)
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <span className="text-lg text-muted-foreground font-semibold">₹</span>
                  </div>
                  <input
                    id="amount"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 pl-10 text-xl border border-input rounded-lg bg-background"
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      setAmount(value)
                      setSelectedPreset(0)
                    }}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Minimum Amount for Donation is {formatINR(minAmount)} {amountNum > 0 && amountNum < minAmount && <span className="text-red-500">(Amount too low)</span>}
                </p>
              </div>

              {/* Tip Section */}
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                <p className="text-sm mb-2">
                  By tipping Charitism, you support us to grow our impact and connect with more initiatives. Thank you 🙏.
                </p>
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-2 p-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm md:text-sm lg:text-base">Tip Amount:</p>
                    <div>
                      <p className="font-bold">{formatINR(tipAmount)}</p>
                    </div>
                  </div>
                  <div>
                    <Select value={String(tipPct)} onValueChange={(v) => setTipPct(Number(v))}>
                      <SelectTrigger className="bg-white w-48 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20">20 % | {formatINR(Math.round((amountNum * 20) / 100))}</SelectItem>
                        <SelectItem value="15">15 % | {formatINR(Math.round((amountNum * 15) / 100))}</SelectItem>
                        <SelectItem value="10">10 % | {formatINR(Math.round((amountNum * 10) / 100))}</SelectItem>
                        <SelectItem value="5">5 % | {formatINR(Math.round((amountNum * 5) / 100))}</SelectItem>
                        <SelectItem value="0">No tip</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-2 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <input
                      id="name"
                      placeholder="Name"
                      className="w-full px-4 py-2 pl-10 border border-input rounded-lg bg-background"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email_id" className="text-sm font-medium mb-2 block">
                    Email Id
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <input
                      id="email_id"
                      type="email"
                      placeholder="Email Id"
                      className="w-full px-4 py-2 pl-10 border border-input rounded-lg bg-background"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="mobile_no" className="text-sm font-medium mb-2 block">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
                      <Flag className="w-4 h-4 text-muted-foreground" />
                      <span className="ml-1 text-sm text-muted-foreground">+91</span>
                    </div>
                    <input
                      id="mobile_no"
                      type="tel"
                      placeholder="00000 00000"
                      className="w-full px-4 py-2 pl-16 border border-input rounded-lg bg-background"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="text-sm font-medium mb-2 block">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <input
                      id="address"
                      placeholder="Address"
                      className="w-full px-4 py-2 pl-10 border border-input rounded-lg bg-background"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Section */}
          <div className="flex flex-col items-center justify-center gap-0 p-3 bg-gradient-to-r from-primary/5 to-primary/10">
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 text-lg shadow-lg"
              disabled={amountNum < minAmount || !fullName || !email || !phone || isProcessing}
              onClick={handlePayment}
            >
              {isProcessing ? 'Processing...' : `Checkout Now | ${formatINR(total)}`}
            </Button>
            <div className="flex items-center justify-center gap-1 flex-row pb-0 mt-2 mb-0">
              <p className="font-bold text-xs">Secured by</p>
              <Image
                src="/razorpay.png"
                alt="Razorpay"
                width={24}
                height={24}
                className="h-6 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Confirmation Dialog */}
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent className="sm:max-w-md">
            <AlertDialogHeader>
              <div className="mx-auto mb-3 mt-1 w-[200px]">
                <Image
                  src="/donation-1.jpg"
                  alt="Illustration encouraging users to continue donating"
                  width={400}
                  height={300}
                  className="h-auto w-full"
                  priority
                />
              </div>
              <AlertDialogTitle className="text-center text-xl">Please don&apos;t go yet</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Your humble donations have the power to transform many lives positively and make a lasting impact
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="mt-2 grid gap-3 sm:grid-cols-1">
              <AlertDialogAction
                className="h-11 w-full rounded-lg text-[0.95rem] font-semibold"
                onClick={() => setConfirmOpen(false)}
              >
                YES, I WILL HELP
              </AlertDialogAction>
              <AlertDialogCancel
                className="h-11 w-full rounded-lg text-[0.95rem]"
                onClick={() => {
                  setConfirmOpen(false)
                  onClose()
                }}
              >
                SORRY, NOT TODAY
              </AlertDialogCancel>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
