import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import nextMDX from "@next/mdx";
import bundler from "@next/bundle-analyzer";
import withPWAInit from "@ducanh2912/next-pwa";

import * as fs from "fs";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

/** @type {import('rehype-pretty-code').Options} */
const options = {
	theme: JSON.parse(fs.readFileSync(`${process.cwd()}/src/helpers/dark-default.json`, "utf8")),
};

const withMDX = nextMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex, [rehypePrettyCode, options]],
	},
});

const withBundleAnalyzer = bundler({
	enabled: process.env.ANALYZE === "true",
});

/**
 * A fork of 'next-pwa' that has app directory support
 * @see https://github.com/shadowwalker/next-pwa/issues/424#issuecomment-1332258575
 */
const withPWA = withPWAInit({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
	// Configure `pageExtensions` to include MDX files
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.

	images: {
		remotePatterns: [{ protocol: "https", hostname: "github.com", port: "", pathname: "/**" }],
	},
	webpack(config, { isServer }) {
		if (!isServer) {
			// We're in the browser build, so we can safely exclude the sharp module
			config.externals.push("sharp");
		}
		// audio support
		config.module.rules.push({
			test: /\.(ogg|mp3|wav|mpe?g)$/i,
			exclude: config.exclude,
			use: [
				{
					loader: require.resolve("url-loader"),
					options: {
						limit: config.inlineImageLimit,
						fallback: require.resolve("file-loader"),
						publicPath: `${config.assetPrefix}/_next/static/images/`,
						outputPath: `${isServer ? "../" : ""}static/images/`,
						name: "[name]-[hash].[ext]",
						esModule: config.esModule || false,
					},
				},
			],
		});

		// shader support
		config.module.rules.push({
			test: /\.(glsl|vs|fs|vert|frag)$/,
			exclude: /node_modules/,
			use: ["raw-loader", "glslify-loader"],
		});

		return config;
	},
};

const KEYS_TO_OMIT = [
	"webpackDevMiddleware",
	"configOrigin",
	"target",
	"analyticsId",
	"webpack5",
	"amp",
	"assetPrefix",
];

export default (_phase, { defaultConfig }) => {
	const plugins = [[withMDX], [withPWA], [withBundleAnalyzer, {}]];

	const wConfig = plugins.reduce((acc, [plugin, config]) => plugin({ ...acc, ...config }), {
		...defaultConfig,
		...nextConfig,
	});

	const finalConfig = {};
	Object.keys(wConfig).forEach((key) => {
		if (!KEYS_TO_OMIT.includes(key)) {
			finalConfig[key] = wConfig[key];
		}
	});

	return finalConfig;
};
