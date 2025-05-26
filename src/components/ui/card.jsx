export function Card({ children, ...props }) {
  return (
    <div {...props} className={`rounded-xl bg-white ${props.className || ""}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, ...props }) {
  return (
    <div {...props} className={`p-4 ${props.className || ""}`}>
      {children}
    </div>
  );
}
