import Link from "next/link";
import { BarChart, User } from "lucide-react";

function Sidebar() {
  return (
    <div className="text-white p-5">
      <ul className="gap-4 flex lg:flex-col">
        <li className="flex-1">
          <Link
            href="/view-users"
            className=" hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-purple-600"
          >
            <User className="w-6 h-6 lg:w-8 lg:h-8" />
            <div className="hidden md:inline">
              <p className="text-xl">View</p>
              <p className="text-sm font-extralight">View Users</p>
            </div>
          </Link>
        </li>
        <li className="flex-1">
          <Link
            href="/"
            className=" hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-purple-600"
          >
            <BarChart className="w-6 h-6 lg:w-8 lg:h-8" />
            <div className="hidden md:inline">
              <p className="text-xl">Data</p>
              <p className="text-sm font-extralight">Visualize user data</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
