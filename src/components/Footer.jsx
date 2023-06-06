import { SiAppwrite, SiReact, SiTailwindcss } from "react-icons/si";

function Footer() {
  return (
    <div className="w-full h-24 flex text-xs md:text-base items-center justify-center text-textSecondary dark:text-textSecondaryDark ">
      <div className="flex gap-2 items-center">
        Made with 💗 using{" "}
        <a
          href="https://appwrite.io/"
          target="_blank"
          rel="noreferrer"
          className="text-primary inline-block"
        >
          <div className="flex items-center gap-2"><SiAppwrite /> <div className="hidden sm:inline-block"> Appwrite </div></div>
        </a>{" "}
        +{" "}
        <a
          href="https://react.dev/"
          target="_blank"
          rel="noreferrer"
          className="text-primary inline-block"
        >
          <div className="flex items-center gap-2"><SiReact /> <div className="hidden sm:inline-block"> React </div></div>
        </a>{" "}
        +{" "}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noreferrer"
          className="text-primary inline-block"
        >
          <div className="flex items-center gap-2"><SiTailwindcss /> <div className="hidden sm:inline-block"> Tailwind CSS </div></div>
        </a>
      </div>
    </div>
  );
}

export default Footer;
