const styles = {
    root: {
      backgroundColor: "#071A2E",
      height: "100vh",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
    },
    container: {
      width: "70%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
    },
    nav: {
      display: "flex",
      width: "100%",
      alignItems: 'center',
      justifyContent: "space-between",
      color: "white",
    },
    miniPalettes: {
      boxSizing: "border-box",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(3, 30%)",
      gridGap: "5%",
    },
  };

  export default styles