import { container } from "../../../../assets/jss/material-kit-react.jsx";

const postPageStyle = {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingBottom: "10vh",
    color: "#FFFFFF"
  }, 

   inputIconsColor: {
    color: "#495057"
  },
  fab:{
    position: 'absolute',
    bottom: "30px",
    right: "30px",    
  },
  chip: {
    margin: "20px",    
    marginTop: '0px'
  }
};

export default postPageStyle;
