import { Link, useRouter } from 'expo-router';
import { View, Pressable, Text } from 'react-native';

const LoginPage = () => {
	const router = useRouter();

	const handleLogin = () => {
		// Add your login logic here
		router.replace('/Home');
	};

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Pressable onPress={handleLogin}>
				<Text style={{ color: 'white'}}>Login</Text>
			</Pressable>

			<Link href="/register" asChild>
				<Pressable>
					<Text style={{ color: 'white', marginVertical: 20 }}>Create account</Text>
				</Pressable>
			</Link>

			<Link href="/test">Unmatched route</Link>
		</View>
	);
};

export default LoginPage;