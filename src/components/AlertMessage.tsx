import React, { useEffect } from "react";
import Swal from "sweetalert2";
import styles from "../public/css/AlertMessage.module.css";

interface AlertMessageProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    Swal.fire({
      toast: true,
      position: "top",
      title: message,
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        popup: type === "success" ? styles.successToast : styles.errorToast,
      },
      willClose: onClose,
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default AlertMessage;
