"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types/types";
import { useEffect, useMemo, useState } from "react";
import PieChartComponent from "./Components/Charts/PieChart";

function UsersOverview() {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gender, setGender] = useState("");

  const handleChange = (event: any) => {
    setGender(event);
  };

  const filteredData = useMemo(() => {
    return data.filter(
      (user) =>
        user.gender.toLowerCase() === gender.toLowerCase() ||
        gender.toLowerCase() === "all" ||
        gender === ""
    );
  }, [data, gender]);

  const dependentsData = useMemo(() => {
    const grouped = Object.groupBy(filteredData, (user) => user.country);

    return Object.values(grouped).map((group) => {
      if (group === undefined) return 0;
      const dependants = group?.reduce((acc, user) => acc + user.dependants, 0);
      return {
        name: group[0].country,
        value: dependants,
      };
    });
  }, [filteredData]);

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
    <>
      <div className="flex items-center justify-center mt-5">
        <Select onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid justify-center md:flex md:justify-between">
        <div className="w-[400px] h-[250px] border-white border-2 rounded-xl shadow-2xl mt-5">
          <PieChartComponent dependentsData={dependentsData} />
        </div>
        <div className="w-[350px] h-[250px]"></div>
      </div>
    </>
  );
}

export default UsersOverview;
