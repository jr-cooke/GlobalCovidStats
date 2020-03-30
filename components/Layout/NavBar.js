import styled from 'styled-components';
import AutoSuggest from './AutoSuggest';
import ThemeToggle from './ThemeToggle';
import BackButton from './BackButton';

export default function NavBar({countries}) {    
  return (
    <NavWrapper>
      {!countries ? (
        <BackButton />
      ) : (
        <AutoSuggest countries={countries} />
      )}
      <ThemeToggle />
    </NavWrapper>
  );
}



const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 38px;
  padding: 20px;
  max-width: 768px;
  margin: auto;
`;