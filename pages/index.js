import { createGlobalStyle } from 'styled-components';
import Dashboard from '../components/Dashboard';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  body {
    margin: 0;
  }
`;

export default function IndexPage() {
  return (
    <>
      <GlobalStyle />
      <Dashboard />
    </>
  )
}