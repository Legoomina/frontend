const axiosConfig = (accessToken) => {
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: false
    };
};

export { axiosConfig };
