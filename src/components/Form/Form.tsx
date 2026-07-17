import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

import style from "./Form.module.css";

interface FormProps {
  onSubmit: (value: string) => void;
}
export default function Form({ onSubmit }: FormProps) {
  function handleSubmit(formData: FormData) {
    const value = (formData.get("search") as string).trim();
    if (value !== "") {
      onSubmit(value);
      console.log(value);
    } else {
      console.log(0);
      toast("Please enter your search query.");
    }
  }
  return (
    <form action={handleSubmit} className={style.form}>
      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        autoFocus
      />

      <button className={style.button} type="submit" aria-label="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}
