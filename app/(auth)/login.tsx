import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { images } from '@/constants/images';
import { Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signIn } = useAuth();

	const handleLogin = async () => {
		try {
			await signIn(email, password);
		} catch (error) {
			Alert.alert('Error', 'Invalid email or password');
		}
	};

	return (
		<SafeAreaView className='flex-1 bg-primary'>
			<Image
				style={{
					width: width,
					height: height,
				}}
				source={images.bg}
				className='absolute w-full h-full  object-fill'
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

				<View className='bg-white/10 p-6 py-8 rounded-xl backdrop-blur-lg'>
					{/* logo  */}

					<View className='flex-row items-center justify-center mb-6 mt-10'>
						<Image
							source={images.logo}
							className='w-14 h-14 rounded-lg -mt-10'
							resizeMode='contain'
						/>
						<Text className='text-white text-2xl font-bold ml-2 -mt-10'>
							Login
						</Text>
					</View>
					<TextInput
						className='bg-white/20 text-white p-4 rounded-lg mb-4 mt-5'
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
						onPress={handleLogin}
					>
						<Text className='text-white text-center font-semibold'>Login</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => router.push('/(auth)/register')}>
						<Text className='text-white text-center'>
							Don't have an account?{' '}
							<Text className='text-blue-400'>Register</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}
