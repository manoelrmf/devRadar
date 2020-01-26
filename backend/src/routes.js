const { Router } = require('express')

const routes = Router()

routes.get('/users', (request, response) => {
    console.log(request.body)
    return response.json({
        message: "teste"
    })
})

module.exports = routes