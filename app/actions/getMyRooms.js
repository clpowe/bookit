'use server'

import { createSessionClient } from '@/config/appwrite'
import { cookies } from 'next/headers'
import { Query } from 'node-appwrite'
import { redirect } from 'next/navigation'


async function getMyRooms() {
	const cookieStore = await cookies()
	const sessionCookie = cookieStore.get('appwrite-session')

	if (!sessionCookie) {
		redirect('/login')
	}



	try {
		const { account, databases } = await createSessionClient(sessionCookie.value)

		// Get user ID
		const user = await account.get()
		const userId = user.$id


		// Fetch users rooms
		const { documents: rooms } = await databases.listDocuments(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
			process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ROOMS,
			[Query.equal('user_id', userId)]
		)


		return rooms
	} catch (error) {
		console.log('Failed to get user rooms', error)
		redirect('/error')
	}
}

export default getMyRooms;