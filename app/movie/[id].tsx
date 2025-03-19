import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { Stack, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');
const IMG_HEIGHT = height * 0.6;

import { Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { icons } from '@/constants/icons';
import useFetch from '@/services/usefetch';
import { fetchMovieDetails } from '@/services/api';

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
	const navigation = useNavigation();

	const scrollHandler = useAnimatedScrollHandler((event) => {
		scrollOffset.value = event.contentOffset.y;
	});

	const router = useRouter();
	const { id } = useLocalSearchParams();

	const { data: movie, loading } = useFetch(() =>
		fetchMovieDetails(id as string)
	);

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

	//  set header options on layout effect

	if (loading)
		return (
			<SafeAreaView className='bg-primary flex-1'>
				<ActivityIndicator />
			</SafeAreaView>
		);

	return (
		<View style={styles.container}>
			<StatusBar style='light' backgroundColor='transparent' />
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
						<TouchableOpacity style={styles.bookmarkBtn}>
							<Ionicons name='bookmark' size={24} color={'yellow'} />
						</TouchableOpacity>
					),
				}}
			/>
			<StatusBar style='light' backgroundColor='transparent' />
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
						uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
					}}
					style={[styles.image, imageAnimatedStyle]}
					resizeMode='cover'
				/>

				<View style={styles.contentContainer}>
					<View className='flex-col items-start justify-center mt-5 px-5'>
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
					</View>
				</View>
			</Animated.ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#030014',
	},
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
		backgroundColor: '#030014',
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
