import { useQuery } from "react-query";

const fetchUser = async () => {
  const response = await fetch("/api/data");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useUser = () => {
  return useQuery(["user"], fetchUser);
};

const fetchUserById = async (id: number) => {
  const response = await fetch(`/api/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useUserById = (id: number) => {
  return useQuery(["useUserById", id], () => fetchUserById(id));
};
