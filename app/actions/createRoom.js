'use server'
import { createAdminClient } from '@/config/appwrite'
import checkAuth from './checkAuth';
import { ID } from 'node-appwrite'
import { revalidatePath } from 'next/cache'

export default async function createRoom(previousState, formData) {
	const { databases } = await createAdminClient()

	try {
		const { user } = await checkAuth();

		if (!user) {
			return {
				error: 'You must be logged in to create a room'
			}
		}

		const newRoom = await databases.createDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
			process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ROOMS,
			ID.unique(),
			{
				user_id: user.id,
				name: formData.get('name'),
				description: formData.get('description'),
				sqft: formData.get('sqft'),
				capacity: formData.get('capacity'),
				price_per_hour: formData.get('price_per_hour'),
				address: formData.get('address'),
				location: formData.get('location'),
				availability: formData.get('availability'),
				amenities: formData.get('amenities'),
			}
		)

		// Revalidate the cache for this path
		revalidatePath('/', 'layout')

		return {
			success: true
		}
	} catch (error) {
		console.log(error)
		const errorMessage = error.response.message || 'An unexpected error has occured'
		return {
			error: errorMessage
		}
	}

}