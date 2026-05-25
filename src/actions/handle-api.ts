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

export const addUser = async (name: string, email: string) => {
    const apiUrl = 'http://localhost:8080/users';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
            }),
        });

        return response.status === 201;
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (userId: string) => {
    const apiUrl = `http://localhost:8080/users/${userId}`;

    try {
        const response = await fetch(apiUrl, { method: 'DELETE' });

        return response.status === 204;
    } catch (error) {
        console.log('Error: ', error);
    }
};

export const updateUser = async (
    userId: string,
    name: string,
    email: string,
) => {
    const apiUrl = `http://localhost:8080/users/${userId}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
            }),
        });

        return response.status === 204;
    } catch (error) {
        console.log(error);
    }
};
