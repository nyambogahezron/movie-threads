import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { router } from 'expo-router';
import { fallbackProfileImage, image185 } from '@/services/api';

type MovieCastsProps = { cast: Credits[] };

export default function MovieCasts({ cast }: MovieCastsProps) {
	const renderItemCard = ({ item }: { item: Credits }) => {
		return (
			<TouchableOpacity
				onPress={() => router.push(`/cast/${item.id}` as any)}
				className='items-start'
			>
				<View className='overflow-hidden rounded-lg h-40 w-32 '>
					<Image
						source={{
							uri: image185(item.profile_path) || fallbackProfileImage,
						}}
						className='h-36 w-32'
						resizeMode='cover'
					/>
				</View>
				<Text className='text-white text-xs mt-1'>
					{item?.character.length > 40
						? item?.character.slice(0, 40) + '...'
						: item?.character}
				</Text>
				<Text className='text-neutral-400 text-xs mt-1'>
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
					paddingHorizontal: 16,
					paddingBottom: 10,
					paddingTop: 10,
				}}
				renderItem={({ item, index }) => renderItemCard({ item })}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={() => <View className='w-4' />}
			/>
		</View>
	);
}
