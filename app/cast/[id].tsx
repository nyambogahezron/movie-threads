import React from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	StatusBar,
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
import { fetchPersonDetails, fetchPersonMovieCredits } from '@/services/api';
import MovieContainer from '@/components/MovieContainer';

const { width, height } = Dimensions.get('window');
const IMG_HEIGHT = height * 0.6;

export default function CastInfo() {
	const scrollRef = React.useRef<Animated.ScrollView>(null);
	const scrollOffset = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler((event) => {
		scrollOffset.value = event.contentOffset.y;
	});

	const router = useRouter();
	const { id } = useLocalSearchParams();

	const { data: personalDetails, loading } = useFetch(() =>
		fetchPersonDetails(id as string)
	);

	const { data: movies, loading: loadingMovies } = useFetch(() =>
		fetchPersonMovieCredits(id as string)
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

	if (loading)
		return (
			<SafeAreaView className='bg-primary flex-1'>
				<ActivityIndicator />
			</SafeAreaView>
		);

	return (
		<View style={styles.container}>
			<StatusBar barStyle='light-content' backgroundColor='transparent' />
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
						uri: `https://image.tmdb.org/t/p/w500${personalDetails?.profile_path}`,
					}}
					style={[styles.image, imageAnimatedStyle]}
					resizeMode='cover'
				/>

				<View style={styles.contentContainer}>
					<View className='flex-col items-start justify-center mt-5'>
						<>
							<View className='mt-6'>
								<Text className='text-3xl text-white font-bold text-center'>
									{personalDetails?.name}
								</Text>
								<Text className='text-base text-neutral-500 f text-center'>
									{personalDetails?.place_of_birth}
								</Text>
							</View>
							<View className='mx-1 p-4 mt-6 flex-row justify-around items-center bg-dark-100 rounded-lg overflow-hidden'>
								<View className='border-r-2 border-neutral-400 px-2 items-center'>
									<Text className='text-lg text-white font-bold text-center'>
										Gender
									</Text>
									<Text className='text-neutral-300 text-sm'>
										{' '}
										{personalDetails?.gender == 1 ? 'Female' : 'Male'}
									</Text>
								</View>
								<View className='border-r-2 border-neutral-400 px-2 items-center'>
									<Text className='text-lg text-white font-bold text-center'>
										Birthday
									</Text>
									<Text className='text-neutral-300 text-sm'>
										{personalDetails?.birthday}
									</Text>
								</View>
								<View className='border-r-2 border-neutral-400 px-2 items-center'>
									<Text className='text-lg text-white font-bold text-center'>
										Popularity
									</Text>
									<Text className='text-neutral-300 text-sm'>
										{personalDetails?.popularity}%
									</Text>
								</View>
								<View className=' px-2 items-center'>
									<Text className='text-lg text-white font-bold text-center'>
										Know For
									</Text>
									<Text className='text-neutral-300 text-sm'>
										{personalDetails?.known_for_department}
									</Text>
								</View>
							</View>
							<View className='my-6 mx-4 space-y-2'>
								<Text className='text-wite text-lg text-white'>Biography</Text>
								<Text className='text-neutral-400 tracking-wide'>
									{personalDetails?.biography || 'No biography available'}
								</Text>
							</View>
						</>
						{/* related movies  */}
						<View className='mt-5 w-full'>
							<MovieContainer movies={movies || []} title='Featured Movies' />
						</View>
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
