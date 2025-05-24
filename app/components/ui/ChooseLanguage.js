"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

export default function ChooseLanguage() {
	// Hidde Languages On Fucus Change
	const dropdownRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) // clicked outside it
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	// Change back Language
	const { i18n } = useTranslation();
	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};
	// Change front Language
	const [isOpen, setIsOpen] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState({
		code: "FR",
		label: "Français",
	});
	const languages = [
		{ code: "FR", label: "Français" },
		{ code: "MA", label: "Arabe" },
	];
	return (
		<div className="relative z-20" ref={dropdownRef}>
			<button
				onClick={() => {
					setIsOpen(!isOpen);
				}}
				className="flex justify-center items-center cursor-pointer gap-2 py-2 px-3 rounded-2xl border border-gray-400 dark:hover:bg-neutral-700 hover:bg-neutral-100 dark:bg-neutral-800 bg-neutral-50 "
			>
				<Flag
					code={selectedLanguage.code}
					className="w-6"
					alt={`${selectedLanguage.label} Flag`}
				/>
				<span className="">{selectedLanguage.label.substring(0, 2)}</span>
			</button>
			{isOpen && (
				<div
					id="languages"
					className="w-32 absolute top-11.5 border border-gray-400 hover:bg-neutral-100 bg-neutral-50 rounded-2xl overflow-hidden"
				>
					{languages.map((lang) => (
						<button
							onClick={() => {
								setSelectedLanguage({ code: lang.code, label: lang.label });
								setIsOpen(!isOpen);
								changeLanguage(lang.label.slice(0, 2).toLocaleLowerCase());
							}}
							key={lang.code}
							className={`w-full flex justify-start pl-3 items-center cursor-pointer gap-2 backdrop-blur-lg dark:hover:bg-neutral-700 hover:bg-neutral-100 dark:bg-neutral-800 bg-neutral-50 py-2 ${
								lang == languages[languages.length - 1]
									? ""
									: " border-b border-gray-400 dark:border-gray-400"
							}`}
						>
							<Flag
								code={lang.code}
								className="w-6"
								alt={`${lang.label} Flage`}
							/>
							<span>{lang.label}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
