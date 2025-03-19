import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
	runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { icons } from '@/constants/icons';
import { images } from '@/constants/images';

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
			className='flex-row items-center bg-dark-200  px-2 py-5 w-full'
		>
			<LinearGradient
				colors={['#0F0D23', '#030014']}
				locations={[0.5, 0.9]}
				style={{ flex: 1, borderRadius: 15 }}
				className='flex-1 mt-2 flex-row items-center px-3 py-5 w-ful rounded-lg'
			>
				<Image
					source={icons.search}
					className='w-5 h-5 ml-3'
					resizeMode='contain'
					tintColor='#AB8BFF'
				/>
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
			</LinearGradient>
		</ImageBackground>
	);
}
