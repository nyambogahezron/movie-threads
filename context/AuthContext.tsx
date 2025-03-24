import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '@/lib/appwrite';
import { ID, Models } from 'react-native-appwrite';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { toast } from '@/lib/toast';

type AuthContextType = {
	user: Models.User<Models.Preferences> | null;
	loading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
		null
	);
	const [loading, setLoading] = useState(true);

	const isValidEmail = (email: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const isValidPassword = (password: string) => {
		return password.length >= 8;
	};

	const signIn = async (email: string, password: string) => {
		try {
			if (!email || !password) {
				Alert.alert('Error', 'All fields are required');
				return;
			}

			await account.createEmailPasswordSession(email, password);
			const user = await account.get();
			setUser(user);

			if (!user) {
				Alert.alert('Error', 'Failed to sign in , please try again');
				return;
			}

			router.replace('/(tabs)');
		} catch (error) {
			console.log(error);
			Alert.alert('Error', 'Failed to sign in , please try again');
		}
	};

	const signUp = async (email: string, password: string) => {
		try {
			if (!email || !password) {
				Alert.alert('Error', 'All fields are required');
				return;
			}

			if (!isValidEmail(email)) {
				Alert.alert('Error', 'Invalid email');
				return;
			}

			if (!isValidPassword(password)) {
				Alert.alert('Error', 'Password must be at least 8 characters long');
				return;
			}

			await account.create(ID.unique(), email, password);
			await signIn(email, password);
			toast('Account created');
		} catch (error) {
			console.log(error);
			Alert.alert('Error', 'Failed to sign up , please try again');
		}
	};

	const signOut = async () => {
		try {
			await account.deleteSession('current');
			setUser(null);
		} catch (error) {
			Alert.alert('Error', 'Failed to sign out , please try again');
		}
	};

	async function init() {
		try {
			const loggedIn = await account.get();
			setUser(loggedIn);
			toast('Welcome back. You are logged in');
		} catch (err) {
			setUser(null);
		}
	}

	useEffect(() => {
		init();
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
