
'use server'

import { createAdminClient } from '@/config/appwrite'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


async function getSingleRoom(id) {
	try {
		const { database } = await createAdminClient()

		// Fetch all rooms
		const room = await database.getDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
			process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ROOMS,
			id
		)

		// Revalidate the cache for this path
		//revalidatePath('/')

		return room
	} catch (error) {
		console.log('Failed to get room', error)
		redirect('/error')
	}
}

export default getSingleRoom;
