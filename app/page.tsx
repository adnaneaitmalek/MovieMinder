import Landing from "./components/Landing";

export default function Home() {
	return (
		<main
			className="relative bg-black-100 flex items-center
		    	flex-col overflow-hidden mx-auto sm:px-10 px-5 min-h-screen"
		>
			<div className="max-w-7xl w-full mt-40">
				<Landing />
			</div>
		</main>
	);
}
