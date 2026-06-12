"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { login } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await login({ email, password });

      setAuth(data.user, data.token);
      router.push("/chat");
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <h1 className="text-2xl font-semibold text-zinc-950">Login</h1>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900"
            required
          />
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full rounded-md bg-zinc-950 px-4 py-2 font-medium text-white disabled:bg-zinc-400"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-sm text-zinc-600">
          New here?{" "}
          <Link href="/register" className="font-medium text-zinc-950">
            Create an account
          </Link>
        </p>
      </form>
    </main>
  );
}
