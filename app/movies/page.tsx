"use client";

import React, { useState } from "react";
import Image from "next/image";
import placeholder from "../assets/image-placeholder.jpg";
import { IconEye, IconX, IconPlus, IconPencil } from "@tabler/icons-react";

// Define the type for movies with title and description
interface Movie {
	title: string;
	description: string;
}

const Movies = () => {
	// Store movies as an array of objects with title and description
	const [movies, setMovies] = useState<Movie[]>([
		{
			title: "Movie 1",
			description:
				"lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.",
		},
		{
			title: "Movie 2",
			description:
				"lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.",
		},
		{
			title: "Movie 3",
			description:
				"lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.",
		},
		{
			title: "Movie 4",
			description:
				"lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.",
		},
		{
			title: "Movie 5",
			description:
				"lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.",
		},
	]);

	// Track which movies are watched
	const [watched, setWatched] = useState<boolean[]>(new Array(5).fill(false));

	// Toggle the watched state for a specific movie by index
	const handleToggleWatch = (index: number) => {
		setWatched((prevState) => prevState.map((item, i) => (i === index ? !item : item)));
	};

	// Remove a movie from the list by index
	const handleRemove = (index: number) => {
		setMovies((prevMovies) => prevMovies.filter((_, i) => i !== index));
		setWatched((prevWatched) => prevWatched.filter((_, i) => i !== index));
	};

	return (
		<main className="pt-40 flex flex-col items-center relative bg-black-100 mx-auto sm:px-10 px-5 min-h-screen">
			<div className="flex flex-col items-center gap-5 mb-8">
				<h1 className="text-white text-2xl font-bold">Your saved movies</h1>
				<button className="bg-slate-200 text-black-100 px-6 py-2 rounded-full">
					<div className="flex items-center gap-2 text-sm">
						Add
						<IconPlus size={16} />
					</div>
				</button>
			</div>
			{movies.map((movie, index) => (
				<div
					key={index}
					className="dark:bg-black-100 w-full max-w-3xl p-4 rounded-xl shadow-lg my-3 border border-black/[0.1] dark:border-white/[0.1] flex items-center gap-4 justify-between"
				>
					<div className="flex items-start gap-4">
						<Image src={placeholder} width={100} height={100} alt="movie" className=" rounded-lg" />
						<div className="flex flex-col gap-2">
							<h2 className="text-black dark:text-white font-bold text-xl">{movie.title}</h2>
							<p className="text-sm text-gray-400 max-w-96">{movie.description}</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-4 bg-slate-800 p-3 rounded-lg">
						<button onClick={() => handleToggleWatch(index)}>
							<IconEye size={22} className={watched[index] ? "text-blue-500" : "text-white"} />
						</button>
						<button>
							<IconPencil size={22} />
						</button>
						<button onClick={() => handleRemove(index)}>
							<IconX size={22} className="text-red-400" />
						</button>
					</div>
				</div>
			))}
		</main>
	);
};

export default Movies;
