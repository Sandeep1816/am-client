"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SignupDocument, SignupMutation, SignupMutationVariables } from "@/gql/graphql"; // <- generated code
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, { loading }] = useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
  const { saveToken } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await signup({ variables: { name, email, password } });
      const token = res?.data?.signup; // returns string directly
      if (token) {
        saveToken(token);
        router.push("/"); // Redirect to homepage
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-16 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create account</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          required
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          {loading ? "Creating..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}
