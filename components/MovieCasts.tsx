import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	Dimensions,
} from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { router } from 'expo-router';
import { fallbackProfileImage, image185 } from '@/services/api';

type MovieCastsProps = { cast: Credits[] };
const { width } = Dimensions.get('window');

export default function MovieCasts({ cast }: MovieCastsProps) {
	const renderItemCard = ({ item }: { item: Credits }) => {
		return (
			<TouchableOpacity
				style={{ width: width * 0.3 }}
				onPress={() => router.push(`/cast/${item.id}` as any)}
				className='items-start rounded-lg'
			>
				<View className='overflow-hidden rounded-lg h-40 border border-neutral-700 w-full'>
					<Image
						source={{
							uri: image185(item.profile_path) || fallbackProfileImage,
						}}
						className='h-40 w-full'
						resizeMode='cover'
					/>
				</View>
				<Text className='text-white text-xs mt-2 w-28'>
					{item?.character.length > 40
						? item?.character.slice(0, 40) + '...'
						: item?.character}
				</Text>
				<Text className='text-neutral-400 text-xs mt-1 w-28'>
					{item?.original_name.length > 40
						? item?.original_name.slice(0, 40) + '...'
						: item?.original_name}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View className=' w-full '>
			<Text className='text-white text-lg mb-5'>Movie Casts</Text>
			<FlatList
				data={cast}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: 10,
					paddingTop: 10,
				}}
				renderItem={({ item, index }) => renderItemCard({ item })}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={() => <View className='w-4' />}
				scrollEnabled={false}
			/>
		</View>
	);
}
