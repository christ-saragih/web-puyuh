// useAuthInvestor.js
import { useState, useEffect } from "react";
import { apiInvestor } from "./useAxiosConfig";

const useAuthInvestor = () => {
    const [investor, setInvestor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await apiInvestor.get(
                    "/api/auth/investor/protected"
                );
                setInvestor(res.data.user);
            } catch (error) {
                setInvestor(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { investor, loading };
};

export default useAuthInvestor;
