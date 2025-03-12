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
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [session, setSession] = useState<Session | null>(null);
	console.log(session);

	const signUpNewUser = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) {
			console.error("Error signing up:", error.message);
			return { success: false, error };
		}

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
	};

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<AuthContext.Provider value={{ session, signUpNewUser, signOutUser }}>
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
