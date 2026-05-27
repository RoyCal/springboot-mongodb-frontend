"use client"

import { createContext, useContext, useState } from 'react';

interface ApiContextType {
    isApiOn: boolean;
    setIsApiOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    const [isApiOn, setIsApiOn] = useState(false);

    return (
        <ApiContext.Provider value={{ isApiOn, setIsApiOn }}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => {
    const context = useContext(ApiContext);

    if (!context) {
        throw new Error('useApi deve ser usado dentro de ApiProvider');
    }

    return context;
};