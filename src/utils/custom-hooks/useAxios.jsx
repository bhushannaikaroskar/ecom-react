import axios from "axios";
import { useState } from "react";

export default function useAxios() {
    const [response, setResponse] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async (params) => {
        let isError = false;
        let errorData = {}
        let result1 = {}
        setLoading(true)
        try {
            const result = await axios.request(params);
            result1 = result
            setResponse(result);
            setError("")

        } catch (err) {
            isError=true;
            errorData = err;
            setResponse("");
            setError(err);
        } finally {
            setLoading(false);
        }

        return isError?errorData.response:result1
    };

    return { response, error, loading, fetchData };
}
