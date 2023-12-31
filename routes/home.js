const express = require('express');
const router = express.Router();
const club = require('../models/club');

// router.get('/',(req,res)=>{
//     res.send("Router is Working");
// });


// router.get('/', (req,res)=>{
//     club.find((err, docs)=>{
//         res.render('home',{clubs: docs});
//     }).catch((err)=>{
//         console.log("Wrong with Dispalying the data!!");
//     })

// });


router.get('/', (req, res) => {
    club.find()
        .exec()
        .then(docs => {
            res.render('home', { clubs: docs });
        })
        .catch(err => {
            console.log("Something went wrong with displaying the data:", err);
        });
});


router.post('/add',(req,res,next)=>{
    // const name = req.body.name;
    // const player = req.body.player;
    // const coach = req.body.coach; 

    const{name, player, coach} = req.body;

    console.log(name, player, coach);

    const uclClub =  new club({
        name,
        player,
        coach
    });

    // uclClub.save((err)=>{
    //     if(err){
    //         console.log("Something wrong with conecting with Compass!!");
    //     }
    //     else{
    //         console.log("Data send to Compass.");
    //     }
    // });
    uclClub.save()
        .then(() => {
            console.log("Data sent to Compass.");
            res.redirect('/');
        })
        .catch((err) => {
            console.log("Something wrong with connecting with Compass!!", err);
        });

});


//----------------------------- ROUTER TO EDIT

router.get('/edit/:id', async (req, res, next) => {
    try {
        // console.log(req.params.id);
        const docs = await club.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).exec();

        if (!docs) {
            console.log("Wrong in editing!!");
            // Handle the case where no document was found
            return res.status(404).send('Not Found');
        }

        res.render('edit', {club: docs});
    } catch (err) {
        console.error("Error in editing: ", err);
        // Handle other errors
        res.status(500).send('Internal Server Error');
    }
});


// router.get('/edit/:id', (req,res,next)=>{
//     console.log(req.params.id);
//     club.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, docs)=>{ 
//         if(err){
//             console.log("Wrong in editing !!")
//         }
//         else{
//             res.render('edit', {club: docs});
//         }
//     })
    
// })


//----------------------- ROUTE TO UPDATE ELEMENT

router.post('/edit/:id', (req, res, next) => {
    club.findByIdAndUpdate(req.params.id, req.body)
        .then(docs => {
            if (!docs) {
                console.log("Document not found");
                return res.status(404).send('Not Found');
            }
            console.log("Successfully Updated");
            res.redirect('/');
        })
        .catch(err => {
            console.log("Error with updating:", err);
            next(err);
        });
});

// router.post('/edit/:id',(req,res,next)=>{
//     club.findByIdAndUpdate({_id: req.params.id}, req.body, (err,docs)=>{
//         if(err){
//             console.log("Wrong with Updating");
//             next(err);
//         }
//         else{
//             res.redirect('/');
//         }
//     })
// })


// -----------------------------ROUTE TO DELETE
router.get('/delete/:id', (req,res,next)=>{
    club.findByIdAndDelete(req.params.id, req.body)
    .then(docs => {
        if(!docs) {
            console.log("Wrong with Deleting !!");
            return res.status(404).send('Not Found');
        }
        console.log("Successfully Deleted");
        res.redirect('/');
    })
    .catch(err =>{
        console.log("Error in Deleting", err);
        next(err);
    })
})


module.exports = router;