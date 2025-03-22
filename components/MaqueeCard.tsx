import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { Marquee } from '@animatereactnative/marquee';
import Animated, {
	Easing,
	FadeInUp,
	SharedValue,
	useSharedValue,
} from 'react-native-reanimated';
import { image500 } from '@/services/api';

const width = Dimensions.get('window').width;

const _itemWidth = width * 0.62;
const _itemHeight = _itemWidth * 1.17;
const _spacing = 16;

function Item({
	image,
}: {
	image: string;
	index: number;
	offset: SharedValue<number>;
}) {
	return (
		<Animated.View
			style={[
				{
					width: _itemWidth,
					height: _itemHeight,
					borderRadius: 16,
				},
			]}
		>
			<Image
				source={{
					uri: image
						? image500(image)
						: 'https://placehold.co/600x400/1a1a1a/FFFFFF.png',
				}}
				style={{ flex: 1, borderRadius: 16 }}
			/>
		</Animated.View>
	);
}
export default function MaqueeThreadsCard({
	MaqueeImages,
}: {
	MaqueeImages: string[];
}) {
	const offset = useSharedValue(0);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				height: _itemHeight,
			}}
		>
			<Marquee spacing={_spacing} position={offset} speed={0.3}>
				<Animated.View
					style={{ flexDirection: 'row', gap: _spacing }}
					entering={FadeInUp.duration(1000)
						.delay(500)
						.easing(Easing.elastic(0.9))}
				>
					{MaqueeImages.map((image, index) => (
						<Item key={index} image={image} index={index} offset={offset} />
					))}
				</Animated.View>
			</Marquee>
		</View>
	);
}
