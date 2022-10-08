const { Op } = require('sequelize')
const { Request, Suggestion, User, Coupled, Matched } = require('../models/schema')

module.exports = {
    async sendRequest(req, res) {
        const { sender_id, receiver_id, type } = req.body

        const request = await Request.findOne({
            where: {
                sender_id,
                receiver_id,
                type
            }
        })

        if (type == 'match') {
            await Suggestion.update(
                {
                    requested: true
                },
                {
                    where: {
                        user_id: sender_id,
                        suggested_id: receiver_id
                    }
                }
            )
        }
        else if (type == 'relationship') {
            await Matched.update(
                {
                    requested: true
                },
                {
                    where: {
                        user_id: sender_id,
                        partner_id: receiver_id
                    }
                }
            )
        }

        if (request) {
            res.send({
                success: false,
                message: `You have already sent ${type} request`
            })
        }
        else {
            const result = await Request.create(req.body);

            if (result) {
                res.send({
                    success: true
                })
            }
        }
        
        
    },
    async acceptRequest(req, res) {
        const result = await Request.update(
            { accepted: true },
            {
                where: {
                id: req.body.id
            }}
        )

        if (result[0]) {
            const request = await Request.findOne({
                where: {
                    id: req.body.id
                }
            });
            
            if (request.type == 'match') {
                const res1 = await Matched.create({
                    user_id: request.sender_id,
                    partner_id: request.receiver_id
                })

                const res2 = await Matched.create({
                    user_id: request.receiver_id,
                    partner_id: request.sender_id,
                })

                if (res1 && res2) {
                    res.send({
                        success: true
                    })
                }
            }
            else {
                const coupled = await Coupled.findOne({
                    where: {
                        [Op.or]: {
                            [Op.and]: {
                                user_id: request.sender_id,
                                partner_id: request.receiver_id
                            },
                            [Op.and]: {
                                user_id: request.receiver_id,
                                partner_id: request.sender_id
                            },
                        }
                    }
                })

                if (coupled) {
                    res.send({
                        success: false,
                        message: 'You can\'t have more than one relationship'
                    })
                }
                else {
                    const res1 = await Coupled.create({
                        user_id: request.sender_id,
                        partner_id: request.receiver_id
                    })

                    const res2 = await Coupled.create({
                        user_id: request.receiver_id,
                        partner_id: request.sender_id
                    })

                    if (res1 && res2) {
                        res.send({
                            success: true
                        })
                    }
                }
            }
            

            
        }
        else {
            res.send({
                success: false
            })
        }
        
    },
    async blockRequest(req, res) {
        const result = await Request.update(
            { blocked: true },
            {
                where: {
                id: req.body.id
            }}
        )
        res.send({
            success: result[0]
        })
    },
    async myRequests(req, res) {
        //will get my match requests
        const reqs = await Request.findAll({
            where: {
                [Op.and] :{
                    receiver_id: req.body.id,
                    requested : false,
                    [Op.and]: {
                        accepted: false,
                        blocked: false
                    }
                }
                
            },
            include: {
                as: 'sender',
                model: User
            }
        })

        res.send(reqs)
    },
}