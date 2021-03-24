//Setup Depedency
var express = require('express')
var router = express.Router();
var dbConnetion = require('../lib/db')


//Get Data 
router.get('/', function(req, res, next) {
    dbConnetion.query("SELECT * FROM provinsi_tb", function(err, rows){
        if(err){
            req.flash("Error", err);
            //Render Error
            res.render("indonesia", {data: ''})
        } else{
            //Render Data to Web
            res.render("indonesia", {data:rows})
        }
    })
})


//Display add Page
router.get('/add', function(req, res, next){
    //render to add.ejs
    res.render("indonesia/add", {
        nama : "",
        diresmikan: "",
        photo: "",
        pulau: ""
    })
})


//Add new film
router.post('/add', function(req, res, next){
    
    let nama = req.body.nama;
    let diresmikan = req.body.diresmikan;
    let photo = req.body.photo;
    let pulau = req.body.pulau;
    let errors = false;

    if(nama.length === 0 || diresmikan.length === 0 || photo === 0 || pulau === 0){
        //set Flash Message
        req.flash('Error', "Please enter Provinsi again");

        //render Response Error
        res.render('indonesia/add', {
            nama : nama,
            diresmikan : diresmikan,
            photo : photo,
            pulau : pulau
        })
    }
    //If No err
    if(!errors){
        var form_data = {
            nama : nama,
            diresmikan : diresmikan,
            photo : photo,
            pulau : pulau
        }
        dbConnetion.query("INSERT INTO provinsi_tb set ?", form_data, function(err, result){
            if(err){
                //Get Error Data
                req.flash("Error", err)

                //render to add.ejs
                res.render("indonesia/add", {
                    nama: form_data.nama,
                    diresmikan: form_data.diresmikan,
                    photo: form_data.photo,
                    pulau: form_data.pulau
                })
            } else{
                req.flash("Success", "Provinsi Successfully Added");
                res.redirect("/indonesia");
            }
        })
    }
})

//Edit Data Film
router.get("/edit/(:id)", function(req, res, next){
    let id = req.params.id;

    //Get Id Data Film
    dbConnetion.query("SELECT * FROM provinsi_tb WHERE id = ?", id, function(err, rows, fields){
        if(err) throw err
        console.log(rows);
        //if data Not Found
        if(rows.length <= 0){
            req.flash("error", "Provinsi not Found")
            res.redirect("/indonesia")
        }else {
            //Render Edit to edit.ejs
            res.render("indonesia/edit", {
                title: "Edit Provinsi",
                id: rows[0].id,
                nama: rows[0].nama,
                diresmikan: rows[0].diresmikan,
                photo: rows[0].photo,
                pulau: rows[0].pulau
            })
        }
        

        //Store Data to Db
        if(!err){
            var form_data = {nama: rows[0].nama,
                diresmikan: rows[0].diresmikan,
                photo: rows[0].photo,
                pulau: rows[0].pulau}
            dbConnetion.query("UPDATE provinsi_tb SET ? WHERE id = ?", form_data, function(err, result){

                //if(err) throw error 
                if(err){
                    req.flash("error", err)
                    res.render("indonesia/edit", {
                        id: req.params.id,
                        nama: req.params.nama,
                        diresmikan: req.params.diresmikan,
                        photo: req.params.photo,
                        pulau: req.params.pulau
                    })
                }
            })
        } else {
            req.flash("Success", "Provinsi successfully update");
            req.redirect("/indonesia");
        }
    })
})


//delete
router.get('/delete/(:id)', function(req, res, next){
    let id = req.params.id;
    dbConnetion.query("DELETE FROM provinsi_tb WHERE id = ?", id, function(err, result){
        //if Err
        if(err){
            req.flash("Error", err)
            res.redirect("/indonesia")
        }else{
            req.flash("Success", "Provinsi successfully Deleted")
            res.redirect("/indonesia")
        }
    })
})



module.exports = router;