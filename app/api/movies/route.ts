// app/api/movies/route.ts

import { NextResponse } from "next/server";
import prisma from "../../../utils/prisma";

export async function GET() {
	console.log("Fetching movies");
	const movies = await prisma.movie.findMany();
	return NextResponse.json(movies);
}

export async function POST(request: Request) {
	const { action, title, description, id, watched } = await request.json();

	if (action === "delete" && id) {
		console.log("Deleting movie with ID:", id);
		try {
			await prisma.movie.delete({
				where: { id: Number(id) },
			});
			return NextResponse.json({ message: "Movie deleted" });
		} catch (error) {
			console.error("Error deleting movie:", error);
			return NextResponse.json({ message: "Movie not found" }, { status: 404 });
		}
	} else if (action === "update" && id !== undefined) {
		console.log("Updating movie with ID:", id);
		try {
			const updatedMovie = await prisma.movie.update({
				where: { id: Number(id) },
				data: {
					title,
					description,
					watched,
				},
			});
			return NextResponse.json(updatedMovie);
		} catch (error) {
			return NextResponse.json({ message: "Movie not found" }, { status: 404 });
		}
	} else if (title && description) {
		const newMovie = await prisma.movie.create({
			data: { title, description },
		});
		return NextResponse.json(newMovie);
	}

	return NextResponse.json({ message: "Invalid request" }, { status: 400 });
}

// export async function DELETE(request: Request) {
// 	console.log("Incoming request URL:", request.url);

// 	console.log("Deleting movie");
// 	const url = new URL(request.url);
// 	const id = url.pathname.split("/").pop(); // Extract the ID from the URL path

// 	if (!id) {
// 		return NextResponse.json({ message: "ID is required" }, { status: 400 });
// 	}

// 	try {
// 		await prisma.movie.delete({
// 			where: { id: Number(id) }, // Make sure to convert id to a number if it's stored as an integer
// 		});
// 		return NextResponse.json({ message: "Movie deleted" });
// 	} catch (error) {
// 		console.error("Error deleting movie:", error);
// 		return NextResponse.json({ message: "Movie not found" }, { status: 404 });
// 	}
// }
