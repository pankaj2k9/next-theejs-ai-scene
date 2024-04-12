/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
import * as THREE from 'three';

interface SceneWithDeclarativeWayProps {
  fileurl: string;
  position: any;
  cameraPosition:any;
  cameraLookAt:any;
  cameraUp:any;
  sceneRotation1:any;
  sceneRotation2:any;
}
const SceneWithDeclarativeWay = ({ fileurl, position, cameraPosition, cameraLookAt, cameraUp, sceneRotation1, sceneRotation2 }: SceneWithDeclarativeWayProps) => {
  const { gl, camera, scene } = useThree();

  useEffect(() => {
    // onProgress(100);
    // Initialize the viewer with the provided renderer and camera from R3F
      const viewer = new GaussianSplats3D.DropInViewer({
        cameraUp: [cameraUp.x, cameraUp.y, cameraUp.z],
        initialCameraPosition: [cameraPosition.x, cameraPosition.y, cameraPosition.z],
        initialCameraLookAt: [cameraLookAt.x, cameraLookAt.y, cameraLookAt.z],
        selfDrivenMode: true,
        useBuiltInControls: true,
        ignoreDevicePixelRatio: true,
        dynamicScene: true,
        focalAdjustment: 1.0
      });
  
      // Load the scene
      viewer
        .addSplatScene(fileurl, {
          streamView: true,
          scale: [1, 1, 1],
          rotation:  new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(sceneRotation1.x, sceneRotation1.y, sceneRotation1.z).normalize(), new THREE.Vector3(sceneRotation2.x, sceneRotation2.y, sceneRotation2.z)).toArray(),
          position: position,
        })
        .then(() => {
          // viewer.start();
          scene.add(viewer);
        });
  
      return () => {
        // Perform cleanup
        viewer.dispose();
      };


   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, camera]);



  // useFrame(() => {
  //   if (viewerRef.current) {
  //     viewerRef.current.update();
  //     viewerRef.current.render();
  //   }
  // });

  return null;
};
export default SceneWithDeclarativeWay;
