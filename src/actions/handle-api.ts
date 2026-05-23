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

        if (response.status === 201) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};
