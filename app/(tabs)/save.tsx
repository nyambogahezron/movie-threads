import { FavoriteCastCard, FavoriteMovieCard } from '@/components/BoookMark';
import { images } from '@/constants/images';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/context/FavoritesContext';
import {
	View,
	Image,
	ActivityIndicator,
	ScrollView,
	Text,
	FlatList,
	Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const width = Dimensions.get('window').width;

const Save = () => {
	const { favorites, loading } = useFavorites();
	const { user } = useAuth();

	const favoriteMovies = favorites.filter(
		(favorite) => favorite.type === 'movie'
	);

	const favoriteCasts = favorites.filter(
		(favorite) => favorite.type === 'cast'
	);

	if (!user) {
		return (
			<View className='flex-1 bg-primary'>
				<Text>Please login to save your favorites</Text>
				<Link href='/login'>Login</Link>
			</View>
		);
	}

	if (loading) {
		return (
			<View className='flex-1 bg-primary'>
				<ActivityIndicator
					size='large'
					color='#0000ff'
					className='mt-10 self-center'
				/>
			</View>
		);
	}
	return (
		<SafeAreaView className='bg-primary flex-1'>
			<Image
				source={images.bg2}
				className='flex-1 absolute w-full z-0'
				resizeMode='cover'
			/>

			<ScrollView
				className='flex-1 px-2'
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ minHeight: '100%', paddingBottom: 70 }}
			>
				{/* header */}
				<View className='flex justify-center items-center w-full py-4'>
					<Text className='text-2xl font-bold text-light-100 text-center'>
						Favorites
					</Text>
				</View>

				{favorites.length === 0 && (
					<View className='flex-1 justify-center items-center'>
						<Text className='text-light-100 text-center'>
							No favorites found
						</Text>
					</View>
				)}
				<View className='flex-1 '>
					{/* movies */}
					{favoriteMovies.length > 0 && (
						<FlatList
							scrollEnabled={false}
							data={favoriteMovies}
							numColumns={3}
							columnWrapperStyle={{
								marginBottom: 10,
								gap: 8,
								width: width,
							}}
							contentContainerStyle={{
								width: width,
							}}
							renderItem={({ item, index }) => (
								<FavoriteMovieCard
									key={item.itemId}
									movie={item}
									index={index}
								/>
							)}
							ItemSeparatorComponent={() => <View className='w-4' />}
							showsVerticalScrollIndicator={false}
							ListHeaderComponent={() => (
								<View className='flex justify-center items-start ml-4 w-full py-4'>
									<Text className='text-2xl font-bold text-light-100 text-start'>
										Movies
									</Text>
								</View>
							)}
						/>
					)}

					{/* casts */}
					{favoriteCasts.length > 0 && (
						<FlatList
							scrollEnabled={false}
							data={favoriteCasts}
							numColumns={3}
							columnWrapperStyle={{
								marginBottom: 10,
								gap: 10,
							}}
							renderItem={({ item, index }) => (
								<FavoriteCastCard key={item.itemId} cast={item} index={index} />
							)}
							className='flex-1'
							showsVerticalScrollIndicator={false}
							ListHeaderComponent={() => (
								<View className='flex justify-center items-start ml-4 w-full py-4'>
									<Text className='text-2xl font-bold text-light-100 text-start'>
										Casts
									</Text>
								</View>
							)}
						/>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Save;
