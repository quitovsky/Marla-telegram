import {useRouter} from "next/router";
import css from "@/styles/chatLink.module.scss"
import {useEffect, useState} from "react";

export default function () {
    const {id} = useRouter().query;

    const [response, setResponse] = useState({
        public: false,
        data: "Loading data..."
    })

    useEffect(() => {
        if(id) {
            fetch(process.env.NEXT_PUBLIC_HOST + ":3000/api/chat/" + id).then(res => res.json()).then(setResponse)

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