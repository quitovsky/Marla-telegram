import {NextApiRequest, NextApiResponse} from "next";

export default function (req: NextApiRequest, res: NextApiResponse) {
    res.status(400).json("400 Bad request")
}