'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

import { AuthBrandPanel } from './AuthBrandPanel'
import { AuthField, authInputClass } from './AuthField'
import { PasswordInput } from './PasswordInput'
import { SocialAuthButtons } from './SocialAuthButtons'
import { useDarkTheme } from '@/hooks/use-dark-theme'
import { authClient } from '@/app/api/lib/auth-client'

export function SignUpForm() {
  useDarkTheme()

  const router = useRouter()

  const [isPending, setIsPending] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError(null)

    const formData = new FormData(event.currentTarget)

    const values = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      password: String(formData.get('password') ?? ''),
      confirmPassword: String(formData.get('confirmPassword') ?? ''),
    }

    if (!values.name || !values.email || !values.password) {
      setError('Please fill in all required fields.')
      return
    }

    if (values.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!agreeToTerms) {
      setError('Please accept the terms to continue.')
      return
    }

    try {
      setIsPending(true)

      const { error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      })

      if (error) {
        throw new Error(error.message)
      }

      toast.success('Account created successfully! Welcome to Car Wash.')

      router.replace('/')
      router.refresh()
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'

      setError(message)
      toast.error(message)
    } finally {
      setIsPending(false)
    }
  }

  async function handleSocialSignup(provider: 'google' | 'github' | 'apple') {
    try {
      setError(null)
      setIsPending(true)

      await authClient.signIn.social({
        provider,
        callbackURL: '/',
      })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Social signup failed.'

      setError(message)
      toast.error(message)
      setIsPending(false)
    }
  }

  return (
    <div className="dark relative min-h-dvh overflow-hidden bg-[#071029] text-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-[1180px] flex-col lg:flex-row lg:items-stretch lg:shadow-[0_0_80px_rgba(0,0,0,0.35)]">
        <AuthBrandPanel />

        <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-10 lg:px-14">
          <div className="w-full max-w-[400px]">
            <Link
              href="/"
              className="mb-8 flex items-center gap-2.5 lg:hidden"
              aria-label="Car wash home"
            >
              <Image
                src="/logo.svg"
                alt="Car Wash"
                width={40}
                height={40}
                className="size-10 rounded-full"
              />

              <span className="text-base font-semibold tracking-tight">
                Car Wash
              </span>
            </Link>

            <h2 className="text-3xl font-semibold tracking-tight">
              Create your account
            </h2>

            <p className="mt-1.5 text-[15px] text-white/50">
              Start booking spotless washes in under a minute.
            </p>

            <SocialAuthButtons className="mt-8" onSelect={handleSocialSignup} />

            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-white/10" />

              <span className="text-xs font-medium tracking-widest text-white/35 uppercase">
                or
              </span>

              <span className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <AuthField id="signup-name" label="Full name">
                <Input
                  id="signup-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Rakib Hasan"
                  required
                  disabled={isPending}
                  className={authInputClass}
                />
              </AuthField>

              <AuthField id="signup-email" label="Email address">
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  disabled={isPending}
                  className={authInputClass}
                />
              </AuthField>

              <AuthField
                id="signup-password"
                label="Password"
                hint="Must be at least 8 characters."
              >
                <PasswordInput
                  id="signup-password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  required
                  minLength={8}
                  disabled={isPending}
                  className={authInputClass}
                />
              </AuthField>

              <AuthField id="signup-confirm" label="Confirm password">
                <PasswordInput
                  id="signup-confirm"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  required
                  disabled={isPending}
                  className={authInputClass}
                />
              </AuthField>

              <label className="flex cursor-pointer items-start gap-2.5 text-[13px] leading-relaxed text-white/60 select-none">
                <Checkbox
                  name="agreeToTerms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) =>
                    setAgreeToTerms(checked === true)
                  }
                  disabled={isPending}
                  className="mt-0.5 border-white/20 bg-white/5 data-checked:border-brand-yellow data-checked:text-brand-navy dark:data-checked:bg-brand-yellow"
                />

                <span>
                  I agree to the{' '}
                  <Link
                    href="/terms"
                    className="font-medium text-brand-yellow underline-offset-2 hover:underline"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="font-medium text-brand-yellow underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-400/30 bg-red-400/10 px-3.5 py-2.5 text-sm text-red-300"
                >
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isPending || !agreeToTerms}
                className={cn(
                  'h-11 w-full rounded-lg bg-brand-yellow text-[15px] font-semibold text-brand-navy',
                  'hover:bg-brand-yellow-dark focus-visible:ring-2 focus-visible:ring-brand-yellow/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071029] focus-visible:outline-none',
                  'disabled:bg-white/10 disabled:text-white/45 disabled:opacity-100',
                )}
              >
                {isPending ? (
                  <>
                    <Loader2
                      className="size-4 animate-spin"
                      aria-hidden="true"
                    />
                    Creating account…
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-white/50">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="font-semibold text-brand-yellow transition-opacity hover:opacity-80"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
