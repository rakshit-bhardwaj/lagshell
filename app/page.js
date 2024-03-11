import './styles/global.css'
import Main from "./pages/Main";
import { attachConsole } from "tauri-plugin-log-api";

attachConsole();
export default function Home() {
  return (
    <>
    <Main/>
    </>
  );
}
