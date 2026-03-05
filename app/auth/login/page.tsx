"use client";
import { useState, Suspense } from "react"; // Import Suspense from React
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/manage";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await signIn("credentials", { email, password, redirect: false, callbackUrl });
    if (res?.error) setError("Invalid credentials");
    else window.location.href = callbackUrl;
    setLoading(false);
  }

  return (
    <div className="px-6 py-12">
      <Card className="mx-auto max-w-md space-y-4">
        <h1 className="font-display text-3xl">Guest login</h1>
        <form onSubmit={submit} className="space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && <p className="text-sm text-red-300">{error}</p>}
          <Button type="submit" loading={loading} className="w-full">Login</Button>
        </form>
      </Card>
    </div>
  );
}

// Wrap the LoginPage component with Suspense to handle the async operations
export default function UserLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}