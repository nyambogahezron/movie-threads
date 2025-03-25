import { View, Text, FlatList } from 'react-native';
import React from 'react';
import RelatedMovieCard from './RelatedMovieCard';

interface props {
	movies: Movie[];
	title: string;
}

export default function RelatedMovieContainer({ movies, title }: props) {
	return (
		<View className='w-full'>
			<Text className='text-lg text-white font-bold mt-5 mb-3'>{title}</Text>

			<FlatList
				data={movies}
				renderItem={({ item }) => <RelatedMovieCard {...item} />}
				keyExtractor={(item) => item.id.toString()}
				numColumns={3}
				columnWrapperStyle={{
					justifyContent: 'flex-start',
					gap: 20,
					paddingRight: 5,
					marginBottom: 10,
				}}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				className='mt-2'
				scrollEnabled={false}
				contentContainerStyle={{
					paddingBottom: 20,
				}}
			/>
		</View>
	);
}
