import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { Stack } from 'expo-router';
import { Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFetch from '@/services/usefetch';
import {
	fetchMovieCredits,
	fetchMovieDetails,
	fetchRelatedMovies,
	image500,
} from '@/services/api';
import MovieCasts from '@/components/MovieCasts';
import { images } from '@/constants/images';
import { useFavorites } from '@/context/FavoritesContext';
import { toast } from '@/lib/toast';
import MovieContainer from '@/components/MovieContainer';

const { width, height } = Dimensions.get('window');
const IMG_HEIGHT = height * 0.6;

interface MovieInfoProps {
	label: string;
	value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
	<View className='flex-col items-start justify-center mt-5'>
		<Text className='text-light-200 font-normal text-sm'>{label}</Text>
		<Text className='text-light-100 font-bold text-sm mt-2'>
			{value || 'N/A'}
		</Text>
	</View>
);

export default function Details() {
	const scrollRef = React.useRef<Animated.ScrollView>(null);
	const scrollOffset = useSharedValue(0);
	const [reLoading, setReLoading] = useState(true);

	const scrollHandler = useAnimatedScrollHandler((event) => {
		scrollOffset.value = event.contentOffset.y;
	});

	const router = useRouter();
	const { id } = useLocalSearchParams();

	const {
		data: movie,
		loading,
		refetch: refetchMovie,
	} = useFetch(() => fetchMovieDetails(id as string));

	const {
		data: relatedMovies,
		loading: loadingCredits,
		refetch: refetchRelated,
	} = useFetch(() => fetchRelatedMovies(id as string));

	const { data: credits, refetch: refetchCredits } = useFetch(() =>
		fetchMovieCredits(id as string)
	);

	const { addFavorite, removeFavorite, isFavorite } = useFavorites();
	const [isFavorited, setIsFavorited] = useState(false);

	useEffect(() => {
		// Reset state
		setReLoading(true);
		setIsFavorited(false);
		scrollOffset.value = 0;
		scrollRef.current?.scrollTo({ y: 0, animated: false });

		// Refetch all data when id changes
		refetchMovie();
		refetchRelated();
		refetchCredits();

		// Update favorite status after fetching movie
		if (movie?.id) {
			setIsFavorited(isFavorite(movie.id.toString()));
		}
	}, [id]);

	const handleFavorite = async () => {
		if (!movie) return;
		try {
			if (isFavorited) {
				await removeFavorite(movie.id.toString());
				toast('Removed from favorites');
			} else {
				await addFavorite(
					'movie',
					movie.id.toString(),
					movie.poster_path ?? '',
					movie.title
				);
				toast('Added to favorites');
			}
			setIsFavorited(!isFavorited);
		} catch (error) {
			toast('Error updating favorites');
		}
	};

	// image animation for parallax effect
	const imageAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-IMG_HEIGHT, 0, IMG_HEIGHT],
						[-IMG_HEIGHT / 3, 0, IMG_HEIGHT * 0.4],
						{ extrapolateRight: 'clamp' }
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-IMG_HEIGHT, 0, IMG_HEIGHT],
						[1.5, 1, 1],
						{ extrapolateRight: 'clamp' }
					),
				},
			],
		};
	});

	// header opacity animation
	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 2], [0, 1], {
				extrapolateRight: 'clamp',
			}),
		};
	}, []);

	if (loading)
		return (
			<SafeAreaView className='bg-primary flex-1'>
				<ActivityIndicator />
			</SafeAreaView>
		);

	return (
		<View className='bg-primary flex-1'>
			<Image
				source={images.bg2}
				className='flex-1 absolute w-full z-0'
				resizeMode='cover'
			/>
			<Stack.Screen
				options={{
					headerBackVisible: false,
					headerTitle: '',
					headerTransparent: true,
					headerShown: true,
					headerTitleAlign: 'center',
					headerTitleStyle: styles.headerTitle,
					headerStyle: {
						backgroundColor: 'transparent',
					},
					headerBackground: () => (
						<Animated.View style={[headerAnimatedStyle, styles.header]} />
					),
					headerLeft: () => (
						<TouchableOpacity style={styles.backBtn} onPress={router.back}>
							<Ionicons name='chevron-back' size={24} color={'white'} />
						</TouchableOpacity>
					),
					headerRight: () => (
						<TouchableOpacity
							style={styles.bookmarkBtn}
							onPress={handleFavorite}
						>
							<Ionicons
								name={isFavorited ? 'bookmark' : 'bookmark-outline'}
								size={24}
								color={isFavorited ? 'yellow' : 'white'}
							/>
						</TouchableOpacity>
					),
				}}
			/>

			<Animated.ScrollView
				contentContainerStyle={styles.scrollViewContent}
				ref={scrollRef}
				onScroll={scrollHandler}
				scrollEventThrottle={16}
				bounces={false}
				overScrollMode='never'
				showsVerticalScrollIndicator={false}
			>
				<Animated.Image
					source={{
						uri: image500(movie?.poster_path),
					}}
					style={[styles.image, imageAnimatedStyle]}
					resizeMode='cover'
				/>

				<View style={styles.contentContainer}>
					<View className='flex-col items-start justify-center mt-5'>
						<Text className='text-white font-bold text-xl'>{movie?.title}</Text>
						<View className='flex-row items-center gap-x-1 mt-2'>
							<Text className='text-light-200 text-sm'>
								{movie?.release_date?.split('-')[0]} •
							</Text>
							<Text className='text-light-200 text-sm'>{movie?.runtime}m</Text>
						</View>
						<View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
							<Ionicons name='star' size={13} color='yellow' />

							<Text className='text-white font-bold text-sm'>
								{Math.round(movie?.vote_average ?? 0)}/10
							</Text>

							<Text className='text-light-200 text-sm'>
								({movie?.vote_count} votes)
							</Text>
						</View>
						<MovieInfo label='Overview' value={movie?.overview} />
						<MovieInfo
							label='Genres'
							value={movie?.genres?.map((g) => g.name).join(' • ') || 'N/A'}
						/>
						<View className='flex flex-row justify-between w-1/2'>
							<MovieInfo
								label='Budget'
								value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
							/>
							<MovieInfo
								label='Revenue'
								value={`$${Math.round(
									(movie?.revenue ?? 0) / 1_000_000
								)} million`}
							/>
						</View>
						<MovieInfo
							label='Production Companies'
							value={
								movie?.production_companies?.map((c) => c.name).join(' • ') ||
								'N/A'
							}
						/>

						{/* movie credits */}
						<View className='mb-8 mt-5 -ml-3' style={{ width: width }}>
							{!loadingCredits ? (
								<MovieCasts cast={credits || []} />
							) : (
								<ActivityIndicator />
							)}
						</View>

						{/* related movies  */}
						{relatedMovies && (
							<View className='mt-5 w-full'>
								<MovieContainer
									movies={relatedMovies || []}
									title='Related Movies'
								/>
							</View>
						)}
					</View>
				</View>
			</Animated.ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		height: IMG_HEIGHT,
		width: '100%',
		position: 'absolute',
		top: 0,
	},
	scrollViewContent: {
		paddingTop: IMG_HEIGHT,
		paddingBottom: 20,
		minHeight: height + IMG_HEIGHT,
	},
	contentContainer: {
		backgroundColor: '#030014',
		paddingHorizontal: 16,
		paddingTop: 20,
		paddingBottom: 40,
		minHeight: height,
	},

	header: {
		height: 80,
		width: width,
		backgroundColor: 'rgba(30, 32, 89,1)',
	},
	headerTitle: {
		color: 'white',
	},
	backBtn: {
		marginTop: 30,
		marginLeft: 16,
	},
	bookmarkBtn: {
		marginTop: 30,
		marginRight: 16,
	},
});
