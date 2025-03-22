import { Link } from 'expo-router';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { image500 } from '@/services/api';

interface props extends Movie {
	imgStyle?: string;
	containerStyle?: string;
}
export default function MovieCard({
	id,
	poster_path,
	title,
	vote_average,
	release_date,
	imgStyle,
	containerStyle = 'w-[30%]',
}: props) {
	return (
		<Link href={`/movie/${id}`} asChild>
			<TouchableOpacity className={`${containerStyle}`}>
				<View className='relative'>
					<Image
						source={{
							uri: poster_path
								? image500(poster_path)
								: 'https://placehold.co/600x400/1a1a1a/FFFFFF.png',
						}}
						className={`w-full h-52 rounded-lg ${imgStyle}`}
						resizeMode='cover'
					/>

					<View className='flex-row items-center justify-start gap-x-1 absolute bottom-2 right-2 bg-dark-100/40 rounded-lg px-2 py-1'>
						<Ionicons name='star' size={14} color='#FFD700' />
						<Text className='text-xs text-white font-bold uppercase'>
							{Math.round(vote_average / 2)}
						</Text>
					</View>
				</View>

				<Text className='text-sm font-bold text-white mt-2' numberOfLines={1}>
					{title}
				</Text>

				<View className='flex-row items-center justify-between'>
					<Text className='text-xs text-light-300 font-medium mt-1'>
						{release_date?.split('-')[0]}
					</Text>
					<Text className='text-xs font-medium text-light-300 uppercase'>
						Movie
					</Text>
				</View>
			</TouchableOpacity>
		</Link>
	);
}
