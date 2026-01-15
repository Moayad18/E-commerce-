import React, { useEffect, useRef, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import { Link, useLocation } from "react-router";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";

const NavLinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Accessories", link: "/accessories" },
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
];

const BtmHeader = () => {
  const navRef = useRef();
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isCategoryOpen &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategoryOpen]);

  return (
    <div className="btm_header">
      <div className="container">
        <nav className="nav">
          <div className="category_nav" ref={navRef}>
            <div
              className="category_btn"
              onClick={() => {
                setIsCategoryOpen(!isCategoryOpen);
              }}
            >
              <IoMdMenu />
              <p>Browse Category</p>
              <MdArrowDropDown />
            </div>

            <div
              className={`category_nav_list ${isCategoryOpen ? "active" : ""}`}
            >
              {categories.map((category) => {
                return (
                  <Link
                    key={category.slug}
                    to={`category/${category.slug}`}
                    onClick={() => setIsCategoryOpen(false)}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="nav_links">
            {NavLinks.map((navLink) => (
              <li
                key={navLink.link}
                className={location.pathname === navLink.link ? "active" : ""}
              >
                <Link to={navLink.link}>{navLink.title}</Link>
              </li>
            ))}
          </div>
        </nav>

        <div className="sign_regster_icons">
          <Link to={""}>
            <PiSignInBold />
          </Link>
          <Link to={""}>
            <FaUserPlus />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BtmHeader;
