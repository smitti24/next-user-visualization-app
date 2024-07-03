import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { UserCircle2Icon } from "lucide-react";
import Link from "next/link";

function Header() {
  return (
    <header className="dark:bg-purple-600 shadow-md flex justify-between p-5 text-white">
      <Link href="" className="flex items-center text-4xl">
        <UserCircle2Icon className="h-16 w-16 mr-2" />
        <div className="space-y-1">
          <h1>User Data Visualizer</h1>
          <h2 className="text-sm">A centralized hub to view your user data.</h2>
        </div>
      </Link>
    </header>
  );
}

export default Header;
