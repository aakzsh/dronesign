import { Button } from "@mui/material";

const OutlinedButton = (props) => {
  return (
    <Button
    onClick={props.onClick}
      variant="outlined"
      sx={{
        // backgroundColor: "#4C00FF",
        color: "#4C00FF",
        padding: "12px 24px",
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: "400",
        fontSize: "13px",
        border: "1px solid #3B00CC",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        "&:hover": {
            color: "#ffffff",
          backgroundColor: "#3B00CC",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {props.text}
    </Button>
  );
};

export default OutlinedButton;
