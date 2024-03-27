"use client"
import { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
// eslint-disable-next-line no-unused-vars
import SceneWithDeclarativeWay from "./components/SceneWithDeclarativeWay";
// import Scene from "./Scene";
// import Loader from "./Loader.jsx";
import { Perf } from "r3f-perf";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

const getRandomPosition = () => {
  return [Math.random() * 6 - 3, Math.random() * 4 - 2, Math.random() * 5 - 2.5];
};

function App() {
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);
  const [files, setFiles] = useState([
    {
      url: "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/point_cloud/iteration_7000/point_cloud.ply",
      position: [-3, -2, -3.2],
    },
    {
      url: "https://huggingface.co/datasets/runes/coolsplats/resolve/main/output.splat",
      position: [3, 2, 3.2],
    },
  ]);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          url,
          position: getRandomPosition(), // Assuming you have a function to assign random positions
        },
      ]);
    }
  };

  return (
    <div className="app">
      <div className="input-overlay">
        <input type="file" onChange={handleFileUpload} accept=".ply,.splat" />
      </div>

      <Canvas ref={canvasRef}>
        <Perf position="top-left" />
        <PerspectiveCamera makeDefault position={[-1, -4, 6]} fov={65} />
        <Suspense fallback={null}>
          {/* <SceneWithDreiOnlyForSplat onProgress={setProgress} /> */}
          {/* <Scene onProgress={setProgress} canvasRef={canvasRef} /> */}
          {/* {progress !== 100 && <Loader progress={progress} />} */}

          {files.map((file, index) => (
            <SceneWithDeclarativeWay
              key={index}
              onProgress={setProgress}
              canvasRef={canvasRef}
              fileurl={file.url}
              position={file.position}
            />
          ))}
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;

