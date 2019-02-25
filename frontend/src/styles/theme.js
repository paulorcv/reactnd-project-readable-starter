import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import lime from '@material-ui/core/colors/lime';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: teal,
    secondary: lime,
  },
  status: {
    danger: 'red',
  },
});

export default theme;