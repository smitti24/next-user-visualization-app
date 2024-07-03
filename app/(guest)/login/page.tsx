import { SignIn } from "@clerk/nextjs";
import { User2Icon } from "lucide-react";
import React from "react";

function LoginPage() {
  return (
    <div className="flex py-10 md-py-0 flex-col flex-1 justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col items-center justify-center space-y-5 text-white">
          <div className="rounded-full bg-white p-5">
            <User2Icon className="h-60 w-60 text-purple-500" />
          </div>

          <div className="text-center">
            <h1 className="text-4xl">User Data Visualizer</h1>
            <h2 className="text-base font-light">
              Your all in one user data visualization tool.
            </h2>
            <h3 className="my-5 font-bold">Sign in to get started</h3>
          </div>
        </div>
        <SignIn routing="hash" fallbackRedirectUrl="/"></SignIn>
      </div>
    </div>
  );
}

export default LoginPage;
