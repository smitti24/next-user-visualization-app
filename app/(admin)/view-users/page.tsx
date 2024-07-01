"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../hooks/useUser";
import Loader from "@/components/Loader";

function ViewUsers() {
  const { data, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <Loader />;
  if (error) return <div>An error occurred</div>;

  return (
    <div className="mt-5">
      <Table>
        <TableHeader className="bg-slate-600 font-bold">
          <TableRow>
            <TableHead className="text-white font-bold">Full name</TableHead>
            <TableHead className="text-white font-bold">
              Date of birth
            </TableHead>
            <TableHead className="text-white font-bold hidden md:table-cell">
              Country
            </TableHead>
            <TableHead className="text-white font-bold"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((data: any) => (
            <TableRow key={data.number}>
              <TableCell className="font-medium">
                {data.name} {data.surname}
              </TableCell>
              <TableCell>{data.birthdate}</TableCell>
              <TableCell className="hidden md:table-cell">
                {data.country}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  className="px-3 hover:bg-purple-600 hover:text-white "
                  onClick={() => router.push(`/view-users/${data.number}`)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ViewUsers;
