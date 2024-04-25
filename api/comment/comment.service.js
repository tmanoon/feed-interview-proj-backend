import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

const cryptr = new Cryptr(process.env.SECRET || 'Manoon-1234')


async function query(criteria = {}) {
    try {
        const collection = await dbService.getCollection('comment')
        const filterCriteria = {}
        if (criteria.txt) {
            filterCriteria.$or = [
                { email: { $regex: criteria.txt, $options: 'i' } },
                { msg: { $regex: criteria.txt, $options: 'i' } }
            ]
        }
        const comments =  await collection.find(filterCriteria).toArray()
        return comments
    } catch (err) {
        logger.error('Cannot find comments', err)
        throw err
    }
}

// async function getById(commentId) {
//     try {
//         const collection = await dbService.getCollection('comment')
//         const comment = collection.findOne({ _id: new ObjectId(commentId) })
//         return comment
//     } catch (err) {
//         logger.error(`while finding comment ${commentId}`, err)
//         throw err
//     }
// }

// async function remove(commentId) {
//     try {
//         const collection = await dbService.getCollection('comment')
//         await collection.deleteOne({ _id: new ObjectId(commentId) })
//         return commentId
//     } catch (err) {
//         logger.error(`cannot remove comment ${commentId}`, err)
//         throw err
//     }
// }

async function add(comment) {
    try {
        const collection = await dbService.getCollection('comment')
        await collection.insertOne(comment)
        return comment
    } catch (err) {
        logger.error('cannot insert comment', err)
        throw err
    }
}

// async function update(comment) {
//     try {
//         const commentToSave = {
//             _id: new ObjectId(comment._id),
//             hostId: comment.hostId,
//             buyer: comment.buyer,
//             totalPrice: comment.totalPrice,
//             entryDate: comment.entryDate,
//             exitDate: comment.exitDate,
//             guests: comment.guests,
//             stay: comment.stay,
//             msgs: comment.msgs,
//             status: comment.status,
//         }
//         const collection = await dbService.getCollection('comment')
//         await collection.updateOne({ _id: new ObjectId(comment._id) }, { $set: commentToSave })
//         return comment
//     } catch (err) {
//         logger.error(`cannot update comment ${comment._id}`, err)
//         throw err
//     }
// }


export const commentService = {
    query,
    add
}
