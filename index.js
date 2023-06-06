// Framework
const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json())

// Server Config
const port = 3001;
const orders = [];

// Middleware

const idCheck = function (request, response, next) {
    
    const { id } = request.params;
    
    const index = orders.findIndex(order => order.id === id);

    if(index < 0) {
        return response.status(404).json({message: "Order not found"})
    }
    
    request.orderIndex = index;

    next();
}

// Routes
app.get('/order', function (request, response) {

    return response.json(orders);
})

app.post('/order', function (request, response) {

    const { name, order } = request.body;

    const newOrder = ({id: uuid.v4(), name, order})

    orders.push(newOrder)

    return  response.json(orders)
})

app.delete('/order/:id', idCheck, function (request, response) {

    const index = request.orderIndex;

    orders.splice(index, 1);

    return response.status(204).json();
})

app.listen(port, () => {
     return console.log(` ✅ Server started by port: ${port}`)
})




