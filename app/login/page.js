import Image from "next/image";
import Link from "next/link";
export default function LoginPage() {
	return (
		<div className="min-h-screen flex flex-col md:flex-row h-screen">
			{/* Login Form */}
			<div className="md:w-1/2 h-64 md:h-auto bg-blue-800 flex flex-col justify-center relative text-2xl">
				{/* Bienvenue */}
				<p
					className="text-white mt-10 md:mt-30 max-auto md:ml-[130px] text-2xl leading-[normal]
        flex flex-col justify-between md:mb-30 font-min text-center md:text-left 
          font-extralight"
				>
					Bienvenue à
				</p>

				{/* SKOOLUTION */}
				<div
					className="flex items-center font-bold text-[30px] sm:text-[40px] md:text-[50px] mx-auto md:ml-[130px]
         w-full md:w-auto mt-10 sm:mt-5 md:mt-20 text-center md:text-left ml-22  "
				>
					<span className="bg-white text-blue-800 px-2">SK</span>
					<span className="text-white ml-0.5">OOLUTION</span>
				</div>

				{/* La plateforme d'éducation */}
				<p
					className=" whitespace-nowrap text-xs text-white mb-17 w-1/5 
         mr-53 sm:mt-4 md:mb-100 mx-auto md:ml-[130px] text-center md:text-left font-extralight"
				>
					La plateforme d’éducation n°1 au Maroc.
				</p>
			</div>
			{/* Login Left */}
			<div className="w-full max-w-md mx-auto p-4 md:p-1 mt-30">
				<h1
					className="sm:text-6xl md:text-7xl g:text-10xl text-5xl font-bold mb-2 whitespace-nowrap
            text-center md:text-left md:mr-0 "
				>
					Se Connecter
				</h1>
				<p className="text-sm mb-6 text-center md:text-left mt-5 pt-5 text-gray-500  ">
					Veuillez entrer vos informations!
				</p>

				<form className="space-y-4 mt-5">
					<div className=" relative">
						<p className="ml-5 text-gray-500"> adresse email</p>
						<Image
							src="/sk/Vector.svg"
							alt="email"
							width={24}
							height={24}
							className="absolute ml-5 mt-3 "
						/>
						<input
							type="email"
							placeholder=" | Ecrivez votre email ici..."
							className="w-full border  py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
						/>
					</div>

					<div className="relative">
						<p className="ml-5 text-gray-500">Mot de passe</p>
						<Image
							src="/sk/Vector2.svg"
							alt="password"
							width={24}
							height={24}
							className="absolute ml-5 mt-2 w-5"
						/>
						<input
							type="password"
							placeholder="| Ecrivez votre mot de passe ici..."
							className="w-full border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
						/>
					</div>

					<div className="flex items-center justify-between text-sm">
						<label className="flex items-center">
							<input type="checkbox" className="mr-2 rounded accent-blue-500" />
							<span className="text-gray-500">Se souvenir de moi</span>
						</label>
						<a href="#" className="text-blue-600 hover:underline">
							Mot de passe oublié ?
						</a>
					</div>

					<button
						type="submit"
						className="w-full bg-[#0047BA] text-white py-2 rounded-md hover:bg-gray-300 transition"
					>
						Se Connecter
					</button>

					<div className="flex items-center my-4">
						<hr className="flex-grow border-gray-300" />
						<span className="px-2 text-gray-500 text-sm">Ou</span>
						<hr className="flex-grow border-gray-300" />
					</div>
					<div className="flex justify-center space-x-4">
						<button className=" hover:bg-gray-100">
							<Image
								src="/sk/Group 1000004178.svg"
								alt="google"
								width={24}
								height={24}
								className="w-20 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:rounded-xl"
							/>
						</button>
						<button className=" hover:bg-gray-100">
							<Image
								src="/sk/Group 1000004177.svg"
								alt="FACEBOOK"
								width={24}
								height={24}
								className="w-20 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:rounded-xl"
							/>
						</button>
						<button className=" hover:bg-gray-100">
							<Image
								src="/sk/Group 1000004179.svg"
								alt="tiktok"
								width={24}
								height={24}
								className="w-20 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:rounded-xl"
							/>
						</button>
					</div>
					<p className="text-center text-sm mt-6 text-gray-500">
						Avez-vous déjà un compte ?{" "}
						<Link href="register" className="text-blue-600 hover:underline">
							Cliquez ici!
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
