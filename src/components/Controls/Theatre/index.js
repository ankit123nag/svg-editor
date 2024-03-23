import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const Cube = () => {
    const meshRef = useRef(null);
    useFrame(() => {
        if (!meshRef.current) {
            return;
        }
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    });
    return (<mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color='blue' />
    </mesh>);

}

const Theatre = () => {
    return <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Cube />
    </Canvas>;
}

export default Theatre;