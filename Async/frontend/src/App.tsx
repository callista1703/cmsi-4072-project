import "./App.css";
import TextEditor from "./components/TextEditor";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { Calendar } from "@/components/Calendar";
// import { Courses } from "@/components/Courses";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
	return (
		<>
			<SidebarProvider>
				<Sidebar />
				<main className="flex-1 overflow-y-auto p-6">
					<h1 className="text-3xl font-bold mb-6">Welcome!</h1>
					<div className="grid gap-6">
						<Dashboard />
						{/* <Courses /> */}
						<Calendar />
						<TextEditor />
					</div>
				</main>
			</SidebarProvider>
		</>
	);
}

export default App;
