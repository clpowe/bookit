'use server'
import { createAdminClient } from '@/config/appwrite'
import { cookies } from 'next/headers'

export async function createSession(previousState, formData) {
	const email = formData.get('email');
	const password = formData.get('password');

	if (!email || !password) {
		return {
			error: 'Please fill out all fields'
		}
	}

	// Get Account instance
	const { account } = await createAdminClient()
	console.log('account: ', account)

	try {
		// generate session
		const session = await account.createEmailPasswordSession(email, password)
		console.log('session: ', session.secret)

		// Create session cookie
		const cookieStore = await cookies()

		cookieStore.set('appwrite-session', session.secret, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			expires: new Date(session.expire),
			path: '/'
		})

		return {
			success: true
		}
	} catch (error) {
		console.log('Autentication Error: ', error)
		return {
			error: 'Invalid Credentials'
		}
	}

}


