"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import placeholder from "../assets/image-placeholder.jpg";
import { IconEye, IconX, IconPlus, IconPencil } from "@tabler/icons-react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface Movie {
	id?: number;
	title: string;
	description: string;
	watched?: boolean;
}

const Movies = () => {
	const searchParams = useSearchParams(); // Use useSearchParams to get query params
	let search = searchParams.get("search");

	const [movies, setMovies] = useState<Movie[]>([]);
	const [watched, setWatched] = useState<{ [key: number]: boolean }>({});
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [newMovie, setNewMovie] = useState<Movie>({ title: "", description: "", watched: false });
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editingMovieId, setEditingMovieId] = useState<number | null>(null);

	useEffect(() => {
		const clearUrlQueries = () => {
			const url = new URL(window.location.href);
			url.search = "";
			window.history.replaceState({}, document.title, url.toString());
		};

		clearUrlQueries();
		search = null;
		const fetchMovies = async () => {
			try {
				const response = await axios.get("/api/movies");
				setMovies(response.data);
				console.log("Movies fetched:", response.data);

				const watchedState = response.data.reduce((acc: any, movie: Movie) => {
					acc[movie.id!] = movie.watched;
					return acc;
				}, {});

				setWatched(watchedState);
			} catch (error) {
				console.error("Error fetching movies:", error);
			}
		};

		fetchMovies();
	}, []);

	const handleFilteredMovies = () => {
		if (search) {
			// Find the specific movie based on the search term
			const foundMovie = movies.find((movie) => movie.title.toLowerCase() === search!.toLowerCase());
			if (foundMovie) {
				// Return an array with the found movie
				return [foundMovie]; // Return only the found movie
			}
		}
		return []; // Return an empty array if no movie is found
	};

	const displayedMovies = handleFilteredMovies();

	const handleToggleWatch = async (movieId: number) => {
		try {
			const newWatchedStatus = !watched[movieId];
			await axios.post("/api/movies", {
				action: "update",
				id: movieId,
				watched: newWatchedStatus,
			});

			setWatched((prevWatched) => ({
				...prevWatched,
				[movieId]: newWatchedStatus,
			}));

			setMovies((prevMovies) => prevMovies.map((movie) => (movie.id === movieId ? { ...movie, watched: newWatchedStatus } : movie)));
		} catch (error) {
			console.error("Error toggling watched status:", error);
		}
	};

	const handleRemove = async (id: number) => {
		try {
			await axios.post("/api/movies", { action: "delete", id });
			setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));

			setWatched((prevWatched) => {
				const newWatchedState = { ...prevWatched };
				delete newWatchedState[id];
				return newWatchedState;
			});
		} catch (error) {
			console.error("Error removing movie:", error);
		}
	};

	const openModal = () => setIsModalOpen(true);

	const closeModal = () => setIsModalOpen(false);

	const handleAddNewMovie = async () => {
		if (newMovie.title && newMovie.description) {
			try {
				const response = await axios.post("/api/movies", newMovie);
				setMovies((prevMovies) => [...prevMovies, response.data]);
				setWatched((prev) => ({ ...prev, [response.data.id]: false }));
				closeModal();
			} catch (error) {
				console.error("Error adding new movie:", error);
			}
		}
	};

	const handleEditMovie = (id: number) => {
		const movieToEdit = movies.find((movie) => movie.id === id);

		if (movieToEdit) {
			console.log("Editing movie:", movieToEdit);
			setNewMovie(movieToEdit);
			setEditingMovieId(movieToEdit.id!);
			setIsEditing(true);
			openModal();
		} else {
			console.error("Movie not found with ID:", id);
		}
	};

	const handleUpdateMovie = async () => {
		console.log("Updating movie:", newMovie);
		console.log("Editing movie ID:", editingMovieId);
		if (newMovie.title && newMovie.description && editingMovieId) {
			try {
				await axios.post("/api/movies", {
					action: "update",
					id: editingMovieId,
					title: newMovie.title,
					description: newMovie.description,
					watched: newMovie.watched,
				});

				setMovies((prevMovies) => prevMovies.map((movie) => (movie.id === editingMovieId ? { ...movie, ...newMovie } : movie)));
				setNewMovie({ title: "", description: "", watched: false });
				closeModal();
			} catch (error) {
				console.error("Error updating movie:", error);
			}
		}
	};

	return (
		<main className="pt-40 flex flex-col items-center relative bg-black-100 mx-auto sm:px-10 py-10 px-5 min-h-screen">
			<div className="flex flex-col items-center gap-5 mb-8">
				<h1 className="text-white text-2xl font-bold">Your saved movies</h1>
				<button
					onClick={() => {
						setEditingMovieId(null);
						setIsEditing(false);
						setNewMovie({ title: "", description: "" });
						openModal();
					}}
					className="bg-slate-200 text-black-100 px-6 py-2 rounded-full"
				>
					<div className="flex items-center gap-2 text-sm">
						Add <IconPlus size={16} />
					</div>
				</button>
			</div>

			{search && (
				<div className="max-w-3xl w-full border border-dashed border-white/[0.2] p-8 rounded-xl mb-8 flex flex-col items-center gap-4">
					{search && (
						<p className="text-lg">
							Search results for: <span className="text-blue-500">{search}</span>
						</p>
					)}
					{displayedMovies.length > 0
						? displayedMovies.map((movie) => (
								<div key={movie.id} className="w-full flex flex-col items-center justify-center">
									<div
										key={movie.id}
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
											<button onClick={() => handleToggleWatch(movie.id!)}>
												<IconEye size={22} className={watched[movie.id!] ? "text-blue-500" : "text-white"} />
											</button>
											<button onClick={() => handleEditMovie(movie.id!)}>
												<IconPencil size={22} />
											</button>
											<button onClick={() => handleRemove(movie.id!)}>
												<IconX size={22} className="text-red-400" />
											</button>
										</div>
									</div>
									<div className="flex items-center my-4 w-96">
										<hr className="flex-grow border-t border-gray-300" />
										<span className="mx-4 text-gray-500 font-semibold">Your List</span>
										<hr className="flex-grow border-t border-gray-300" />
									</div>
								</div>
						  ))
						: search && <p className="text-lg">No movies found</p>}
				</div>
			)}

			{movies
				.slice()
				.reverse()
				.map((movie, index) => (
					<div
						key={movie.id}
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
							<button onClick={() => handleToggleWatch(movie.id!)}>
								<IconEye size={22} className={watched[movie.id!] ? "text-blue-500" : "text-white"} />
							</button>
							<button onClick={() => handleEditMovie(movie.id!)}>
								<IconPencil size={22} />
							</button>
							<button onClick={() => handleRemove(movie.id!)}>
								<IconX size={22} className="text-red-400" />
							</button>
						</div>
					</div>
				))}

			{isModalOpen && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000">
					<div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 ">
						<h2 className="text-xl font-bold mb-4">{isEditing ? "Update Movie" : "Add New Movie"}</h2>
						<input
							type="text"
							placeholder="Movie Title"
							value={newMovie.title}
							onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
							className="bg-slate-800 w-full p-3 mb-4 rounded-lg"
							required
						/>
						<textarea
							placeholder="Movie Description"
							value={newMovie.description}
							onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
							className="bg-slate-800 w-full p-3 mb-4 rounded-lg"
							rows={3}
							required
						></textarea>
						<div className="flex justify-end gap-4">
							<button onClick={closeModal} className="px-4 py-2 bg-gray-700 rounded-lg">
								Cancel
							</button>
							<button
								onClick={isEditing ? handleUpdateMovie : handleAddNewMovie}
								className="px-4 py-2 bg-blue-500 text-white rounded-lg"
							>
								{isEditing ? "Update" : "Add"}
							</button>
						</div>
					</div>
				</div>
			)}
		</main>
	);
};

export default Movies;
