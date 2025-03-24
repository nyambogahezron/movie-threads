import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

function TabIcon({ focused, icon }: any) {
	return (
		<View className='size-full justify-center items-center mt-4 rounded-full'>
			<Feather name={icon} size={22} color={focused ? '#AB8BFF' : '#9CA4AB'} />
		</View>
	);
}

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					...styles.tabBarItem,
				},
				tabBarStyle: { ...styles.tabBar },
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'index',
					headerShown: true,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={'home'} title='Home' />
					),
				}}
			/>

			<Tabs.Screen
				name='search'
				options={{
					title: 'Search',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={'search'} title='Search' />
					),
				}}
			/>

			<Tabs.Screen
				name='save'
				options={{
					title: 'Save',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={'bookmark'} title='Save' />
					),
				}}
			/>

			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={'user'} title='Profile' />
					),
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: 'rgba(3, 0, 24, 0.8)',
		borderRadius: 50,
		marginHorizontal: 15,
		marginBottom: 10,
		height: 55,
		position: 'absolute',
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#0F0D23',
		elevation: 0,
		shadowOpacity: 0,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 0,
		shadowColor: 'transparent',
	},
	tabBarItem: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
