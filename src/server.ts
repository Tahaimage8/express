import express, { Application, Request, Response } from 'express'
import { Pool, Result } from 'pg'
const app: Application = express()
const port = 5000
const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_NnJCGDjItX94@ep-super-firefly-a1gmi79u.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require"
});
// console.log(pool)
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))


const initDB = async ()=>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            age INT,
            is_active BOOLEAN DEFAULT true,

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()          
        );
            `)
        console.log("Neon Db Connected")
    } catch (error) {
        console.log(error)
    }
}

initDB()


app.get('/', (req: Request, res: Response) => {


    res.status(200).json({
        success: true,
        message: 'Hello Express!',
        author: "Ibtasam"
    })
})

app.post("/api/v1/users", async (req: Request, res: Response) => {

    const { name, email, password, age } = req.body;

    const result = await pool.query(`
        INSERT INTO users (name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *;
        `,
    [name, email, password, age])
    res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: result.rows[0],
    })
})
app.get("/api/v1/users", async (req: Request, res: Response) => {

    try {
        const result = await pool.query(`
            SELECT * FROM users;
        `)
        console.log(result)
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully!',
            data: result.rows,
        })

    } catch (error : any) {
        console.log(error)
    }
}
);

app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {
       const { id } = req.params;
       const result = await pool.query(
        `SELECT * FROM users WHERE id = $1;`,
        [id]
       ) 
       console.log(result)
       res.status(200).json({
            success: true,
            message: 'User retrieved successfully!',
            data: result.rows[0],
        })
    } catch(error : any) {
        console.log(error)
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
