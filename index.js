const express = require("express")
const fs = require("fs")

const readJson = (filename) => {
    const db = fs.readFileSync(filename, "utf-8")
    return JSON.parse(db)
}

const writeJson = (filename, data) => {
    fs.writeFileSync(filename, JSON.stringify(data))
}


const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello world 2")
})

app.get("/getalldata", (req, res) => {
    const data = readJson("data.json")
    res.send(data)
})

app.get("/users", (req, res) => {
    const data = readJson("data.json")
    res.send(data.users)
})

app.get("/products", (req, res) => {
    const data = readJson("data.json")
    res.send(data.products)
})

app.get("/users/:id", (req, res) => {
    const id = req.params.id
    const data = readJson("data.json");
    const user = data.users.find((user) => user.id === id)
    if (user) {
        res.send(user)
    } else {
        res.send("no such id")
    }
})

app.get("/products/:id", (req, res) => {
    const id = req.params.id
    const data = readJson("data.json");
    const product = data.products.find((product) => product.id === id)
    if (product) {
        res.send(product)
    } else {
        res.send("no such id")
    }
})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body
    const data = readJson("data.json")
    const user = data.users.find((user) => user.email === email)
    if (user) {
        res.send("there is nothing we can do about this")
    } else {
        const id = data.users.length
        const newUser = { name, email, password, id }
        data.users.push(newUser)
        writeJson("data.json", data);
        res.send(newUser)
    }
})

app.post("/create-product", (req, res) => {
    const { name, price } = req.body
    const data = readJson("data.json")
    const product = data.products.find((product) => product.name === name)
    if (product) {
        res.send("there is nothing we can do about this")
    } else {
        const id = data.products.length
        const newProduct = { name, price, id }
        data.products.push(newProduct)
        writeJson("data.json", data);
        res.send(newProduct)
    }
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const data = readJson("data.json")
    const user = data.users.find((user) => user.email === email)
    if (user) {
        if (user.password === password) {
            res.send(user)
        } else {
            res.send("unvalid email or password")
        }
    } else {
        res.send("unvalid email or password")
    }
})

const PORT = 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})