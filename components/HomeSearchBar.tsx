import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ImageBackground, View } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
	runOnJS,
} from 'react-native-reanimated';
import { images } from '@/constants/images';
import { Ionicons } from '@expo/vector-icons';

export default function HomeSearchBar({
	onPress,
	MovieTitles,
}: {
	onPress?: () => void;
	MovieTitles: string[];
}) {
	const defaultTitles = [
		'movies',
		'series',
		'actors',
		'directors',
		'genres',
		'movies',
	];
	const titles = MovieTitles?.length ? MovieTitles : defaultTitles;

	const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
	const opacity = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		};
	});

	const updateTitleIndex = () => {
		setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			opacity.value = withTiming(
				0,
				{ duration: 1000, easing: Easing.linear },
				() => {
					runOnJS(updateTitleIndex)();
					opacity.value = withTiming(1, {
						duration: 300,
						easing: Easing.linear,
					});
				}
			);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	return (
		<ImageBackground
			source={images.bg}
			resizeMode='cover'
			className='flex-row items-center px-2 w-full pt-10'
		>
			<View
				style={{ flex: 1, borderRadius: 15 }}
				className='flex-1 flex-row items-center px-3 py-5 w-ful rounded-lg bg-dark-200'
			>
				<Ionicons name='search' size={20} color='#AB8BFF' className='ml-2' />
				<TouchableOpacity onPress={onPress}>
					<Animated.View style={[animatedStyle, { marginLeft: 10 }]}>
						<Animated.Text
							style={{ color: '#A8B5DB', fontSize: 16 }}
							numberOfLines={1}
						>
							{titles[currentTitleIndex].length > 35
								? `${titles[currentTitleIndex].slice(0, 35)}...`
								: titles[currentTitleIndex]}
						</Animated.Text>
					</Animated.View>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
}
