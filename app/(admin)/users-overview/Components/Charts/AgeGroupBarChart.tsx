import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface AgeGroup {
  name: string;
  count: number;
}

interface AgeGroupProps {
  ageGroups: AgeGroup[];
}

export default function AgeGroupBarChart({ ageGroups }: AgeGroupProps) {
  return (
    <BarChart width={500} height={300} data={ageGroups}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}
