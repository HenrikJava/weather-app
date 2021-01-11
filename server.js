const express = require('express')
const cors = require('cors');

const connectDB = require('./config/db')
const app = express()

connectDB()
app.use(cors())

app.use(express.json({extended: false}))

app.get('/', (req, res) => res.send('Api running'))

app.use('/api/weather', require('./routes/api/weather'))
app.use('/api/user', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/app', require('./routes/api/app'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on ${PORT}`)) 