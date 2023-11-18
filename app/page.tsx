import Image from "next/image";

import * as motion from "@/components/dom/motion";

import "src/styles/extended.css";
import Posts from "@/components/dom/articles";
import Views from "@/components/dom/views";

import dynamic from "next/dynamic";

// because __this__ is a RSC need to make entire background client component
const Background = dynamic(() => import("@/components/canvas/Background"), { ssr: false });

export default function Page() {
	return (
		<main className='relative w-full h-full flex justify-center text-white'>
			<section className='z-30 text-center space-y-6'>
				<header className='mt-12 mb-32 flex flex-row justify-around items-center monospaced'>
					<a className='hover:text-gray-400 transition-colors duration-400' href='https://mattt.space'>
						&lt;- stdin
					</a>
					<div className='flex flex-col justify-center items-center'>
						<h3 className='font-semibold text-5xl'>stdout -&gt; blog</h3>
						<desc className='text-xl flex flex-row text-gray-400 space-x-1'>
							<p>by </p>
							<a
								href='https://github.com/punctuations'
								className='group text-white inline-flex items-center justify-center cursor-pointer'
							>
								<img src='https://github.com/punctuations.png' className='w-5 h-5 mr-2 rounded-full' />
								<span className='underline group-hover:no-underline group-hover:text-gray-500 transition-colors duration-300'>
									Matthew
								</span>
							</a>
						</desc>
					</div>
					<a href='https://github.com/punctuations/blog' className='hover:text-gray-400 transition-colors duration-400'>
						<svg width={24} height={24} viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z'
								fill='currentColor'
								fillRule='evenodd'
								clipRule='evenodd'
							/>
						</svg>
					</a>
				</header>
				<section className='flex flex-col justify-center items-center space-y-6'>
					{Posts.map((p, i) => (
						<>
							<a key={p.id} href={p.file} className='w-full flex justify-center'>
								<motion.article
									initial={{ y: 20, opacity: 0 }}
									animate={{
										y: 0,
										opacity: 1,
										transition: {
											duration: 0.4,
											delay: 0.2 + i * 0.05,
											ease: [0.48, 0.15, 0.25, 0.96],
										},
									}}
									exit={{ y: 20, opacity: 0 }}
									className='flex flex-row space-x-4 w-2/3'
								>
									<Image
										src={p.prefferd_image}
										alt={p.name}
										width={128}
										height={128}
										className='w-32 h-32 rounded-xl bg-black'
										blurDataURL={p.images.static}
									/>
									<div className='group cursor-pointer text-left flex flex-col'>
										<header className='text-5xl font-bold group-hover:underline'>{p.name}</header>
										<ul className='text-gray-500 mb-2 flex flex-row space-x-1'>
											<li>{p.date.toLocaleDateString("en-US")}</li> <li>•</li>
											<Views key={p.id} id={p.id} />
										</ul>
										<p className='text-base text-gray-400'>{p.desc}</p>
									</div>
								</motion.article>
							</a>
							{Posts.length != i + 1 && (
								<motion.hr
									initial={{ y: 20, opacity: 0 }}
									animate={{
										y: 0,
										opacity: 0.2,
										transition: {
											duration: 0.4,
											delay: 0.2 + i * 0.05,
											ease: [0.48, 0.15, 0.25, 0.96],
										},
									}}
									exit={{ y: 20, opacity: 0 }}
									className='w-2/3 border-dashed'
								/>
							)}
						</>
					))}
				</section>
				<br />
				<br />
				<br />
				<br />
			</section>

			<div className='fixed bottom-0 left-0 w-full h-full fade z-50 pointer-events-none' />

			<div className='fixed z-20 w-full h-full bg-black/80' />
			<div className='z-10 fixed w-full h-full flex justify-center items-center'>
				<Background />
			</div>
		</main>
	);
}
