import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T)
    : [T, React.Dispatch<React.SetStateAction<T>>] {

    const [value, setValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
                } catch {
          return initialValue;
        }
    });

    useEffect(() => {
        try {
            const item = JSON.stringify(value);
            window.localStorage.setItem(key, item);
        } catch (error: unknown) {
          console.log(error);
        }
    }, [value]);

    return [value, setValue];
}