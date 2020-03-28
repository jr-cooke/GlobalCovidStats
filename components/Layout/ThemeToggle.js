import styled, { keyframes } from 'styled-components';
import { useTheme } from "../../contexts/theme";
import { toggleButtonColor } from "../../theme";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle(){
  const themeToggle = useTheme(); 
  return (
    <Toggle onClick={() => themeToggle.toggle()}>
      {themeToggle.theme.mode === "dark" ? <FiSun /> : <FiMoon />}
    </Toggle>
  );
}

const fadeIn = keyframes`	
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Toggle = styled.div`
  border: 1px solid ${toggleButtonColor};
  border-radius: 10px;
  height: 18px;
  color: ${toggleButtonColor};
  animation: ${fadeIn} 0.5s linear;
  transition: all 0.5s ease;
  padding: 5px 10px;
  svg {
    font-size: 20px;
    margin-top: -1px;
    &:hover {
      cursor: pointer;
    }
  }
`;