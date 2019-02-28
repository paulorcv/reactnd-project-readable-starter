import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import yellow from '@material-ui/core/colors/yellow';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: teal,
    secondary: yellow,
  },
  status: {
    danger: 'red',
  },
});

export default theme;