import { Button } from "@mui/material";

const GradientButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      variant="contained"
      sx={{
        backgroundImage: "linear-gradient(to right, #4C00FF, #960099)",
        color: "#FFFFFF",
        padding: "12px 24px",
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: "400",
        fontSize: "13px",
        // border: "1px solid transparent",
        // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          backgroundImage: "linear-gradient(to right, #3B00CC, #7A007A)",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {props.text}
    </Button>
  );
};

export default GradientButton;
