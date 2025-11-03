import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useLocalStorage } from "./useLocalStorage";

export function useContent() {
    const [content, setContent] = useLocalStorage<any[]>('brainly_content', []);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const refreshContent = () => {
        setRefresh(prev => prev + 1);
    };

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
                
                // Update both state and localStorage
                setContent(response.data.content);
            } catch (error) {
                console.error("Error fetching content:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [refresh]);

    return { content, refreshContent, isLoading };
}
