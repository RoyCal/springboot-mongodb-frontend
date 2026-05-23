'use server';

export const findAllUsers = async () => {
    const apiUrl = 'http://localhost:8080/users';

    try {
        const response = await fetch(apiUrl, { method: 'GET' });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log('Error: ', error);

        return [];
    }
};
