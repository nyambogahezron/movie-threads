import { Link } from 'expo-router';
import { Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { image185, image500 } from '@/services/api';

interface FavoriteMovieCardProps {
	movie: { itemId: string; imagePath: string; title: string };
	index: number;
}

const width = Dimensions.get('window').width;

export function FavoriteMovieCard({
	movie: { itemId, imagePath, title },
	index,
}: FavoriteMovieCardProps) {
	return (
		<Link href={`/movie/${itemId}`} asChild>
			<TouchableOpacity style={{ width: width * 0.3 }} className=' relative '>
				<Image
					source={{ uri: image500(imagePath) }}
					className='w-full h-48 rounded-lg'
					resizeMode='cover'
				/>

				<Text
					className='text-sm font-bold mt-2 text-light-200'
					numberOfLines={1}
				>
					{title.length > 20 ? `${title.slice(0, 20)}...` : title}
				</Text>
			</TouchableOpacity>
		</Link>
	);
}

interface FavoriteCastCardProps {
	cast: { itemId: string; imagePath: string; title: string };
	index: number;
}

export function FavoriteCastCard({
	cast: { itemId, imagePath, title },
	index,
}: FavoriteCastCardProps) {
	return (
		<Link href={`/cast/${itemId}`} asChild>
			<TouchableOpacity style={{ width: width * 0.3 }} className='relative '>
				<Image
					source={{ uri: image185(imagePath) }}
					className='w-full h-48 rounded-lg'
					resizeMode='cover'
				/>

				<Text
					className='text-sm font-bold mt-2 text-light-200'
					numberOfLines={1}
				>
					{title.length > 20 ? `${title.slice(0, 20)}...` : title}
				</Text>
			</TouchableOpacity>
		</Link>
	);
}
