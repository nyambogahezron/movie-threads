import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Save = () => {
	return (
		<SafeAreaView className='bg-primary flex-1'>
			<Image
				source={images.bg2}
				className='flex-1 absolute w-full z-0'
				resizeMode='cover'
			/>
			<View className='flex justify-center items-center flex-1 flex-col gap-5'>
				<Image source={icons.save} className='size-10' tintColor='#fff' />
				<Text className='text-gray-500 text-base'>Save</Text>
			</View>
		</SafeAreaView>
	);
};

export default Save;
