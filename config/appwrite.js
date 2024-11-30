import { Client, Databases, Account, Storage } from "node-appwrite";

// Admin Client

async function createAdminClient() {
	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
		.setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY);

	return {
		get account() {
			return new Account(client);
		},
		get database() {
			return new Databases(client);
		},
		get storage() {
			return new Storage(client);
		}
	}
}


// Session Client

async function createSessionClient(session) {

	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)

	if (session) {
		client.setSession(session);
	}

	return {
		get account() {
			return new Account(client);
		},
		get database() {
			return new Databases(client);
		},
	}
}

export { createAdminClient, createSessionClient };
