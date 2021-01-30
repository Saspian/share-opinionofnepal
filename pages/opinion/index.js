import { useEffect } from "react";
import { environment } from "../../components/utils";

export default function Opinion() {
  useEffect(() => {
    window.location.href = environment();
  }, []);

  return <span style={{ color: "#70C03F" }}>redirecting...</span>;
}
