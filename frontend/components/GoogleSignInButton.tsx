"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

declare global {
  interface Window {
    google?: any;
  }
}

export default function GoogleSignInButton() {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleCredentialResponse = useCallback(
    async (response: { credential: string }) => {
      try {
        const res = await fetch(`${API_URL}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: response.credential }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Google sign-in failed");
          return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      } catch (error) {
        console.error("Google sign-in error:", error);
        alert("Unable to connect to server. Make sure backend is running.");
      }
    },
    [router]
  );

  const initializeGoogle = useCallback(() => {
    if (!window.google || !buttonRef.current || !GOOGLE_CLIENT_ID) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "filled_black",
      size: "large",
      width: 360,
      text: "continue_with",
      shape: "pill",
    });
  }, [handleCredentialResponse]);

  useEffect(() => {
    if (window.google) {
      initializeGoogle();
    }
  }, [initializeGoogle]);

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3 text-center text-xs text-yellow-400">
        Google Sign-In not configured. Set NEXT_PUBLIC_GOOGLE_CLIENT_ID.
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initializeGoogle}
      />
      <div className="flex justify-center" ref={buttonRef} />
    </>
  );
}
