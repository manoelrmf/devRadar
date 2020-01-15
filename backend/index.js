const express = require('express')
const app = express()
app.get('/', (request, response) => {
    console.log(request.query)
    return response.json({
        message: "teste"
    })
})
app.listen(3333)