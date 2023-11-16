import * as redis from "@/helpers/redis";

export default function Header(props: {
	title: string;
	authors: { name: string; img: string; link: string }[];
	id: string;
}) {
	return (
		<>
			<a
				href={"/"}
				className='border-gray-800 border px-4 py-3 rounded-md bg-[#0d1117] text-sm absolute top-5 left-5 monospaced'
			>
				&lt;- stdout
			</a>
			<header id='blog-header' className='flex flex-col justify-center items-center monospaced'>
				<h3 key={props.title} className='font-semibold text-5xl'>
					{props.title}
				</h3>
				<desc key={props.authors.length} className='text-xl flex flex-row text-gray-400 space-x-1'>
					<p>by </p>
					{props.authors.map(async (a, i) => {
						return (
							<>
								<a
									key={i}
									href={a.link}
									className='group text-white inline-flex items-center justify-center cursor-pointer'
								>
									<img src={a.img} className='w-5 h-5 mr-2 rounded-full' />
									<span className='underline group-hover:no-underline group-hover:text-gray-500 transition-colors duration-300'>
										{a.name}
									</span>
								</a>
								{i + 1 != props.authors.length && ", "}
								<p className='pl-2'> • {await redis.increment("views", props.id)} views</p>
							</>
						);
					})}
				</desc>
			</header>
			<hr className='border-gray-600 mt-6 mb-12 mx-32' />
		</>
	);
}
