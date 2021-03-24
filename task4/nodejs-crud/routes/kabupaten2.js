//Setup Depedency
var express = require('express')
var router = express.Router();
var dbConnetion = require('../lib/db')


//Get Data 
router.get('/', function(req, res, next) {
    dbConnetion.query("SELECT * FROM kebupaten_tb", function(err, rows){
        if(err){
            req.flash("Error", err);
            //Render Error
            res.render("kabupaten2", {data: ''})
        } else{
            //Render Data to Web
            res.render("kabupaten2", {data:rows})
        }
    })
})


//Display add Page
router.get('/add', function(req, res, next){
    //render to add.ejs
    res.render("kabupaten2/add", {
        nama : "",
        diresmikan: "",
        photo: "",
    })
})


//Add new Kabupaten
router.post('/add', function(req, res, next){
    
    let nama = req.body.nama;
    let diresmikan = req.body.diresmikan;
    let photo = req.body.photo;
    let errors = false;

    if(nama.length === 0 || diresmikan.length === 0 || photo === 0 ){
        //set Flash Message
        req.flash('Error', "Please enter Kabupaten again");

        //render Response Error
        res.render('kabupaten2/add', {
            nama : nama,
            diresmikan : diresmikan,
            photo : photo
        })
    }
    //If No err
    if(!errors){
        var form_data = {
            nama : nama,
            diresmikan : diresmikan,
            photo : photo
        }
        dbConnetion.query("INSERT INTO kabupaten_tb set ?", form_data, function(err, result){
            if(err){
                //Get Error Data
                req.flash("Error", err)

                //render to add.ejs
                res.render("kabupaten2/add", {
                    nama: form_data.nama,
                    diresmikan: form_data.diresmikan,
                    photo: form_data.photo
                })
            } else{
                req.flash("Success", "Kabupaten Successfully Added");
                res.redirect("/kabupaten2");
            }
        })
    }
})

//Edit Data 
router.get("/edit/(:id)", function(req, res, next){
    let id = req.params.id;

    //Get Id Data 
    dbConnetion.query("SELECT * FROM kabupaten_tb WHERE id = ?", id, function(err, rows, fields){
        if(err) throw err
        console.log(rows);
        //if data Not Found
        if(rows.length <= 0){
            req.flash("error", "Kabupaten not Found")
            res.redirect("/kabupaten2")
        }else {
            //Render Edit to edit.ejs
            res.render("kabupaten2/edit", {
                title: "Edit Kabupaten",
                id: rows[0].id,
                nama: rows[0].nama,
                diresmikan: rows[0].diresmikan,
                photo: rows[0].photo
            })
        }
        

        //Store Data to Db
        if(!err){
            var form_data = {nama: rows[0].nama,
                diresmikan: rows[0].diresmikan,
                photo: rows[0].photo}
            dbConnetion.query("UPDATE kabupaten_tb SET ? WHERE id = ?", form_data, function(err, result){

                //if(err) throw error 
                if(err){
                    req.flash("error", err)
                    res.render("kabupaten2/edit", {
                        id: req.params.id,
                        nama: req.params.nama,
                        diresmikan: req.params.diresmikan,
                        photo: req.params.photo
                    })
                }
            })
        } else {
            req.flash("Success", "Kabupaten successfully update");
            req.redirect("/kabupaten2");
        }
    })
})


//delete
router.get('/delete/(:id)', function(req, res, next){
    let id = req.params.id;
    dbConnetion.query("DELETE FROM kabupaten_tb WHERE id = ?", id, function(err, result){
        //if Err
        if(err){
            req.flash("Error", err)
            res.redirect("/kabupaten2")
        }else{
            req.flash("Success", "Kabupaten successfully Deleted")
            res.redirect("/kabupaten2")
        }
    })
})



module.exports = router;