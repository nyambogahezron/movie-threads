import { Link } from 'expo-router';
import MaskedView from '@react-native-masked-view/masked-view';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TrendingCard({
	movie: { movie_id, title, poster_url },
	index,
}: TrendingCardProps) {
	return (
		<Link href={`/movie/${movie_id}`} asChild>
			<TouchableOpacity className='w-32 relative pl-5'>
				<Image
					source={{ uri: poster_url }}
					className='w-32 h-48 rounded-lg'
					resizeMode='cover'
				/>

				<View className='absolute bottom-9 -left-3.5 px-2 py-1 rounded-full'>
					<MaskedView
						maskElement={
							<Text style={{ fontSize: 60, fontWeight: 'bold' }}>
								{index + 1}
							</Text>
						}
					>
						<LinearGradient
							colors={['#9CA4AB', '#AB8BFF', '#0F0D23']}
							end={{ x: 1, y: 0.8 }}
							style={{ height: 56, width: 56 }}
						/>
					</MaskedView>
				</View>

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
