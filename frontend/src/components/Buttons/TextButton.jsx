import { Button } from "@mui/material";

const TextButton = (props) => {
  return (
    <Button
    onClick={props.onClick}
      variant="text"
      sx={{
        // backgroundColor: "#4C00FF",
        color: "#FFFFFF",
        padding: "12px 24px",
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: "400",
        fontSize: "13px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          backgroundColor: "#3B00CC",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {props.text}
    </Button>
  );
};

export default TextButton;
