import theme from "styled-theming";

export const backgroundColor = theme("mode", {
  light: "#eeeeee",
  dark: "#101010"
});

export const textColor = theme("mode", {
  light: "#000",
  dark: "#fff"
});

export const toggleButtonColor = theme("mode", {
  light: '#424242',
  dark: '#f9a825'
});

export const chartTooltipBackground = theme("mode", {
  light: '#ffffff',
  dark: '#212121'
});

export const autoSuggestBorder = theme("mode", {
  light: '#D6D6D6',
  dark: '#212121'
});

export const openTabBorder = theme("mode", {
  light: '1px solid #424242',
  dark: '1px solid #f9a825'
});

export const closedTabColor = theme("mode", {
  light: "#ABABAB",
  dark: "#555555"
});

export const headerBorder = theme("mode", {
  light: "#ABABAB",
  dark: "#555555"
});


