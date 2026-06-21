import { ClipLoader } from "react-spinners";
import style from "./Loader.module.css";
import type { CSSProperties } from "react";

export default function Loader() {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
  };
  return (
    <div className={style.backdrop}>
      <ClipLoader color="#36d7b7" cssOverride={override} size={150} />
    </div>
  );
}
