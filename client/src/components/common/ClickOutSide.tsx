import { useEffect, useRef, ReactNode, CSSProperties } from "react";

interface IProps {
  onClickOutside?: () => void;
  children: ReactNode;
  style?: CSSProperties;
}

export default function ClickOutSide(props: IProps) {
  const ref = useRef<any>(null);
  const { onClickOutside, children, style } = props;

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current?.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <div ref={ref} style={{ ...(style || {}) }}>
      {children}
    </div>
  );
}
