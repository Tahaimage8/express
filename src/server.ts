import express from 'express'
const app = express()
const port = 5000

app.get('/', (req, res) => {
//   res.send('Hello Express!')
res.status(200).json({
    success: true,
    message: 'Hello Express!'
  })    
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
