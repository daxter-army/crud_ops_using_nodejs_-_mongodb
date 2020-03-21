const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send(e)
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const user = await User.findById(_id)

        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.send(500).send()
    }

    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         res.status(404).send()
    //         console.log('User not Found')
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

//For Updating Users
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['username', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users', async (req, res) => {
    const user =  new User(req.body)

    try{
        await user.save()
        //Everything that written down below will only work if user is saved, successfully or unsuccessfully
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }
    
    //Normal Code -->>

    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
    
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch {
        res.status(500).send(e)
    }
})

module.exports = router