"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { OrbitControls, View as ViewImpl } from "@react-three/drei";
import { Three } from "@/helpers/components/Three";

// export const Common = ({ color }) => (
// 	<Suspense fallback={null}>
// 		{color && <color attach='background' args={[color]} />}
// 		<spotLight position={[20, 30, 10]} angle={0.15} penumbra={1} />
// 		<pointLight position={[-10, -10, -10]} />
// 		<PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
// 	</Suspense>
// );

const View = forwardRef(({ children, orbit, ...props }, ref) => {
	const localRef = useRef(null);
	useImperativeHandle(ref, () => localRef.current);

	return (
		<>
			<div ref={localRef} {...props} />
			<Three>
				<ViewImpl track={localRef}>
					{children}
					{orbit && <OrbitControls />}
				</ViewImpl>
			</Three>
		</>
	);
});
View.displayName = "View";

// export { View };

export default View;
