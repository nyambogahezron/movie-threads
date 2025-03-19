import {
	View,
	Text,
	ActivityIndicator,
	ScrollView,
	Image,
	FlatList,
	StyleSheet,
	ImageBackground,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

import useFetch from '@/services/usefetch';
import { fetchMovies } from '@/services/api';
import { getTrendingMovies } from '@/services/appwrite';

import { images } from '@/constants/images';

import MovieCard from '@/components/MovieCard';
import TrendingCard from '@/components/TrendingCard';
import MaqueeThreadsCard from '@/components/MaqueeCard';
import HomeSearchBar from '@/components/HomeSearchBar';

export default function Index() {
	const router = useRouter();

	const {
		data: trendingMovies,
		loading: trendingLoading,
		error: trendingError,
	} = useFetch(getTrendingMovies);

	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(() => fetchMovies({ query: '' }));

	const MaqueeImages = movies?.map((movie) => movie.poster_path);
	const MovieTitles = movies?.map((movie) => movie.title);

	return (
		<View className='flex-1'>
			<Image
				style={[StyleSheet.absoluteFillObject]}
				tintColor={'#0F0D23'}
				source={images.bg}
				className='absolute w-full z-0'
				resizeMode='cover'
			/>
			<Stack.Screen
				options={{
					header: () => (
						<View className='bg-dark-200 z-10'>
							<HomeSearchBar
								MovieTitles={MovieTitles || []}
								onPress={() => {
									router.push('/search');
								}}
							/>
						</View>
					),
				}}
			/>
			<ImageBackground
				source={images.bg}
				resizeMode='cover'
				className='flex-row items-center w-full'
			>
				<ScrollView
					className='flex-1 px-3'
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
				>
					{moviesLoading || trendingLoading ? (
						<ActivityIndicator
							size='large'
							color='#0000ff'
							className='mt-10 self-center'
						/>
					) : moviesError || trendingError ? (
						<Text>Error: {moviesError?.message || trendingError?.message}</Text>
					) : (
						<View className='flex-1 mt-5'>
							{MaqueeImages && MaqueeImages.length > 0 && (
								<MaqueeThreadsCard MaqueeImages={MaqueeImages} />
							)}

							{trendingMovies && (
								<View className='mt-10'>
									<Text className='text-lg text-white font-bold mb-3'>
										Trending Movies
									</Text>
									<FlatList
										horizontal
										showsHorizontalScrollIndicator={false}
										className='mb-4 mt-3'
										data={trendingMovies}
										contentContainerStyle={{
											gap: 26,
										}}
										renderItem={({ item, index }) => (
											<TrendingCard movie={item} index={index} />
										)}
										keyExtractor={(item) => item.movie_id.toString()}
										ItemSeparatorComponent={() => <View className='w-4' />}
									/>
								</View>
							)}

							<>
								<Text className='text-lg text-white font-bold mt-5 mb-3'>
									Latest Movies
								</Text>

								<FlatList
									data={movies}
									renderItem={({ item }) => <MovieCard {...item} />}
									keyExtractor={(item) => item.id.toString()}
									numColumns={3}
									columnWrapperStyle={{
										justifyContent: 'flex-start',
										gap: 20,
										paddingRight: 5,
										marginBottom: 10,
									}}
									className='mt-2 pb-32'
									scrollEnabled={false}
								/>
							</>
						</View>
					)}
				</ScrollView>
			</ImageBackground>
		</View>
	);
}
