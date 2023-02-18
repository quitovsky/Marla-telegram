import {NextApiRequest, NextApiResponse} from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const data: any = await fetch(`${process.env.NEXT_PUBLIC_HOST}:5000/chat/${req.query.id}`).then(res => res.json())
    res.status(200).send(data)
}