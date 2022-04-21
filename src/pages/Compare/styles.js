import { makeStyles } from '@material-ui/core/styles'
export const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  main: {
    backgroundColor: theme.palette.background.paper,
    height: '100vh'
  }
}))
