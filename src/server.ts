import express, { Application, Request, Response } from 'express'
const app : Application= express()
const port = 5000

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req :Request, res : Response) => {

    // console.log(req)
//   res.send('Hello Express!')
res.status(200).json({
    success: true,
    message: 'Hello Express!',
    author : "Ibtasam"
  })    
})

app.post ("/", (req :Request, res : Response) => {
    console.log(req.body)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
