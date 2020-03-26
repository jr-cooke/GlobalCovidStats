import styled, { keyframes } from 'styled-components';
import { useTheme } from "../../contexts/theme";
import { WiSunset, WiMoonset } from 'react-icons/wi';
import { toggleButtonColor } from "../../theme";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { WiDirectionLeft } from 'react-icons/wi';

export default function NavBar() {
  const themeToggle = useTheme();
  const router = useRouter();
  console.log("NavBar -> router", router)
  const [showBack, setShowBack] = useState(router.pathname.includes('country'))
  
  useEffect(() => {
    setShowBack(router.pathname.includes("country"));
  }, [router.pathname])
  
  const handleClick = e => {
    e.preventDefault();
    router.push('/');
  };

  console.log("NavBar -> showBack", showBack)
  return (
    <NavWrapper showBack={showBack}>
      {showBack && (
        <BackButton onClick={e => handleClick(e)}>
          <WiDirectionLeft />
        </BackButton>
      )}
      <ThemeToggle onClick={() => themeToggle.toggle()}>
        {themeToggle.theme.mode === "dark" ? <WiSunset /> : <WiMoonset />}
      </ThemeToggle>
    </NavWrapper>
  );
}

const fadeIn = keyframes`	
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
`;

const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: ${({ showBack }) => showBack ? 'space-between' : 'flex-end'};
  height: 38px;
  padding: 1rem;
`;

const ThemeToggle = styled.div`
  font-size: 38px;
  color: ${toggleButtonColor};
  animation: ${fadeIn} 0.5s linear;
  transition: color 0.5s ease;
  opacity: 0.8;
  &:hover{
    cursor: pointer;
  }
`;

const BackButton = styled.div`
  font-size: 38px;
  color: ${toggleButtonColor};
  animation: ${fadeIn} 0.5s linear;
  transition: color 0.5s ease;
  opacity: 0.8;
  &:hover{
    cursor: pointer;
  }
`;