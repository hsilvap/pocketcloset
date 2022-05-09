import React from 'react'
import ImageUploader from 'react-images-upload'
import { getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage'

import TopBar from '../../components/TopBar/TopBar'
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Divider,
  Snackbar,
  Typography
} from '@material-ui/core'
import { useStyles } from './styles'
import { UseStoreContext } from '../../context/store'

const Upload = () => {
  const classes = useStyles()
  const storage = getStorage()

  const { state } = UseStoreContext()
  const [tops, setTops] = React.useState([])
  const [bottoms, setBottoms] = React.useState([])
  const [isUploading, setIsUploading] = React.useState(false)
  const [requestStatus, setRequestStatus] = React.useState({
    open: false,
    text: ''
  })

  const uploadTops = React.useCallback(
    async tops => {
      setIsUploading(true)
      try {
        for (const file of tops) {
          const storageRef = ref(storage, `${state.user.uid}/tops/${file.name}`)
          await uploadBytes(storageRef, file)
        }
        setRequestStatus({ open: true, text: 'Top(s) saved!' })
      } catch (error) {
        setRequestStatus({ open: true, text: 'There was an error: ' + error })
      } finally {
        setIsUploading(false)
      }
    },
    [storage, state.user]
  )

  const uploadBottoms = React.useCallback(
    async tops => {
      setIsUploading(true)
      try {
        for (const file of tops) {
          const storageRef = ref(
            storage,
            `${state.user.uid}/bottoms/${file.name}`
          )
          await uploadBytes(storageRef, file)
        }
        setRequestStatus({ open: true, text: 'Bottom(s) saved!' })
      } catch (error) {
        setRequestStatus({ open: true, text: 'There was an error: ' + error })
      } finally {
        setIsUploading(false)
      }
    },
    [storage, state.user]
  )

  const deleteTop = React.useCallback(
    async file => {
      setIsUploading(true)
      try {
        const fileDeleteRef = ref(
          storage,
          `${state.user.uid}/tops/${file.name}`
        )
        await deleteObject(fileDeleteRef)
      } catch (error) {
        console.error(error)
      } finally {
        setRequestStatus({ open: true, text: 'Top deleted!' })
        setIsUploading(false)
      }
    },
    [state.user, storage]
  )

  const deleteBottom = React.useCallback(
    async file => {
      setIsUploading(true)
      try {
        const fileDeleteRef = ref(
          storage,
          `${state.user.uid}/bottoms/${file.name}`
        )
        await deleteObject(fileDeleteRef)
      } catch (error) {
        console.error(error)
      } finally {
        setRequestStatus({ open: true, text: 'Bottom deleted!' })
        setIsUploading(false)
      }
    },
    [state.user, storage]
  )

  const onDropTops = React.useCallback(
    async picture => {
      if (picture.length < tops.length) {
        for (let i = 0; i < tops.length; i++) {
          const exists = picture.find(x => x.name === tops[i].name)
          if (!exists) {
            deleteTop(tops[i])
          }
        }
      } else {
        uploadTops(picture)
      }
      setTops([...picture])
    },
    [tops, deleteTop, uploadTops]
  )

  const onDropBottoms = React.useCallback(
    async picture => {
      if (picture.length < bottoms.length) {
        for (let i = 0; i < bottoms.length; i++) {
          const exists = picture.find(x => x.name === bottoms[i].name)
          if (!exists) {
            deleteBottom(bottoms[i])
          }
        }
      } else {
        uploadBottoms(picture)
      }
      setBottoms([...picture])
    },
    [bottoms, deleteBottom, uploadBottoms]
  )

  return (
    <div className={classes.main}>
      <TopBar />
      <main className={classes.content}>
        <Container maxWidth='sm'>
          <Typography
            component='h3'
            variant='h4'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Upload Tops
          </Typography>

          <ImageUploader
            buttonClassName='MuiButton-containedPrimary MuiButton-containedPrimary'
            withIcon={true}
            onChange={onDropTops}
            imgExtension={['.jpg', '.png']}
            maxFileSize={5242880}
            withPreview
            label='Max file size: 5mb, accepted: jpg, png'
            buttonStyles={{
              color: ' #fff',
              backgroundColor: '#3f51b5',
              boxShadow:
                '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
              padding: ' 6px 16px',
              fontSize: '0.875rem',
              minWidth: '64px',
              boxSizing: ' border-box',
              transition:
                'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
              fontWeight: 500,
              lineHeight: 1.75,
              borderRadius: 4,
              letterSpacing: '0.02857em',
              textTransform: 'uppercase'
            }}
          />
        </Container>
        <Divider />
        <Container maxWidth='sm'>
          <Typography
            component='h3'
            variant='h4'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Upload Bottoms
          </Typography>

          <ImageUploader
            withIcon={true}
            onChange={onDropBottoms}
            imgExtension={['.jpg', '.png']}
            maxFileSize={5242880}
            withPreview
            label='Max file size: 5mb, accepted: jpg, png'
            buttonStyles={{
              color: ' #fff',
              backgroundColor: '#3f51b5',
              boxShadow:
                '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
              padding: ' 6px 16px',
              fontSize: '0.875rem',
              minWidth: '64px',
              boxSizing: ' border-box',
              transition:
                'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
              fontWeight: 500,
              lineHeight: 1.75,
              borderRadius: 4,
              letterSpacing: '0.02857em',
              textTransform: 'uppercase'
            }}
          />
        </Container>
      </main>
      <Backdrop
        style={{ zIndex: 2 }}
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isUploading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={requestStatus.open}
        onClose={() => {
          setRequestStatus({ text: '', open: false })
        }}
        message={requestStatus.text}
      />
    </div>
  )
}

export default Upload
