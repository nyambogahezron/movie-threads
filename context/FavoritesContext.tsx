import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import * as favoritesService from '@/services/favorites';
import { Favorite } from '@/services/favorites';
import { toast } from '@/lib/toast';
type FavoritesContextType = {
	favorites: Favorite[];
	loading: boolean;
	addFavorite: (
		type: 'movie' | 'cast',
		itemId: string,
		imagePath: string,
		title: string
	) => Promise<void>;
	removeFavorite: (itemId: string) => Promise<void>;
	isFavorite: (itemId: string) => boolean;
	refreshFavorites: () => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
	undefined
);

export const FavoritesProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { user } = useAuth();
	const [favorites, setFavorites] = useState<Favorite[]>([]);
	const [loading, setLoading] = useState(true);

	const loadFavorites = async () => {
		if (!user) return;
		try {
			const userFavorites = await favoritesService.getUserFavorites(user.$id);
			setFavorites(userFavorites);
		} catch (error) {
			console.error('Error loading favorites:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			loadFavorites();
		}
	}, [user]);

	const addFavorite = async (
		type: 'movie' | 'cast',
		itemId: string,
		imagePath: string,
		title: string
	) => {
		if (!user) return;
		try {
			if (isFavorite(itemId)) {
				toast('You already have this favorite');
				return;
			}
			const favorite = await favoritesService.addToFavorites(
				user.$id,
				type,
				itemId,
				imagePath,
				title
			);
			setFavorites((prev) => [...prev, favorite as unknown as Favorite]);
		} catch (error) {
			console.error('Error adding favorite:', error);
			throw error;
		}
	};

	const removeFavorite = async (itemId: string) => {
		try {
			if (!user) return;
			await favoritesService.removeFromFavorites(itemId, user.$id);
			setFavorites((prev) => prev.filter((f) => f.itemId !== itemId));
		} catch (error) {
			console.error('Error removing favorite:', error);
			throw error;
		}
	};

	const isFavorite = (itemId: string) => {
		return favorites.some((f) => f.itemId === itemId);
	};

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				loading,
				addFavorite,
				removeFavorite,
				isFavorite,
				refreshFavorites: loadFavorites,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = () => {
	const context = useContext(FavoritesContext);
	if (context === undefined) {
		throw new Error('useFavorites must be used within a FavoritesProvider');
	}
	return context;
};
