import styles from "../public/css/Button.module.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className ? className : ""}`.trim()}
    >
      {text}
    </button>
  );
};

export default Button;
