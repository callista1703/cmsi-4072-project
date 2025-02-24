import "./App.css";
// import TextEditor from "./components/TextEditor";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { Calendar } from "@/components/Calendar";
// import { Courses } from "@/components/Courses";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
	return (
		<>
			<SidebarProvider>
				<Sidebar />
				<main className="flex-1 overflow-y-auto p-6">
					<div className="flex gap-2 items-center mb-3">
						<SidebarTrigger />
						<h1 className="text-3xl font-bold">Welcome!</h1>
					</div>
					<div className="grid gap-6">
						<Dashboard />
						{/* <Courses /> */}
						<Calendar />
					</div>
				</main>
			</SidebarProvider>
		</>
	);
}

export default App;
