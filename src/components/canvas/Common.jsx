"use client";

import { Suspense } from "react";
import { PerspectiveCamera } from "@react-three/drei";

const Common = ({ color }) => (
	<Suspense fallback={null}>
		{color && <color attach='background' args={[color]} />}
		<spotLight position={[20, 30, 10]} angle={0.15} penumbra={1} />
		<pointLight position={[-10, -10, -10]} />
		<PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
	</Suspense>
);

export default Common;
