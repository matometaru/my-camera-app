import { Link } from "react-router-dom";

const Nav = () => {

  return (
    <ul>
      <li><Link to="/">サイズ未指定</Link></li>
      <li><Link to="/capture-2">サイズ指定</Link></li>
    </ul>
  );
};

export default Nav;
