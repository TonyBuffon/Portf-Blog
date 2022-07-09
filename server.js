const app = require('./app')
const connectionDB = require('./db/connect')

const port = process.env.PORT || 3000

// connecting db and starting server

const start = async () => {
    try {
        connectionDB.connectDB(process.env.DATABASE_URI)
        app.listen(port, console.log(`Server is running on port: ${port}....`))
    } catch (err) {
        console.log("Error: " + err)
    }
}

start()