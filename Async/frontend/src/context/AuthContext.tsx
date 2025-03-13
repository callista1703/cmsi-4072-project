import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient.ts";

export interface AuthState {
	session: Session | null;
	// setSession: (session: Session | null) => void;
	signUpNewUser: (
		email: string,
		password: string
	) => Promise<{ success: boolean; data?: object; error?: Error }>;
	signOutUser: () => Promise<void>;
	signInUser: (
		email: string,
		password: string
	) => Promise<{ success: boolean; data?: object; error?: Error }>;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [session, setSession] = useState<Session | null>(null);
	console.log(session?.user.aud);
	console.log(session?.user.email);

	const signUpNewUser = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) {
			console.error("Error signing up:", error.message);
			return { success: false, error };
		}

		setSession(data.session);
		return { success: true, data };
	};

	const signOutUser = async () => {
		if (!session) {
			return Promise.reject(new Error("User is already signed out"));
		}
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("error signing out", error);
		}

		setSession(null);
	};

	const signInUser = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) {
			console.error("there was an error signing in:", error.message);
			return { success: false, error };
		}

		setSession(data.session);
		return { success: true, data };
	};

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const { data: authListener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session);
			}
		);

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{ session, signUpNewUser, signOutUser, signInUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
