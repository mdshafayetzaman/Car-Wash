'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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

export function SignInForm() {
  useDarkTheme()

  const router = useRouter()

  const [isPending, setIsPending] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError(null)
    setIsPending(true)

    try {
      const formData = new FormData(event.currentTarget)

      const values = {
        email: String(formData.get('email') ?? '').trim(),
        password: String(formData.get('password') ?? ''),
        rememberMe,
      }

      if (!values.email || !values.password) {
        throw new Error('Please enter your email and password.')
      }

      const { error: authError } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      })

      if (authError) {
        throw new Error(authError.message || 'Invalid email or password.')
      }

      toast.success('Login successful!')

      router.push('/')
      router.refresh()
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'

      setError(message)
      toast.error(message)
    } finally {
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
              Welcome back
            </h2>

            <p className="mt-1.5 text-[15px] text-white/50">
              Sign in to book your next wash in seconds.
            </p>

            <SocialAuthButtons
              className="mt-8"
              onSelect={async (provider) => {
                try {
                  setIsPending(true)

                  const { error: socialError } = await authClient.signIn.social(
                    {
                      provider,
                      callbackURL: '/',
                    },
                  )

                  if (socialError) {
                    throw new Error(socialError.message)
                  }
                } catch (err: unknown) {
                  const message =
                    err instanceof Error ? err.message : 'Social login failed.'

                  setError(message)
                  toast.error(message)
                  setIsPending(false)
                }
              }}
            />

            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-xs font-medium tracking-widest text-white/35 uppercase">
                or
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <AuthField id="signin-email" label="Email address">
                <Input
                  id="signin-email"
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
                id="signin-password"
                label="Password"
                action={
                  <Link
                    href="/forgot-password"
                    className="text-[13px] font-medium text-brand-yellow transition-opacity hover:opacity-80"
                  >
                    Forgot password?
                  </Link>
                }
              >
                <PasswordInput
                  id="signin-password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  disabled={isPending}
                  className={authInputClass}
                />
              </AuthField>

              <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-white/60 select-none">
                <Checkbox
                  name="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  disabled={isPending}
                  className="border-white/20 bg-white/5 data-checked:border-brand-yellow data-checked:text-brand-navy dark:data-checked:bg-brand-yellow"
                />
                Remember me on this device
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
                disabled={isPending}
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
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-white/50">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="font-semibold text-brand-yellow transition-opacity hover:opacity-80"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
