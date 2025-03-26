import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { images } from '@/constants/images';
import { Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signUp } = useAuth();

	const handleRegister = async () => {
		try {
			await signUp(email, password);
			router.replace('/(tabs)');
		} catch (error) {
			Alert.alert('Error', 'Failed to create account');
		}
	};

	return (
		<SafeAreaView className='flex-1 bg-primary'>
			<Image
				source={images.bg2}
				className='absolute w-full h-full'
				resizeMode='cover'
			/>
			<View className='flex-1 justify-center px-6'>
				{/* close btn  */}
				<TouchableOpacity
					className='absolute top-0 left-10'
					onPress={() => router.navigate('/(tabs)')}
				>
					<Ionicons name='close' size={30} color='white' />
				</TouchableOpacity>
				<View className='bg-white/10 p-6 rounded-xl backdrop-blur-lg'>
					{/* logo  */}

					<View className='flex-row items-center justify-center mb-6 mt-10'>
						<Image
							source={images.logo}
							className='w-14 h-14 rounded-lg -mt-10'
							resizeMode='contain'
						/>
						<Text className='text-white text-2xl font-bold ml-2 -mt-10'>
							Register
						</Text>
					</View>

					<TextInput
						className='bg-white/20 text-white p-4 rounded-lg mb-4'
						placeholder='Email'
						placeholderTextColor='#9CA3AF'
						value={email}
						onChangeText={setEmail}
						autoCapitalize='none'
						keyboardType='email-address'
					/>

					<TextInput
						className='bg-white/20 text-white p-4 rounded-lg mb-6'
						placeholder='Password'
						placeholderTextColor='#9CA3AF'
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>

					<TouchableOpacity
						className='bg-blue-500 p-4 rounded-lg mb-4'
						onPress={handleRegister}
					>
						<Text className='text-white text-center font-semibold'>
							Register
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => router.back()}>
						<Text className='text-white text-center'>
							Already have an account?{' '}
							<Text className='text-blue-400'>Login</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}
