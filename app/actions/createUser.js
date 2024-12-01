'use server'
import { createAdminClient } from '@/config/appwrite'
import { ID } from 'node-appwrite'

export async function createUser(previousState, formData) {
	const email = formData.get('email');
	const name = formData.get('name');
	const password = formData.get('password');
	const confirmPassword = formData.get('confirm-password');

	if (!email || !password || !name) {
		return {
			error: 'Please fill out all fields'
		}
	}

	if (password.length < 8) {
		return {
			error: 'Password must be at least 8 characters'
		}
	}

	if (password !== confirmPassword) {
		return {
			error: 'Passwords do not match'
		}
	}

	// Get Account instance
	const { account } = await createAdminClient()

	try {
		// create user
		await account.create(ID.unique(), email, password, name)
		return {
			success: true
		}
	} catch (error) {
		console.log('Register Error: ', error)
		return {
			error: 'Could not create user'
		}
	}
}
