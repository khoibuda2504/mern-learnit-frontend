import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
  const {
    postState: { post },
    showUpdatePostModal, setShowUpdatePostModal, updatePost, setShowToast } = useContext(PostContext)
  useEffect(() => {
    setUpdatedPost(post)
  }, [post])
  const [updatedPost, setUpdatedPost] = useState(post)

  const onChangeUpdatedPostForm = event => setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    const { success, message } = await updatePost(updatedPost)
    setShowUpdatePostModal(false)
    setShowToast({
      show: true,
      message,
      type: success ? 'success' : 'danger'
    })
  }
  // const resetAddPostData = () => {
  //   setUpdatedPost({
  //     title: '',
  //     description: '',
  //     url: '',
  //     status: "TO LEARN"
  //   })
  //   setShowAddPostModal(false)
  // }
  const closeDialog = () => {
    setUpdatedPost(post)
    setShowUpdatePostModal(false)
  }
  const { title, description, url, status } = updatedPost
  return (
    <>
      <Modal show={showUpdatePostModal} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>
            Making progess?
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control type='text' placeholder='Title' name='title' value={title ?? ''} onChange={onChangeUpdatedPostForm} required aria-describedby='title-help' />
              <Form.Text id='title-help' muted>Required</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control as='textarea' rows={3} type='text' placeholder='Description' name='description' value={description ?? ''} onChange={onChangeUpdatedPostForm} />
            </Form.Group>
            <Form.Group>
              <Form.Control type='text' placeholder='Youtube tutorial URL' name='url' value={url ?? ''} onChange={onChangeUpdatedPostForm} />
            </Form.Group>
            <Form.Group>
              <Form.Control as='select' name='status' value={status ?? ''} onChange={onChangeUpdatedPostForm}>
                <option value="TO LEARN">TO LEARN</option>
                <option value="LEARNING">LEARNING</option>
                <option value="LEARNED">LEARNED</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
            <Button variant='primary' type='submit'>LearnIt!</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default UpdatePostModal