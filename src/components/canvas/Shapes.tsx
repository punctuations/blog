"use client";

import { TorusKnot } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";

import { Clock } from "three";

import * as misc from "maath/misc";

import { ASCII, Bloom, EffectComposer, Noise } from "@react-three/postprocessing";

const Dots = (props) => {
	const torusRef = useRef(null!);

	const [clock, setClock] = useState({ getElapsedTime: () => 0 });

	useEffect(() => {
		setClock(new Clock());
	}, []);

	useFrame(() => {
		const et = clock.getElapsedTime();

		const t = misc.remap(Math.cos(0.25 * et), [-1, 0], [0, 1]);

		torusRef.current.rotation.x = 2 * Math.PI * t;
		torusRef.current.rotation.y = 2 * Math.PI * t;
		torusRef.current.rotation.y = 2 * Math.PI * t;
	});

	return (
		<>
			<EffectComposer>
				<ASCII fontSize={40} cellSize={10} font='monospace' characters=' .QWERTYUIOPASDFGHJKLZXCVBNM/#•' />
				<Bloom luminanceThreshold={0.65} luminanceSmoothing={0.1} height={300} />
				<Noise opacity={1} />
			</EffectComposer>

			<TorusKnot args={[1, 0.2, 128, 32]} ref={torusRef} {...props}>
				<meshPhongMaterial attach='material' color='#f3f3f3' />
			</TorusKnot>
		</>
	);
};

export default Dots;
