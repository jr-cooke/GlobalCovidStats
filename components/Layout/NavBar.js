import styled from 'styled-components';
import Link from "next/link";

export default function NavBar() {
  return (
    <NavWrapper>
      <Link href="/">
        <NavTitle>Corvid19 Tracker</NavTitle>
      </Link>
      <NavLeft>
        <Link href="/map">
          <NavItem>World Map</NavItem>
        </Link>
      </NavLeft>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  padding: 10px 30px;
  height: 30px;
  background-color: #ffffff;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
`;

const NavTitle = styled.a`
  font-size: 24px;
  font-weight: 400;
  width: 190px;
  color: #b71c1c;
`;

const NavLeft = styled.div`
  width: calc(100% - 190px);
  display: flex;
  justify-content: flex-end;
`;

const NavItem = styled.a`
  color: #b71c1c;
`;