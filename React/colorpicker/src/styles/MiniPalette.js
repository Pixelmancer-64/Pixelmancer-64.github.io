
const styles = {
    root: {
      backgroundColor: "white",
      border: "1px solid black",
      borderRadius: "10px",
      padding: ".5rem",
      position: "relative",
      overflow: "hidden",
      "&:hover": {
        cursor: "pointer",
      },
    },
  
    colors: {
      backgroundColor: "white",
      height: "15vh",
      display: "flex",
      flexWrap: "wrap",
      borderRadius: "5px",
      overflow: "hidden",
    },
    title: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      color: "black",
    },
    miniColors: {
      flexBasis: "20%",
      flex: '1'
    },
  };

  export default styles