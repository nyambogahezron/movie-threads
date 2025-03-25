import { Stack } from 'expo-router';

export default function MovieLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name='[id]' />
		</Stack>
	);
}
