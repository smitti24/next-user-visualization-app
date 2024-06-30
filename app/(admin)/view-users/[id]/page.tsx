"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/types";
import { ArrowBigLeft, Edit, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const UserDetails = ({ params: { id } }: { params: { id: number } }) => {
  const [user, setUser] = useState<User>({
    name: "",
    surname: "",
    number: 0,
    gender: "",
    dependants: 0,
    country: "",
    birthdate: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/${id}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const userData = await response.json();
        setUser(userData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md p-4">
          <code className="text-white ">{JSON.stringify(user, null, 2)}</code>
          <p className="p-2 text-wrap text-red-600">
            This is an experimental feature and will be live with the next
            version 2.0.0
          </p>
        </pre>
      ),
    });
    setIsEditing(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col space-y-2 bg-slate-600 text-white rounded-md p-5 mt-5 justify-between">
      <div className="flex justify-between">
        <h1 className="font-bold text-xl flex gap-2 items-center">
          {user.name} {user.surname}
          <span className="font-normal text-sm">({user.gender})</span>
        </h1>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="px-3 hover:bg-purple-600 hover:text-white "
            onClick={() => router.push(`/view-users`)}
          >
            <ArrowBigLeft className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            className="px-3 hover:bg-purple-600 hover:text-white "
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-2">
        <div className="flex gap-2 items-center">
          Country:{" "}
          {isEditing ? (
            <Input
              className="max-w-[200px]"
              value={user.country}
              placeholder="Chatbot Name..."
              onChange={() => setUser({ ...user, country: user.country })}
              required
            />
          ) : (
            <b>{user.country}</b>
          )}
        </div>
        <div className="flex gap-2 items-center">
          Gender:{" "}
          {isEditing ? (
            <Input
              className="max-w-[200px]"
              value={user.gender}
              placeholder="Chatbot Name..."
              onChange={() => setUser({ ...user, gender: user.gender })}
              required
            />
          ) : (
            <b>{user.gender}</b>
          )}
        </div>
        <div className="flex gap-2 items-center">
          Dependents:{" "}
          {isEditing ? (
            <Input
              className="max-w-[200px]"
              value={user.dependants}
              placeholder="Dependents..."
              onChange={() => setUser({ ...user, dependants: user.dependants })}
              type="number"
              required
            />
          ) : (
            <b>{user.dependants}</b>
          )}
        </div>
        <div className="flex gap-2 items-center">
          Date of birth:{" "}
          {isEditing ? (
            <Input
              className="max-w-[200px]"
              value={user.birthdate}
              onChange={() => setUser({ ...user, birthdate: user.birthdate })}
              placeholder="Date of birth..."
              type="text"
              required
            />
          ) : (
            <b>{user.birthdate}</b>
          )}
        </div>

        <Button
          size="sm"
          className="mt-5 px-3 hover:bg-purple-600 hover:text-white"
          type="submit"
          disabled={!isEditing}
        >
          <Save className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default UserDetails;
