"use client"
import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
// eslint-disable-next-line no-unused-vars
import SceneWithDeclarativeWay from "@/components/Scene/SceneWithDeclarativeWay";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { getRandomPosition } from "@/components/utils";
import { Perf } from "r3f-perf";

function App() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);
  const [isBrowser, setIsBrowser] = useState(false);
  const [files, setFiles] = useState([
    {
      url: "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/point_cloud/iteration_7000/point_cloud.ply",
      position: [-3, -2, -3.2],
    },
    {
      url: "https://huggingface.co/datasets/runes/coolsplats/resolve/main/output.splat",
      position: [3, 2, 3.2],
    }
  ]);

  useEffect(() => {
    // This code runs only on the client side, useEffect is not invoked server-side
    setIsBrowser(typeof window !== 'undefined');
  }, []);


  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/upload');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFiles(data.files);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };

    fetchFiles();
  }, []);
  const handleFileUpload = async (event: { preventDefault: () => void; target: any; }) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setLoading(true)
    const form = event.target;
    const file = form.querySelector('input[type="file"]').files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setFiles((prevFiles) => [
            ...prevFiles,
            {
              url: result.url,
              position: getRandomPosition(),
            },
          ]);
          setLoading(false)

        } else {
          const error = await response.json();
          console.error('Error uploading file:', error);
          setLoading(false)
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setLoading(false)
      }
    }
  };


  return (
    <div className="app">
      <div className="w-full">
        <div className="flex w-full justify-center">
          <form onSubmit={handleFileUpload} className="flex items-center justify-center w-full max-w-96">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>

                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PLY or SPLAT </p>
              </div>
              <input id="dropzone-file" type="file" accept=".ply,.splat" className="hidden" />
            </label>


            <button disabled={loading} type="submit" className="ml-4 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> {loading ? 'Uploading...' : 'UPLOAD'}</button>
          </form>
        </div>
      </div>

      <div className="w-full min-h-screen scene-wrapper">
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
              fileurl={file.url}
              position={file.position}
            />
          ))}
        </Suspense>
        <OrbitControls />
      </Canvas>
      </div>
    </div>
  );
}

export default App;

