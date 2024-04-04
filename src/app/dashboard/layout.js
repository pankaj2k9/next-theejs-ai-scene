import { Boundary } from "@/app/_components/boundary";

export default function Layout({ children }) {
  return (
    <Boundary label="Dasboard Layout" bg="green" filePath="layout.tsx">
      {children}
    </Boundary>
  );
}