"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LoginDocument, LoginMutation, LoginMutationVariables } from "@/gql/graphql"; // Import directly from graphql.ts
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading }] = useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
  const { saveToken } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await login({ variables: { email, password } });
      const token = res?.data?.login; // LoginMutation returns string directly
      if (token) {
        saveToken(token);
        router.push("/"); // Redirect to home
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-16 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-blue-600 text-white"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
