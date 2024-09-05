import { PiArrowUpRight } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const MenuItem = (props) => {
  const { link, text } = props;

  return (
    <li>
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive
            ? "font-semibold text-[#4B241A] menu-item-active"
            : "font-medium text-[#81655e] menu-item"
        }
      >
        {text}
        <PiArrowUpRight className="lg:hidden" />
      </NavLink>
    </li>
  );
};

export default MenuItem;
