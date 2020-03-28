import { createGlobalStyle } from "styled-components";
import { MyThemeProvider } from "../contexts/theme";
import { backgroundColor, textColor } from "../theme";

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  body {    
    transition: all 0.3s ease;
    background: ${backgroundColor};
    color: ${textColor};
    margin: 0;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default function RonaTime({ Component, pageProps}) {
  return (
    <MyThemeProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ MyThemeProvider>
  );
}