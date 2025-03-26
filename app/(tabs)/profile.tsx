import { images } from '@/constants/images';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

const Profile = () => {
	const { user, signOut } = useAuth();

	const handleLogout = async () => {
		try {
			await signOut();
			router.replace('/(auth)/login');
		} catch (error) {
			Alert.alert('Error', 'Failed to logout');
		}
	};

	if (!user) {
		return (
			<SafeAreaView className='bg-primary flex-1'>
				<Image
					source={images.bg2}
					className='flex-1 absolute w-full z-0'
					resizeMode='cover'
				/>
				<View className='flex-1 justify-center items-center px-6'>
					<TouchableOpacity
						className='bg-white/20 p-4 rounded-lg w-[80%] items-center mt-5'
						onPress={() => router.push('/(auth)/login')}
					>
						<Text className='text-white'>Login</Text>
					</TouchableOpacity>

					<Text className='text-white mt-4'>or</Text>
					<TouchableOpacity
						onPress={() => router.push('/(auth)/register')}
						className='bg-blue-600 p-4 rounded-lg w-[80%] items-center mt-5'
					>
						<Text className='text-white'>Register</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className='bg-primary flex-1'>
			<Image
				source={images.bg2}
				className='flex-1 absolute w-full z-0'
				resizeMode='cover'
			/>
			<View className='flex-1 justify-center items-center px-6 -mt-36'>
				<View className='bg-white/10 p-6 rounded-xl backdrop-blur-lg w-full max-w-sm'>
					<View className='items-center mb-6'>
						<View className='w-24 h-24 bg-blue-500 rounded-full items-center justify-center mb-4'>
							<Text className='text-3xl text-white font-bold'>
								{user.email?.[0]?.toUpperCase() || 'U'}
							</Text>
						</View>
						<Text className='text-gray-300'>{user.email}</Text>
					</View>

					<TouchableOpacity
						className='bg-red-500 p-4 rounded-lg'
						onPress={handleLogout}
					>
						<Text className='text-white text-center font-semibold'>Logout</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Profile;
