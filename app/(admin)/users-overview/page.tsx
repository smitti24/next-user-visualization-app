"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types/types";
import { useMemo, useState } from "react";
import PieChartComponent from "./Components/Charts/PieChart";
import { useUser } from "@/hooks/useUser";
import Loader from "@/components/Loader";

interface CountryDependents {
  [key: string]: number;
}

function UsersOverview() {
  const { data, error, isLoading } = useUser();
  const [gender, setGender] = useState("");

  const handleChange = (event: any) => {
    setGender(event);
  };

  const processDependentsData = useMemo(() => {
    const countryDependents: CountryDependents = {};

    data?.forEach((user: User) => {
      if (
        user.gender.toLowerCase() === gender.toLowerCase() ||
        gender.toLowerCase() === "all" ||
        gender === ""
      ) {
        const country = user.country;
        const dependents = user.dependants;

        countryDependents[country] =
          (countryDependents[country] || 0) + dependents;
      }
    });

    return Object.entries(countryDependents).map(([country, dependents]) => ({
      name: country,
      value: dependents,
    }));
  }, [data, gender]);

  if (isLoading) return <Loader />;
  if (error) return <div>An error occurred</div>;

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
          <PieChartComponent dependentsData={processDependentsData} />
        </div>
        <div className="w-[350px] h-[250px]"></div>
      </div>
    </>
  );
}

export default UsersOverview;
