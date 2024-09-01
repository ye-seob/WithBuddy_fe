import styles from "../public/css/Button.module.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
