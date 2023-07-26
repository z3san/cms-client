import { BiSolidContact } from "react-icons/bi";

const Header = () => {
  return (
    <div>
      <div className="flex gap-2 items-center justify-center pt-5">
        <BiSolidContact className="text-lg text-blue-600 lg:text-3xl font-bold font-serif" />
        <h1 className="text-lg lg:text-3xl   font-bold font-serif">
          Contact Management System
        </h1>
      </div>
    </div>
  );
};

export default Header;
