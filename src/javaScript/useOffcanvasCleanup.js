import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useOffcanvasCleanup() {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.remove("offcanvas-backdrop", "modal-open");
    document.body.style.overflow = "";
  }, [location.pathname]);
}
