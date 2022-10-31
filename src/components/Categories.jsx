import { NavLink } from "react-router-dom";

function Categories({ data }) {
  return (
    <ul className="py-2 flex flex-row">
      {data.genres?.slice(0, 4).map((g) => (
        <NavLink to={`/category/${g.id}/1`} key={g.id}>
          <li
            type="button"
            className="inline-block cursor-pointer px-4 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            {g.name}
          </li>
        </NavLink>
      ))}
    </ul>
  );
}

export default Categories;
