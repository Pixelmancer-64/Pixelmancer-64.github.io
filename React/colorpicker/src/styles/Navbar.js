const styles = {
  "@global": {
    ".Slider": {
      width: "20%",
      margin: "0 10px",
    },
    ".Navbar": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "6vh",
      gap: "2rem",
      margin: "0 1rem",
    },
    ".logo": {
      fontSize: "2rem",
      color: "black",
    },
    ".logo a": {
      textDecoration: "none",
      color: "inherit",
    },
    ".Slider-container": {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
    ".Navbar-select": {
      display: "flex",
      whiteSpace: "pre",
      marginLeft: "auto",
      alignItems: "center",
      gap: "3rem",
    },
    ".Snackbar span": {
      letterSpacing: "1px",
      textTransform: "uppercase",
      fontWeight: "500",
      background:
        "linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722)",
      color: "transparent",
      backgroundClip: "text",
      fallbacks: [
        {
          color: "transparent",
        },
      ],
    },
  },
};

export default styles;
