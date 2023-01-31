// iniliasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const md5 = require("md5")

// implementation
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "",
    database: "perpustakaan"
})
db.connect(error =>{
    if (error){
        console.log(error.message)
    }else {
        console.log("MySQL Connected")
    }
})


// end-point data siswa
// read
app.get("/siswa", (req,res) => {
    
    let sql = "select * from siswa"

    db.query(sql, (error,result) => {
        let response = null 
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})

// search id
app.get("/siswa/:id", (req, res) => {
    let data = {
        id_siswa: req.params.id
    }
    // create sql query
    let sql = "select * from siswa where ?"

    // run query
    db.query(sql, data, (error,result) => {
        if(error){
            response = {
                message: error.message// pesan error
            }
        }else {
            response = {
                count: result.length,// jumlah data
                siswa: result //isi data
            }
        }
        res.json(response)
    })
})

// create
app.post("/siswa", (req, res) => {

    // prepare data
    let data = {
        nis: req.body.nis,
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
        no_absen: req.body.no_absen
    }

    // create sql query insert
    let sql = "insert into siswa set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + "data inserted"
            }
        }
        res.json(response)
    })
})

// update
app.put("/siswa", (req, res) => {


    // prepare data
    let data = [
        // data
        {
            nis: req.body.nis,
            nama_siswa: req.body.nama_siswa,
            kelas: req.body.kelas,
            no_absen: req.body.no_absen

        },

        // parameter (primary key)
        {
            id_siswa: req.body.id_siswa
        }
    ]

    // create sql query update
    let sql ="update siswa set ? where ?"
    
    // run query
    db.query(sql,data, (error,result) => {
        let response = null
        if(error) {
            response = {
                message: error.message
            }
        }else {
            response = {
                message: result.affectedRows + "data updated"
            }
        }
        res.json(response)
    })
})


// delete
app.delete("/siswa/:id", (req,res) => {
    // prepare data
    let data = {
        id_siswa: req.params.id
    }

    // create query sql delete
    let sql = "delete from siswa where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response =null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + "data deleted"
            }
        }
        res.json(response)
    })
})



// end point data petugas
// create
app.get("/petugas", (req, res) => {
    //create sql query
    let sql = "select * from petugas"

    // run query
    db.query(sql, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message //pesan error
            }
        } else {
            response = {
                count: result.length, //jumlah data
                petugas: result //isi data
            }
        }
        res.json(response) //kirim response
    })
})

// search id
app.get("/petugas/:id", (req, res) => {
    let data = {
        id_petugas: req.params.id
    }
    // create sql query
    let sql = "select * from petugas where ?"

    // run query
    db.query(sql, data, (error,result) => {
        if(error){
            response = {
                message: error.message// pesan error
            }
        }else {
            response = {
                count: result.length,// jumlah data
                petugas: result //isi data
            }
        }
        res.json(response)
    })
})

// read
app.post("/petugas", (req, res) => {

    // prepare data
    let data = {
        user: req.body.user,
        nama_petugas: req.body.nama_petugas,
        password: md5(req.body.password),
        status: req.body.status
    }

    // create sql query insert
    let sql = "insert into petugas set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + "data inserted"
            }
        }
        res.json(response)
    })
})



// update
app.put("/petugas", (req, res) => {


    // prepare data
    let data = [
        // data
        {
            user: req.body.user,
            nama_petugas: req.body.nama_petugas,
            password: req.body.password,
            status: req.body.status
        },

        // parameter (primary key)
        {
            id_petugas: req.body.id_petugas
        }
    ]

    // create sql query update
    let sql ="update petugas set ? where ?"
    
    // run query
    db.query(sql,data, (error,result) => {
        let response = null
        if(error) {
            response = {
                message: error.message
            }
        }else {
            response = {
                message: result.affectedRows + "data updated"
            }
        }
        res.json(response)
    })
})


// delete
app.delete("/petugas/:id", (req,res) => {
    // prepare data
    let data = {
        id_petugas: req.params.id
    }

    // create query sql delete
    let sql = "delete from petugas where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response =null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + "data deleted"
            }
        }
        res.json(response)
    })
})


// end point data buku
// create
app.get("/buku", (req, res) => {
    //create sql query
    let sql = "select * from buku"

    // run query
    db.query(sql, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message //pesan error
            }
        } else {
            response = {
                count: result.length, //jumlah data
                buku: result //isi data
            }
        }
        res.json(response) //kirim response
    })
})

// search id
app.get("/buku/:id", (req, res) => {
    let data = {
        id_buku: req.params.id
    }
    // create sql query
    let sql = "select * from buku where ?"

    // run query
    db.query(sql, data, (error,result) => {
        if(error){
            response = {
                message: error.message// pesan error
            }
        }else {
            response = {
                count: result.length,// jumlah data
                buku: result //isi data
            }
        }
        res.json(response)
    })
})


// read
app.post("/buku", (req, res) => {

    // prepare data
    let data = {
        judul: req.body.judul,
        nama_pengarang: req.body.nama_pengarang,
        penerbit: req.body.penerbit,
        kondisi_buku: req.body.kondisi_buku,
        jumlah_halaman: req.body.jumlah_halaman
    }

    // create sql query insert
    let sql = "insert into buku set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + "data inserted"
            }
        }
        res.json(response)
    })
})


// update
app.put("/buku", (req, res) => {


    // prepare data
    let data = [
        // data
        {
            judul: req.body.judul,
            nama_pengarang: req.body.nama_pengarang,
            penerbit: req.body.penerbit,
            kondisi_buku: req.body.kondisi_buku,
            jumlah_halaman: req.body.jumlah_halaman
        },

        // parameter (primary key)
        {
            id_buku: req.body.id_buku
        }
    ]

    // create sql query update
    let sql ="update buku set ? where ?"
    
    // run query
    db.query(sql,data, (error,result) => {
        let response = null
        if(error) {
            response = {
                message: error.message
            }
        }else {
            response = {
                message: result.affectedRows + "data updated"
            }
        }
        res.json(response)
    })
})

// delete
app.delete("/buku/:id", (req,res) => {
    // prepare data
    let data = {
        id_buku: req.params.id
    }

    // create query sql delete
    let sql = "delete from siswa where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response =null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + "data deleted" //menghitung jumlah data yang berubah
            }
        }
        res.json(response)
    })
})

// end-point menambahkan data pelanggaran siswa 

app.post("/pelanggaran_siswa", (req,res) => {
    // prepare data to pelanggaran_siswa
    let data = {
        id_siswa: req.body.id_siswa,
        id_user: req.body.id_user,
        waktu: moment().format('YYYY-MM-DD HH:mm:ss') // get current time
    }

    // parse to JSON
    let pelanggaran = JSON.parse(req.body.pelanggaran)

    // create query insert to pelanggaran_siswa
    let sql = "insert into pelanggaran_siswa set ?"

    // run query

    db.query(sql, data, (error, result) => {
        let response = null
        
        if (error) {
            res.json({message: error.message})
        } else {
            
            // get last inserted id_pelanggaran
            let lastID = result.insertId

            // prepare data to detail_pelanggaran
            let data = []
            for (let index = 0; index < pelanggaran.length; index++) {
                data.push([
                    lastID, pelanggaran[index].id_pelanggaran
                ])                
            }

            // create query insert detail_pelanggaran
            let sql = "insert into detail_pelanggaran_siswa values ?"

            db.query(sql, [data], (error, result) => {
                if (error) {
                    res.json({message: error.message})
                } else {
                    res.json({message: "Data has been inserted"})
                }
            })
        }
    })
})


app.listen(8000, () => {
    console.log("run on port 8000")
})
