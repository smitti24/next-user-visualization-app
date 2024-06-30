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
import { User } from "@/types/types";
import { Edit, Search } from "lucide-react";
import { useEffect, useState } from "react";

function ViewUsers() {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData: User[] = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-5">
      <Table>
        <TableHeader className="bg-slate-600 font-bold">
          <TableRow>
            <TableHead className="text-white font-bold">Full name</TableHead>
            <TableHead className="text-white font-bold">
              Date of birth
            </TableHead>
            <TableHead className="text-white font-bold">Country</TableHead>
            <TableHead className="text-white font-bold"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.number}>
              <TableCell className="font-medium">
                {data.name} {data.surname}
              </TableCell>
              <TableCell>{data.birthdate}</TableCell>
              <TableCell>{data.country}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  className="px-3 hover:bg-purple-600 hover:text-white"
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
