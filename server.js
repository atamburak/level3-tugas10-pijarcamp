const express = require("express")
const mysql = require("mysql")
const BodyParser = require("body-parser")

const app = express()

app.use(BodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", "views")

const db = mysql.createConnection({
    host: "localhost",
    database: "pijarcamp",
    user: "root",
    password: ""
})

db.connect((err) => {
    if(err) throw err
    console.log("database connected...")

    // untuk get data
    app.get("/", (req, res) => {
        const sql = "SELECT * FROM produk"
        db.query(sql, (err, result) => {
            const produk = JSON.parse(JSON.stringify(result))
            // res.send(produk)
            res.render("index", { produk: produk, title: "Program Bootcamp PijarCamp" })
        })
        
    })

    // untuk insert data
    app.post("/tambah", (req, res) => {
        // const insertSql = 'INSERT INTO produk (nama_produk, keterangan, harga, jumlah) VALUES ('${req.body.nama}', '${req.body.keterangan}', '${req.body.harga}', '${req.body.jumlah}');'
        db.query(insertSql, (err, result) => {
            if(err) throw err
            res.redirect("/")
        })
    })

    
})



app.listen(8000, () => {
    console.log("server ready.....")
})
