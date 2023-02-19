import {NextApiRequest, NextApiResponse} from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const host = process.env.NEXTT_PUBLIC_HOST || "https://marla.su"
    const data: any = await fetch(`${host}:2087/chat/${req.query.id}`).then(res => res.json())
    res.status(200).send(data)
}