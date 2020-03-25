import styled, { keyframes } from 'styled-components';
import { useTheme } from "../../contexts/theme";
import { WiSunset, WiMoonset } from 'react-icons/wi';
import { toggleButtonColor } from "../../theme";

export default function NavBar() {
  const themeToggle = useTheme();

  return (
    <NavWrapper>
      <ThemeToggle onClick={() => themeToggle.toggle()}>
        {themeToggle.theme.mode === 'dark' ? <WiSunset /> : <WiMoonset />}
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
  justify-content: flex-end;
  height: 38px;
  padding: 1rem;
`;

const ThemeToggle = styled.div`
  font-size: 38px;
  color: ${toggleButtonColor};
  animation: ${fadeIn} 0.5s linear;
  transition: color 0.5s ease;
  opacity: 0.8;
`;