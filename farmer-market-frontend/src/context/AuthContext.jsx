import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const existingToken = localStorage.getItem('token');
    const existingUserType = localStorage.getItem('userType');
    const [token, setToken] = useState(existingToken || null);
    const [userType, setUserType] = useState(existingUserType || null);

    const login = (token, userType) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType);
        setToken(token);
        setUserType(userType);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        setToken(null);
        setUserType(null);
    };

    return (
        <AuthContext.Provider value={{ token, userType, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
