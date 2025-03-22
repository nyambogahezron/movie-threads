import MovieContainer from '@/components/MovieContainer';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/usefetch';
import { View, Image, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Save = () => {
	const { data: movies, loading } = useFetch(() =>
		fetchMovies({
			query: '',
		})
	);

	if (loading) {
		return (
			<View className='flex-1 bg-primary'>
				<ActivityIndicator
					size='large'
					color='#0000ff'
					className='mt-10 self-center'
				/>
			</View>
		);
	}
	return (
		<SafeAreaView className='bg-primary flex-1'>
			<Image
				source={images.bg2}
				className='flex-1 absolute w-full z-0'
				resizeMode='cover'
			/>

			<ScrollView
				className='flex-1 px-2'
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
			>
				<MovieContainer movies={movies || []} title='Featured Movies' />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Save;
