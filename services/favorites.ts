import { databases } from '@/lib/appwrite';
import { toast } from '@/lib/toast';
import { ID, Query } from 'react-native-appwrite';

const DATABASE_ID = '67da8c7a0015e0e82bd6';
const COLLECTION_ID = '67e1ae1400007e61c1aa';

export type FavoriteType = 'movie' | 'cast';

export interface Favorite {
	$id: string;
	userId: string;
	type: FavoriteType;
	itemId: string;
	imagePath: string;
	title: string;
	createdAt: string;
}

export const addToFavorites = async (
	userId: string,
	type: FavoriteType,
	itemId: string,
	imagePath: string,
	title: string
) => {
	try {
		const existingFavorites = await databases.listDocuments(
			DATABASE_ID,
			COLLECTION_ID,
			[Query.equal('userId', userId), Query.equal('itemId', itemId)]
		);

		if (existingFavorites.documents.length > 0) {
			toast('You already have this favorite');
			return;
		}

		const favorite = await databases.createDocument(
			DATABASE_ID,
			COLLECTION_ID,
			ID.unique(),
			{
				userId,
				type,
				itemId,
				imagePath,
				title,
			}
		);
		return favorite;
	} catch (error) {
		console.error('Error adding to favorites:', error);
		throw error;
	}
};

export const removeFromFavorites = async (itemId: string, userId: string) => {
	try {
		const favorites = await databases.listDocuments(
			DATABASE_ID,
			COLLECTION_ID,
			[Query.equal('userId', userId), Query.equal('itemId', itemId)]
		);

		if (favorites.documents.length === 0) {
			toast('Favorite not found');
			return;
		}

		const favorite = favorites.documents[0];
		if (favorite.userId !== userId) {
			toast('You are not authorized to remove this favorite');
			return;
		}

		await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, favorite.$id);

		toast('Favorite removed');
	} catch (error) {
		console.error('Error removing from favorites:', error);
		throw error;
	}
};

export const getUserFavorites = async (userId: string) => {
	try {
		const favorites = await databases.listDocuments(
			DATABASE_ID,
			COLLECTION_ID,
			[Query.equal('userId', userId)]
		);
		return favorites.documents as unknown as Favorite[];
	} catch (error) {
		console.error('Error getting favorites:', error);
		throw error;
	}
};

export const isFavorite = async (userId: string, itemId: string) => {
	try {
		const favorites = await databases.listDocuments(
			DATABASE_ID,
			COLLECTION_ID,
			[Query.equal('userId', userId), Query.equal('itemId', itemId)]
		);
		return favorites.documents.length > 0;
	} catch (error) {
		console.error('Error checking favorite:', error);
		throw error;
	}
};
