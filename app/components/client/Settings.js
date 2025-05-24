"use client";
import { useState } from "react";

export default function Settings() {
	const [fullName, setFullName] = useState("Amina El Fassi");
	const [email, setEmail] = useState("Aminaelfassi17@gmail.com");
	const [phone, setPhone] = useState("0632433033");
	const [city, setCity] = useState("Agadir");
	const [lycee, setLycee] = useState("Abdellah Ben Yassine");
	const [niveau, setNiveau] = useState("2ème année Bac SMA");
	const [password, setPassword] = useState("123456789");
	const [langue, setLangue] = useState("Français");

	return (
		<section className="px-0 md:px-5 py-5 flex flex-col gap-6">
			{/* Title + Cards */}
			<div className="flex flex-col gap-6">
				{/* Titles */}
				<div className="flex flex-col gap-1.5">
					<h1 className="font-bold text-3xl">Profile settings</h1>
					<p className="text-neutral-500 text-[13px] sm:text-sm">
						Gère ton compte et personnalise ton expérience.
					</p>
				</div>
				{/* Fields */}
				<section className="flex flex-col gap-8 bg-white px-3 sm:px-6 py-8">
					{/* Title */}
					<div className="flex flex-col sm:flex-row justify-between items-center gap-3">
						<div className="flex flex-col justify-center items-center text-center sm:text-start sm:flex-row gap-3">
							<img src="/sk/testimony_4.webp" className="w-22" />
							<div className="flex flex-col justify-center gap-2">
								<p className="font-[500]">{fullName}</p>
								<p className="text-sm text-neutral-400">{email}</p>
							</div>
						</div>
						<div className="hidden sm:inline-block text-center bg-skblue text-white hover:bg-white hover:text-skblue border border-skblue px-3.5 py-2 rounded-sm transition-all duration-300 cursor-pointer">
							Enregistrer
						</div>
					</div>
					{/* Form */}
					<form className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
						{/* Field 1 */}
						<div className="flex flex-col gap-1">
							<label className="px-5 text-neutral-600">Nom complet</label>
							<input
								type="text"
								className="border border-neutral-200 bg-neutral-100  text-neutral-400 focus:text-neutral-600 outline-0 py-2.5 pl-5 rounded-xs"
								value={fullName}
								onChange={(e) => {
									setFullName(e.target.value);
								}}
							/>
						</div>
						{/* Field 2 */}
						<div className="flex flex-col gap-1">
							<label className="px-5 text-neutral-600">Adresse Email</label>
							<input
								type="text"
								className="border border-neutral-200 bg-neutral-100  text-neutral-400 focus:text-neutral-600 outline-0 py-2.5 pl-5 rounded-xs"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>
						{/* Field 3 */}
						<div className="flex flex-col gap-1">
							<label className="px-5 text-neutral-600">
								Numéro de téléphone
							</label>
							<input
								type="text"
								className="border border-neutral-200 bg-neutral-100  text-neutral-400 focus:text-neutral-600 outline-0 py-2.5 pl-5 rounded-xs"
								value={phone}
								onChange={(e) => {
									setPhone(e.target.value);
								}}
							/>
						</div>
						{/* Field 4 */}
						<div className="flex flex-col gap-1">
							<label className="px-5 text-neutral-600">Ville</label>
							<input
								type="text"
								className="border border-neutral-200 bg-neutral-100  text-neutral-400 focus:text-neutral-600 outline-0 py-2.5 pl-5 rounded-xs"
								value={city}
								onChange={(e) => {
									setCity(e.target.value);
								}}
							/>
						</div>
						{/* Field 5 */}
						<div className="flex flex-col gap-1">
							<label className="px-5 text-neutral-600">Lycée</label>
							<input
								type="text"
								className="border border-neutral-200 bg-neutral-100  text-neutral-400 focus:text-neutral-600 outline-0 py-2.5 pl-5 rounded-xs"
								value={lycee}
								onChange={(e) => {
									setLycee(e.target.value);
								}}
							/>
						</div>
						{/* Field 6 */}
						<div className="flex flex-col gap-1">
							<label className="px-5 text-neutral-600">Niveau</label>
							<input
								type="text"
								className="border border-neutral-200 bg-neutral-100  text-neutral-400 focus:text-neutral-600 outline-0 py-2.5 pl-5 rounded-xs"
								value={niveau}
								onChange={(e) => {
									setNiveau(e.target.value);
								}}
							/>
						</div>
						{/* Field 7 */}
						<div className="flex flex-col gap-1">
							<label className="px-5 text-neutral-600">
								Changer le mot de passe
							</label>
							<input
								type="password"
								className="border border-neutral-200 bg-neutral-100  text-neutral-400 focus:text-neutral-600 outline-0 py-2.5 pl-5 rounded-xs"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>
						{/* Field 8 */}
						<div className="flex flex-col gap-1">
							<label className="px-5 text-neutral-600">Langue préférée</label>
							<input
								type="text"
								className="border border-neutral-200 bg-neutral-100  text-neutral-400 focus:text-neutral-600 outline-0 py-2.5 pl-5 rounded-xs"
								value={langue}
								onChange={(e) => {
									setLangue(e.target.value);
								}}
							/>
						</div>
						<div className="inline-block sm:hidden w-full text-center bg-skblue text-white hover:bg-white hover:text-skblue border border-skblue px-3.5 py-2 rounded-sm transition-all duration-300 cursor-pointer">
							Enregistrer
						</div>
					</form>
					<button className="w-full sm:w-fit bg-red-100 hover:bg-red-600 hover:text-white text-red-600 px-5 py-2 rounded-xs font-[500] -mt-4 sm:mt-4 transition-all duration-300 cursor-pointer">
						Supprimer le compte
					</button>
				</section>
			</div>
		</section>
	);
}
