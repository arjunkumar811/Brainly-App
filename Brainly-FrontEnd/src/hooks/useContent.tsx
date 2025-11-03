import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [content, setContent] = useState([]);
    const [refresh, setRefresh] = useState(0);

    const refreshContent = () => {
        setRefresh(prev => prev + 1);
    };

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                setContent(response.data.content);
            })
            .catch((error) => {
                console.error("Error fetching content:", error);
            });
    }, [refresh]);

    return { content, refreshContent };
}
