import { Client, Account, Databases } from 'react-native-appwrite';

const client = new Client()
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
	.setPlatform('com.hezron.movieBox');

export const account = new Account(client);
export const databases = new Databases(client);

export { client };
