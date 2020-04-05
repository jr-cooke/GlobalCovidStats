import styled from 'styled-components';
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

const Toggle = styled.div`
  border: 1px solid ${toggleButtonColor};
  border-radius: 10px;
  color: ${toggleButtonColor};
  transition: all 0.5s ease;
  padding: 2px 10px;
  height: 26px;
  svg {
    font-size: 20px;
    margin-top: 3px;
    &:hover {
      cursor: pointer;
    }
  }
`;