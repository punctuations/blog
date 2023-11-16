import * as redis from "@/helpers/redis";

export default async function Views(props: { id: string }) {
	return <li>{Intl.NumberFormat("en", { notation: "compact" }).format(await redis.get("views", props.id))} views</li>;
}
