import {useRouter} from "next/router";
import css from "@/styles/chatLink.module.scss"
import {useEffect, useState} from "react";

export default function () {
    const {id} = useRouter().query;

    const [response, setResponse] = useState({
        public: false,
        data: "Loading data..."
    })

    const host = process.env.NEXTT_PUBLIC_HOST || "https://marla.su"

    useEffect(() => {
        if(id) {
            fetch(host + "/api/chat/" + id).then(res => res.json()).then(setResponse)

        }
    },  [id])

    useEffect(() => {
        if(response.public) {
                location.href = response.data
            }
    }, [response])

    return <>
        <div className={css.center}>
            {!response.public && response.data}
        </div>
    </>
}