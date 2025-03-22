import { View, Text, FlatList } from 'react-native';
import React from 'react';
import MovieCard from './MovieCard';

interface props {
	movies: Movie[];
	title: string;
}

export default function MovieContainer({ movies, title }: props) {
	return (
		<View>
			<Text className='text-lg text-white font-bold mt-5 mb-3'>{title}</Text>

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
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				className='mt-2 pb-32'
				scrollEnabled={false}
			/>
		</View>
	);
}
