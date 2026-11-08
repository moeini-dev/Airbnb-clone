import { Suspense } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenuHelper from "./UserMenuHelper";

function UserMenuFallback() {
  return (
    <div className="
      h-12
      min-w-12
      md:w-1/5
      rounded-full
      animate-pulse
      bg-gray-100
      cursor-not-allowed
      transition
    "></div>
  );
}

export async function Navbar() {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="
        py-4
        border
      ">
        <Container>
          <div className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
          "
          >
            <Logo />
            <Search />
            <Suspense fallback={<UserMenuFallback />}>
              <UserMenuHelper />
            </Suspense>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Navbar;