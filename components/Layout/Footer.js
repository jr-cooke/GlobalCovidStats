import styled from 'styled-components';
import { FiGithub, FiBarChart2 } from "react-icons/fi";
import { toggleButtonColor, headerBorder } from '../../theme';

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterItem>
        <FiGithub />
        <span>Developed by</span>
        <a href="https://github.com/jr-cooke" target="_blank">
          jr-cooke
        </a>
      </FooterItem>
      <FooterItem>
        <FiGithub />
        <span>Api's by</span>
        <a href="https://github.com/jr-cooke" target="_blank">
          mathdroid,
        </a>
        <a href="https://github.com/NovelCOVID/API" target="_blank">
          NovelCOVID
        </a>
      </FooterItem>
      <FooterItem>
        <FiBarChart2 /> 
        <span>Data provided by</span>
        <a href="https://systems.jhu.edu/" target="_blank">
          John Hopkins CSSE
        </a>
      </FooterItem>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  height: 20px;
  color: ${headerBorder};
  font-size: 14px;
  span{
    margin-right: 3px;
  }
  svg{
    margin-right: 3px;
    margin-top: 2px;
  }
  a {
    margin-right: 5px;
    color: ${toggleButtonColor};
  }
`;