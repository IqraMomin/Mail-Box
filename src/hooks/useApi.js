import { useState } from "react";
import axios from "axios";

export default function useApi() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const get = async (url) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (err) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const post = async (url, body) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(url, body);
            return res.data;
        } catch (err) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const patch = async (url, body) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.patch(url, body);
            return res.data;
        } catch (err) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const del = async (url) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.delete(url);
            return res.data;
        } catch (err) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, get, post, patch, del };
}
