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
import AgeGroupBarChart from "./Components/Charts/AgeGroupBarChart";

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

  const calculateAge = (birthdate: string): number => {
    const birthDate = new Date(birthdate);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const processAgeGroupData = useMemo(() => {
    const filteredData = data?.filter(
      (user: User) =>
        user.gender.toLowerCase() === gender.toLowerCase() ||
        gender.toLowerCase() === "all" ||
        gender === ""
    );

    const ageGroups: { [key: string]: number } = {
      "Under 25": 0,
      "25-34": 0,
      "35-44": 0,
      "45 and older": 0,
    };

    filteredData?.forEach((user: User) => {
      const age = calculateAge(user.birthdate);
      if (age < 25) {
        ageGroups["Under 25"]++;
      } else if (age < 35) {
        ageGroups["25-34"]++;
      } else if (age < 45) {
        ageGroups["35-44"]++;
      } else {
        ageGroups["45 and older"]++;
      }
    });

    return Object.keys(ageGroups).map((group) => ({
      name: group,
      count: ageGroups[group],
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
        <div className="w-[350px] h-[250px]">
          <AgeGroupBarChart ageGroups={processAgeGroupData} />
        </div>
      </div>
    </>
  );
}

export default UsersOverview;
