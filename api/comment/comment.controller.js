import { commentService } from './comment.service.js'
import { logger } from '../../services/logger.service.js'

export async function getComments(req, res) {
    try {
        logger.debug('Getting Comments:', req.query)
        const filterBy = req.query
        console.log(filterBy)
        const comments = await commentService.query(filterBy)
        res.json(comments)
    } catch (err) {
        logger.error('Failed to get comments', err)
        res.status(400).send({ err: 'Failed to get comments' })
    }
}

// export async function getCommentById(req, res) {
//     try {
//         const commentId = req.params._id
//         const comment = await commentService.getById(commentId)
//         res.json(comment)
//     } catch (err) {
//         logger.error('Failed to get comment', err)
//         res.status(400).send({ err: 'Failed to get comment' })
//     }
// }

// export async function getCommentByUserId(req, res) {
//     try {
//         const userId = req.params.id;
//         const comments = await commentService.query({ 'buyer._id': userId });
//         res.json(comments);
//     } catch (err) {
//         logger.error('Failed to get comment', err);
//         res.status(400).send({ err: 'Failed to get comment' });
//     }
// }

export async function addComment(req, res) {
    try {
        const comment = req.body
        const addedComment = await commentService.add(comment)
        res.json(addedComment)
    } catch (err) {
        logger.error('Failed to add comment', err)
        res.status(400).send({ err: 'Failed to add comment' })
    }
}


// export async function updateComment(req, res) {
//     try {
//         const comment = req.body
//         const updatedComment = await commentService.update(comment)
//         res.json(updatedComment)
//     } catch (err) {
//         logger.error('Failed to update comment', err)
//         res.status(400).send({ err: 'Failed to update comment' })

//     }
// }

// export async function removeComment(req, res) {
//     try {
//         const commentId = req.params.id
//         const removedId = await commentService.remove(commentId)
//         res.send(removedId)
//     } catch (err) {
//         logger.error('Failed to remove comment', err)
//         res.status(400).send({ err: 'Failed to remove comment' })
//     }
// }

// export async function addCommentMsg(req, res) {
//     const { loggedinUser } = req
//     try {
//         const commentId = req.params.id
//         const msg = {
//             txt: req.body.txt,
//             by: loggedinUser
//         }
//         const savedMsg = await commentService.addCommentMsg(commentId, msg)
//         res.json(savedMsg)
//     } catch (err) {
//         logger.error('Failed to update comment', err)
//         res.status(400).send({ err: 'Failed to update comment' })

//     }
// }

// export async function removeCommentMsg(req, res) {
//     const { loggedinUser } = req
//     try {
//         const commentId = req.params.id
//         const { msgId } = req.params

//         const removedId = await commentService.removeCommentMsg(commentId, msgId)
//         res.send(removedId)
//     } catch (err) {
//         logger.error('Failed to remove comment msg', err)
//         res.status(400).send({ err: 'Failed to remove comment msg' })

//     }
// }


