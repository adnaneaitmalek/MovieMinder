"use client";

import React from "react";
import MagicButton from "./ui/magic-button";
import { IconPlus } from "@tabler/icons-react";

const Landing = () => {
	return (
		<div>
			<div
				className="h-screen w-full bg-black-100
					bg-grid-white/[0.05]
					flex items-center justify-center absolute top-0 left-0"
			>
				<div
					className="absolute pointer-events-none inset-0
						flex items-center justify-center bg-black-100
						[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
				/>
			</div>
			<div className="flex relative z-10 mt-20">
				<div className="w-full flex flex-col items-center gap-6">
					<h1 className="heading" style={{ lineHeight: 1.2 }}>
						Collect Your
						<br />
						<span className="text-purple-400">Must-Watch </span>
						Movies
					</h1>
					<p className="max-w-[512px] text-center text-gray-400">
						With Movie Mind, you can easily add movies and series to your collection, mark them as watched, and save your
						favorites for later. Stay organized and never miss a title again!
					</p>
					<MagicButton
						title="Add a movie"
						icon={<IconPlus size={16} />}
						position="right"
						handleClick={() => {
							window.location.href = "/movies";
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Landing;
