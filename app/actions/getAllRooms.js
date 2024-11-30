'use server'

import { createAdminClient } from '@/config/appwrite'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


async function getAllRooms() {
	try {
		const { database } = await createAdminClient()

		// Fetch all rooms
		const { documents: rooms } = await database.listDocuments(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
			process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ROOMS
		)

		// Revalidate the cache for this path
		//revalidatePath('/')

		return rooms
	} catch (error) {
		console.log('Failed to get rooms', error)
		redirect('/error')
	}
}

export default getAllRooms;
