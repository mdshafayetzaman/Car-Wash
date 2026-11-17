'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  User,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Phone,
  Loader2,
} from 'lucide-react'

import { toast } from 'react-toastify'
import { cn } from '@/lib/utils'
import { authClient } from '@/app/api/lib/auth-client'

export const PHONE_NUMBER = '+880170678-5160'
export const PHONE_HREF = 'tel:+8801706785160'
export const WHATSAPP_HREF = 'https://wa.me/8801706785160'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn('size-5', className)}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.885 3.488" />
    </svg>
  )
}

export default function Header() {
  const router = useRouter()

  const { data: session, isPending } = authClient.useSession()

  const [isSigningOut, setIsSigningOut] = useState(false)

  const user = session?.user

  const userName = user?.name || 'User'
  const userEmail = user?.email || ''
  const userImage = user?.image

  const userInitial = userName.charAt(0).toUpperCase()

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)

      await authClient.signOut()

      toast.success('Signed out successfully!')

      router.replace('/')
      router.refresh()
    } catch {
      toast.error('Unable to sign out. Please try again.')
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <header className="relative z-50 w-full border-b border-white/10 bg-brand-navy text-white shadow-lg">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:h-[76px] lg:px-10">
        <Link
          href="/"
          aria-label="Car wash home"
          className="shrink-0 rounded-full transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.svg"
            alt="Car Wash"
            width={56}
            height={56}
            priority
            className="h-11 w-11 sm:h-14 sm:w-14"
          />
        </Link>

        <div className="flex items-center gap-3 sm:gap-5 lg:gap-8">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 text-[15px] transition-colors hover:text-brand-yellow md:flex"
          >
            <Phone className="size-4 text-brand-yellow" />
            <span className="font-normal text-white/70">Call us now:</span>
            <span className="font-semibold text-white">{PHONE_NUMBER}</span>
          </a>

          <a
            href={PHONE_HREF}
            aria-label={`Call ${PHONE_NUMBER}`}
            className="flex size-9 items-center justify-center rounded-full text-white/90 transition-colors hover:text-brand-yellow md:hidden"
          >
            <Phone className="size-[18px]" />
          </a>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="flex size-9 items-center justify-center rounded-full text-white/90 transition-colors hover:text-brand-yellow"
          >
            <WhatsAppIcon />
          </a>

          {isPending ? (
            <div className="flex h-10 w-24 items-center justify-center rounded-full bg-white/10">
              <Loader2 className="size-4 animate-spin text-brand-yellow" />
            </div>
          ) : user ? (
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3 transition-all hover:border-brand-yellow/50 hover:bg-white/10 [&::-webkit-details-marker]:hidden">
                {userImage ? (
                  <Image
                    src={userImage}
                    alt={userName}
                    width={36}
                    height={36}
                    unoptimized
                    className="size-9 rounded-full border-2 border-brand-yellow/70 object-cover"
                  />
                ) : (
                  <div className="flex size-9 items-center justify-center rounded-full bg-brand-yellow text-sm font-bold text-brand-navy">
                    {userInitial}
                  </div>
                )}

                <span className="hidden max-w-[110px] truncate text-sm font-semibold sm:block">
                  {userName}
                </span>

                <ChevronDown className="size-4 text-white/60 transition-transform group-open:rotate-180" />
              </summary>

              <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0D1935] shadow-2xl shadow-black/30">
                <div className="border-b border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    {userImage ? (
                      <Image
                        src={userImage}
                        alt={userName}
                        width={44}
                        height={44}
                        unoptimized
                        className="size-11 rounded-full border border-brand-yellow/50 object-cover"
                      />
                    ) : (
                      <div className="flex size-11 items-center justify-center rounded-full bg-brand-yellow text-lg font-bold text-brand-navy">
                        {userInitial}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {userName}
                      </p>
                      <p className="truncate text-xs text-white/50">
                        {userEmail}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 inline-flex items-center rounded-full border border-green-400/20 bg-green-400/10 px-2.5 py-1 text-[11px] font-medium text-green-400">
                    <span className="mr-1.5 size-1.5 rounded-full bg-green-400" />
                    Active account
                  </div>
                </div>

                <div className="p-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-brand-yellow"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-brand-yellow"
                  >
                    <User className="size-4" />
                    My Profile
                  </Link>
                </div>

                <div className="border-t border-white/10 p-2">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-400/10',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                    )}
                  >
                    {isSigningOut ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <LogOut className="size-4" />
                    )}

                    {isSigningOut ? 'Signing out...' : 'Sign Out'}
                  </button>
                </div>
              </div>
            </details>
          ) : (
            <Link
              href="/signin"
              className="flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-2.5 text-sm font-semibold text-brand-navy shadow-md shadow-brand-yellow/10 transition-all hover:-translate-y-0.5 hover:bg-white sm:px-5"
            >
              <User className="size-4" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
