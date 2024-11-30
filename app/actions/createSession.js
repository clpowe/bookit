'use server'

export async function createSession(previousState, formData) {
	const email = formData.get('email');
	const password = formData.get('password');

	console.log(email, password);
}


