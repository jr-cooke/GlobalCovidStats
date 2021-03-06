import styled, { keyframes } from 'styled-components';
import { toggleButtonColor } from "../../theme";
import { FiChevronLeft } from 'react-icons/fi';
import { useRouter } from "next/router";

export default function BackButton(){
  const router = useRouter();
  const handleClick = e => {
    e.preventDefault();
    router.push('/');
  };
  
  return (
    <Back onClick={e => handleClick(e)}>
      <FiChevronLeft />
    </Back>
  )
}

const Back = styled.div`
  border: 1px solid ${toggleButtonColor};
  border-radius: 10px;
  height: 18px;
  color: ${toggleButtonColor};
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