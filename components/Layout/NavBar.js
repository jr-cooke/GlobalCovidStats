import styled from 'styled-components';
import Link from "next/link";

export default function NavBar() {
  return (
    <NavWrapper>
      <Link href="/">
        <NavTitle>Global Corvid-19 Outbreak</NavTitle>
      </Link>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  height: 70px;
  justify-content: center;
`;

const NavTitle = styled.a`
  font-size: 24px;
  font-weight: 300;
`;