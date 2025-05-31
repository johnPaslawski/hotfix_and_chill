import { useNavigate } from "react-router";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="h-20 w-full flex flex-row items-center shadow-xs shadow-gray-200 bg-white">
      <div
        className="text-left text-xl font-bold px-8 w-full cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="h-36" src="/logo_propositions/logo3_transparent.png" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
