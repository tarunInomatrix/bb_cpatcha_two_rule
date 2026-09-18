"use client";

import React, { useState, useEffect, useRef } from "react";

export default function SignInPage() {
  // Sign in form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInSubmitted, setSignInSubmitted] = useState(false);

  // Detail form state
  const [fullName, setFullName] = useState("");
  const [detailEmail, setDetailEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [detailSubmitted, setDetailSubmitted] = useState(false);
  const [detailSuccessMessage, setDetailSuccessMessage] = useState(false);

  // Section observer & navigation
  const [activeSection, setActiveSection] = useState<"signin" | "details">("signin");
  const signInSectionRef = useRef<HTMLElement>(null);
  const detailsSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const options = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "signin-section") {
            setActiveSection("signin");
          } else if (entry.target.id === "details-section") {
            setActiveSection("details");
          }
        }
      });
    }, options);

    if (signInSectionRef.current) observer.observe(signInSectionRef.current);
    if (detailsSectionRef.current) observer.observe(detailsSectionRef.current);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (section: "signin" | "details") => {
    if (section === "signin") {
      signInSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      detailsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dataApiKey = "3ee57ddd-2946-449a-9908-8a28d7ce3960";
  const dataActionId = "user-auth-login-div";
  const dataEmailElement = "auth-email";
  const currentURL = typeof window !== "undefined" ? window.location.href : "";

  const injectCdnScript = (userEmail: string, submitCallback: () => void) => {
    if (typeof window === "undefined") return

      // 1. Assign the callback to global window so script can invoke it
      ; (window as any).onBotbusterSuccess = submitCallback

    const existingScript = document.getElementById("botbuster-script") as HTMLScriptElement

    if (existingScript) {
      // 2. Script already injected! Update data attribute and trigger manual init
      existingScript.setAttribute("data-email", userEmail)
      if (typeof (window as any).initBotbusterSDK === "function") {
        (window as any).initBotbusterSDK(userEmail, null, true)
      }
      return
    }

    // 3. Inject script for the first time
    const script = document.createElement("script")
    script.id = "botbuster-script"
    script.src = "https://cdn.jsdelivr.net/gh/tarunInomatrix/captcha-script@1e5dc7abe609b3d5f1491f0dc913aa8a92b004a1/quick-check-inject.js"
    script.async = true
    script.setAttribute("data-api-key", dataApiKey)
    script.setAttribute("data-email", userEmail)
    script.setAttribute("data-loaded-captcha-url", currentURL)
    script.setAttribute("data-action-id", dataActionId)
    script.setAttribute("data-email-element", dataEmailElement)
    script.setAttribute("data-web-url", currentURL)

    document.body.appendChild(script)
  }

  const injectCdnScriptForForm = (userEmail: string, submitCallback: () => void) => {
    if (typeof window === "undefined") return

      // 1. Assign the callback to global window so script can invoke it
      ; (window as any).onBotbusterSuccess = submitCallback

    const existingScript = document.getElementById("botbuster-script") as HTMLScriptElement

    if (existingScript) {
      // 2. Script already injected! Update data attribute and trigger manual init
      existingScript.setAttribute("data-email", userEmail)
      if (typeof (window as any).initBotbusterSDK === "function") {
        (window as any).initBotbusterSDK(userEmail, null, true)
      }
      return
    }

    // 3. Inject script for the first time
    const script = document.createElement("script")
    script.id = "botbuster-script"
    script.src = "https://cdn.jsdelivr.net/gh/tarunInomatrix/captcha-script@14fee0571f5b81b2f60dca79033a3ece1ee69022/quick-check-inject.js"
    script.async = true
    script.setAttribute("data-api-key", dataApiKey)
    script.setAttribute("data-email", userEmail)
    script.setAttribute("data-loaded-captcha-url", currentURL)
    script.setAttribute("data-action-id", dataActionId)
    script.setAttribute("data-email-element", dataEmailElement)
    script.setAttribute("data-web-url", currentURL)

    document.body.appendChild(script)
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    injectCdnScript(email, () => {
      setSignInSubmitted(true);
      setTimeout(() => setSignInSubmitted(false), 2000);
    });
  };

  const handleDetailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    injectCdnScriptForForm(detailEmail || email || "user@example.com", () => {
      setDetailSubmitted(true);
      setTimeout(() => {
        setDetailSubmitted(false);
        setDetailSuccessMessage(true);
        setTimeout(() => setDetailSuccessMessage(false), 3500);
      }, 1200);
    });
  };

  return (
    <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#f4f6f8]">
      {/* Side Navigation Dots */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        <button
          onClick={() => scrollToSection("signin")}
          aria-label="Navigate to Sign In"
          className="group relative flex items-center justify-end"
        >
          <span className="absolute right-6 px-2 py-1 text-xs font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-md shadow-xs border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Sign in
          </span>
          <span
            className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${activeSection === "signin"
              ? "bg-black scale-125 ring-4 ring-black/10"
              : "bg-gray-300 hover:bg-gray-400"
              }`}
          />
        </button>

        <button
          onClick={() => scrollToSection("details")}
          aria-label="Navigate to Details Form"
          className="group relative flex items-center justify-end"
        >
          <span className="absolute right-6 px-2 py-1 text-xs font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-md shadow-xs border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            User Details
          </span>
          <span
            className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${activeSection === "details"
              ? "bg-black scale-125 ring-4 ring-black/10"
              : "bg-gray-300 hover:bg-gray-400"
              }`}
          />
        </button>
      </div>

      {/* SECTION 1: Full Page Sign In */}
      <section
        id="signin-section"
        ref={signInSectionRef}
        className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 snap-start relative"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-[34px] font-extrabold tracking-tight text-[#111827]">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-[#6b7280]">
            Don&apos;t have an account?{" "}
            <a
              href="#signup"
              className="text-[#2563eb] hover:text-[#1d4ed8] font-medium transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Sign In Card Container */}
        <div className="w-full max-w-[440px] bg-white rounded-2xl p-8 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] border border-gray-100">
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email field */}
            <div>
              <label
                htmlFor="auth-email"
                className="block text-sm font-semibold text-gray-900 mb-1.5"
              >
                Email address
              </label>
              <div className="relative flex items-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <input
                  id="auth-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-11 pr-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors shadow-2xs"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-900 mb-1.5"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-lg border border-gray-200 py-2.5 px-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors shadow-2xs"
                />
              </div>
            </div>

            {/* Sign in button */}
            <div className="pt-2">
              <button
                id="user-auth-login-div"
                type="submit"
                className="w-full flex items-center justify-center py-2.5 sm:py-3 px-4 bg-[#18181b] hover:bg-black text-white text-sm font-medium rounded-lg shadow-xs transition-colors duration-150 cursor-pointer active:scale-[0.99]"
              >
                {signInSubmitted ? "Signing in..." : "Sign in"}
              </button>
            </div>

            {/* Botbuster Captcha Container */}
            <div id="botbuster-container"></div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="bg-white px-3 text-gray-500 font-normal">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col space-y-3">
            {/* Continue with Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg text-sm font-medium text-gray-800 transition-colors duration-150 shadow-2xs cursor-pointer active:scale-[0.99]"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Continue with Facebook */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg text-sm font-medium text-gray-800 transition-colors duration-150 shadow-2xs cursor-pointer active:scale-[0.99]"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" fill="#1877F2" />
                <path
                  d="M15.5 12.05h-2.43V21.4h-3.87V12.05H7.4V9.12h1.8v-2.1c0-2.48 1.48-3.84 3.73-3.84 1.08 0 2.01.08 2.28.12v2.64h-1.57c-1.2 0-1.44.57-1.44 1.41v1.77h2.92l-.38 2.93z"
                  fill="#FFFFFF"
                />
              </svg>
              <span>Continue with Facebook</span>
            </button>

            {/* Continue with Instagram */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg text-sm font-medium text-gray-800 transition-colors duration-150 shadow-2xs cursor-pointer active:scale-[0.99]"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient
                    id="instagram-gradient"
                    x1="2"
                    y1="22"
                    x2="22"
                    y2="2"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#FA7E1E" />
                    <stop offset="40%" stopColor="#D62976" />
                    <stop offset="70%" stopColor="#962FBF" />
                    <stop offset="100%" stopColor="#4F5BD5" />
                  </linearGradient>
                </defs>
                <rect
                  x="2.5"
                  y="2.5"
                  width="19"
                  height="19"
                  rx="5.5"
                  stroke="url(#instagram-gradient)"
                  strokeWidth="1.8"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.2"
                  stroke="url(#instagram-gradient)"
                  strokeWidth="1.8"
                />
                <circle
                  cx="17.25"
                  cy="6.75"
                  r="1.1"
                  fill="url(#instagram-gradient)"
                />
              </svg>
              <span>Continue with Instagram</span>
            </button>
          </div>
        </div>

        {/* Scroll Prompt to details */}
        <button
          onClick={() => scrollToSection("details")}
          className="mt-8 flex flex-col items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors cursor-pointer group"
        >
          <span>Scroll down for user details</span>
          <svg
            className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-y-0.5 transition-all animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>

      {/* SECTION 2: Full Page Details Form */}
      <section
        id="details-section"
        ref={detailsSectionRef}
        className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 snap-start relative"
      >
        {/* Back to sign in button */}
        <button
          onClick={() => scrollToSection("signin")}
          className="mb-6 flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors cursor-pointer group"
        >
          <svg
            className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:-translate-y-0.5 transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
          <span>Back to Sign in</span>
        </button>

        {/* Detail Form Card */}
        <div className="w-full max-w-[440px] bg-white rounded-2xl p-8 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] border border-gray-100">
          <div className="mb-5 pb-3 border-b border-gray-100">
            <h2 className="text-xl font-bold text-[#111827]">
              User Details
            </h2>
            <p className="mt-1 text-xs text-[#6b7280]">
              Please fill in your profile details below
            </p>
          </div>

          {detailSuccessMessage && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>User details have been saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleDetailSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-gray-900 mb-1.5"
              >
                Full Name
              </label>
              <div className="relative flex items-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-11 pr-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors shadow-2xs"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="detailEmail"
                className="block text-sm font-semibold text-gray-900 mb-1.5"
              >
                Email address
              </label>
              <div className="relative flex items-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <input
                  id="detailEmail"
                  name="detailEmail"
                  type="email"
                  value={detailEmail}
                  onChange={(e) => setDetailEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-11 pr-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors shadow-2xs"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-semibold text-gray-900 mb-1.5"
              >
                Phone Number
              </label>
              <div className="relative flex items-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-11 pr-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors shadow-2xs"
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-semibold text-gray-900 mb-1.5"
              >
                Company Name
              </label>
              <div className="relative flex items-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                    <path d="M9 22v-4h6v4" />
                    <path d="M8 6h.01" />
                    <path d="M16 6h.01" />
                    <path d="M8 10h.01" />
                    <path d="M16 10h.01" />
                    <path d="M8 14h.01" />
                    <path d="M16 14h.01" />
                  </svg>
                </div>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter your company name"
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-11 pr-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors shadow-2xs"
                />
              </div>
            </div>

            {/* Job Title */}
            <div>
              <label
                htmlFor="jobTitle"
                className="block text-sm font-semibold text-gray-900 mb-1.5"
              >
                Job Title
              </label>
              <div className="relative flex items-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Enter your job title"
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-11 pr-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors shadow-2xs"
                />
              </div>
            </div>

            {/* Submit Details Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={detailSubmitted}
                className="w-full flex items-center justify-center py-2.5 sm:py-3 px-4 bg-[#18181b] hover:bg-black text-white text-sm font-medium rounded-lg shadow-xs transition-colors duration-150 cursor-pointer active:scale-[0.99] disabled:opacity-75"
              >
                {detailSubmitted ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving details...
                  </span>
                ) : (
                  "Save Details"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
