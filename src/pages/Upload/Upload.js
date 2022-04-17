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

  const onDropBottoms = picture => {
    setBottoms([...picture])
  }

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
          <Button></Button>

          <ImageUploader
            withIcon={true}
            onChange={onDropBottoms}
            imgExtension={['.jpg', '.png']}
            maxFileSize={5242880}
            withPreview
            label='Max file size: 5mb, accepted: jpg, png'
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
