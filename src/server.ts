import express, { Application, Request, Response } from 'express'
import {Pool} from 'pg'
const app: Application = express()
const port = 5000
const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_NnJCGDjItX94@ep-super-firefly-a1gmi79u.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});
console.log(pool)
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req: Request, res: Response) => {


    res.status(200).json({
        success: true,
        message: 'Hello Express!',
        author: "Ibtasam"
    })
})

app.post("/", (req: Request, res: Response) => {

    const { name, age } = req.body;

    res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: { name, age },
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
