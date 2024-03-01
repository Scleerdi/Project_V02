import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-2">
      404 not found
      <Link to="/">
        <h4>Return home</h4>
      </Link>
    </div>
  );
};
