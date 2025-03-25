import { Stack } from 'expo-router';
import './globals.css';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@/context/AuthContext';
import { FavoritesProvider } from '@/context/FavoritesContext';

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StatusBar hidden={true} />
			<AuthProvider>
				<FavoritesProvider>
					<Stack>
						<Stack.Screen
							name='(auth)'
							options={{
								headerShown: false,
							}}
						/>
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
						<Stack.Screen
							name='cast/[id]'
							options={{
								headerShown: false,
							}}
						/>
					</Stack>
				</FavoritesProvider>
			</AuthProvider>
		</GestureHandlerRootView>
	);
}
