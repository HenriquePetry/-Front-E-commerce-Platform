import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/nav";
export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex flex-col items-center justify-center">
        {/* Espaço para a imagem */}
        <div className="mb-4">
          <img
            src="/img/unisinoslogo.jpg"
            alt="Unisinos Logo"
            className="w-32 h-32 object-contain"
          />
        </div>
        <div className="text-center">
          <button
            onClick={() => signIn("google")}
            className="bg-white py-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-2 mb-0 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}
