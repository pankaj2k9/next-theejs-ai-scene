
import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
// Assume you have a Joystick component that reports its position as {x, y}
import Joystick from '@/components/Home/Joystick';

export default function SceneWithJoystick() {
    const { camera } = useThree();
    const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
    const targetPosition = useRef(new THREE.Vector3());

    // Update the target position based on joystick input
    const updateCameraPosition = (joystickPos:any) => {
        // Assume a direct mapping of joystick position (-1 to 1) to camera movement
        targetPosition.current.x += joystickPos.x * 0.1; // Adjust the multiplier as needed
        targetPosition.current.z += joystickPos.y * 0.1; // Adjust the multiplier as needed
    };

    useFrame(() => {
        // Use lerp to smoothly update the camera's position towards the target
        camera.position.lerp(targetPosition.current, 0.1);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    });

    // Call updateCameraPosition whenever the joystickPosition state changes
    useEffect(() => {
        updateCameraPosition(joystickPosition);
    }, [joystickPosition]);
    // Render the joystick and the scene
    return (
        <>
            <Joystick onChange={setJoystickPosition} />
        </>
    );
}

// import { useState, useRef } from 'react';
// import { useFrame, useThree } from '@react-three/fiber';
// import * as THREE from 'three';

// export default function Marker() {
//     const [clicked, setClicked] = useState(false);
//     const [targetPosition, setTargetPosition] = useState(new THREE.Vector3());
//     const markerRef = useRef<any>();
//     const vec = new THREE.Vector3();
//     const { camera, raycaster, mouse } = useThree();

//     const onClick = (event:any) => {
//         // Update the mouse position
//         mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//         mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
//         // Raycast to find the point on the 3D object
//         raycaster.setFromCamera(mouse, camera);
//         const intersects = raycaster.intersectObject(markerRef.current);

//         if (intersects.length > 0) {
//             setClicked(true);
//             setTargetPosition(intersects[0].point);
//         }
//     };


//     useFrame(() => {
//         if (clicked) {
//             camera.lookAt(markerRef.current.position);
//             // Lerp towards the target position
//             camera.position.lerp(vec.copy(targetPosition), 0.01);
//             camera.updateProjectionMatrix();
//         }
//     });

//     return (
//         <mesh
//             ref={markerRef}
//             onClick={onClick}
//         >
//             <coneGeometry attach='geometry' args={[1, 5, 20]} />
//             <meshLambertMaterial attach='material' color={'#FFFFFF'} />
//         </mesh>
//     );
// }
