import { USER_DATA } from "@/users";
import { NextRequest } from "next/server";

export default function handler(req: NextRequest, res: any) {
    if (req.method === 'GET') {
        const data = USER_DATA;

        res.status(200).json(data);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}