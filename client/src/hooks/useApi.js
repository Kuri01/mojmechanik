import { useCallback, useState } from 'react';

const useApi = (fn) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(
        async (options) => {
            try {
                setLoading(true);
                const response = await fn(options);
                setData(response);
                return response;
            } catch (error) {
                setError(error);
                throw error;
            } finally {
                setLoading(false);
            }
        },
        [fn]
    );

    return { data, loading, error, fetchData };
};

export default useApi;
