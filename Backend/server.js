require("dotenv").config()
const app = require("./src/app")
const connectToDb = require("./src/config/database")

connectToDb()

// app.listen(3000,()=>{
//     console.log("server is running on port 3000")
// })

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
