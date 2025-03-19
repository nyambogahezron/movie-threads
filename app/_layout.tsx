import { Stack } from 'expo-router';
import './globals.css';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StatusBar hidden={true} />

			<Stack>
				<Stack.Screen
					name='(tabs)'
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='movie/[id]'
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</GestureHandlerRootView>
	);
}
