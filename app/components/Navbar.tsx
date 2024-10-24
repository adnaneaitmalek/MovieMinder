"use client";

import React, { useState } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconSearch, IconCategoryFilled, IconMovie, IconBrandNetflix, IconAlienFilled, IconDeviceTvFilled } from "@tabler/icons-react";

function Navbar({ className }: { className?: string }) {
	const [active, setActive] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");

	const handleSearch = () => {
		if (searchQuery) {
			window.location.href = `/movies?search=${encodeURIComponent(searchQuery)}`;
		}
	};

	return (
		<div className={cn("fixed top-10 inset-x-0 max-w-3xl mx-auto z-50", className)}>
			<Menu setActive={setActive}>
				<div className="flex items-center gap-8">
					<Link href="/">
						<h2 className="font-bold text-lg">Movie Mind</h2>
					</Link>

					<div className="relative flex items-center">
						<input
							type="text"
							className="sm:w-96 sm:h-10 bg-gray-400 bg-opacity-20 rounded-full flex-grow px-5 text-sm text-white placeholder-gray-500"
							placeholder="Search for something..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button
							className="absolute right-1 flex items-center justify-center w-8 h-8 rounded-full bg-white hover:bg-gray-300 transition-colors duration-200"
							aria-label="Search"
							onClick={handleSearch}
						>
							<IconSearch size={15} className="text-gray-800" />
						</button>
					</div>

					<MenuItem setActive={setActive} active={active} item="Categorie" icon={<IconCategoryFilled size={18} />}>
						<div className="flex flex-col space-y-4 text-sm">
							<Link href="/movies" className="flex items-center gap-2">
								<IconMovie size={18} />
								Movies
							</Link>
							<span className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
								<IconBrandNetflix size={18} />
								Series
							</span>
							<span className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
								<IconAlienFilled size={18} />
								Anime
							</span>
							<span className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
								<IconDeviceTvFilled size={18} />
								Tv Shows
							</span>
						</div>
					</MenuItem>
				</div>
			</Menu>
		</div>
	);
}

export default Navbar;
