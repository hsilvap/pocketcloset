import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 62,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: '0',
    backgroundColor: '#0288d1 !important',
    alignItems: 'center',
    color: '#FFF !important',
    boxShadow:
      '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'
  },
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  usernameContainer: {
    paddingBottom: 6,
    userSelect: 'none'
  },
  button: {
    color: '#FFF !important'
  },
  colorPrimary: {
    color: 'green'
  }
}))

export default useStyles
