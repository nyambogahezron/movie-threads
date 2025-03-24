import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
interface Props {
	placeholder: string;
	value?: string;
	onChangeText?: (text: string) => void;
	onPress?: () => void;
}

export default function SearchBar({
	placeholder,
	value,
	onChangeText,
	onPress,
}: Props) {
	return (
		<View className='flex-row items-center bg-dark-200 rounded-lg px-6 py-4'>
			<Ionicons name='search' size={20} color='#A8B5DB' />
			<TextInput
				onPress={onPress}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				className='flex-1 ml-2 text-white'
				placeholderTextColor='#A8B5DB'
			/>
		</View>
	);
}
