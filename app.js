const express = require('express');
const mongoose = require('mongoose');
const BodyParser = require('body-parser')
mongoose.Promise = global.Promise
const User = require('./models/User');
const Category = require('./models/Category');
const app = express();

mongoose.connect('mongodb://localhost:27017/mongoose');
mongoose.connection.once('open', ()=> {
    console.log('Connected');
}).on('error', (error)=> {
    console.log('Fetching error is: '+error)
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}))

app.get('/', (req, res)=> {
    res.send('Home');
});

// Mongoose -- INSERT DATA
app.post('/users', (req, res)=> {

    const createUser = User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isActive: 1
    });

    createUser.save((err, result)=> {
        if (err) return console.log(err);
        res.send('user saved')
    })

})


// Mongoose -- INSERT DATA
app.post('/category', (req, res) => {

    const createCategory = new Category({
        category_name: req.body.category_name
    });
    createCategory.save().then(result => {
        res.status(200).send(result);
    }).catch(error => {
        res.status(403).send('Error: '+ error);
    })

});

// Mongoose -- Fetching DATA
app.get('/users', (req,res) => {
    User.find({}).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(404).send(`Error: ${error}`);
    })
});
// Mongoose -- Fetching DATA
app.get('/categories', (req, res) => {
    Category.find({}).then(result=> {

        // res.status(200).send(result[1].category_name);
        res.status(200).send(result);

    }).catch(error => {
        res.status(404).send(`Error: ${error}`);
    })
})

// Mongoose -- UPDATE DATA
app.put('/category/:id', (req, res) => {
    const id = req.params.id;
    const category_name = req.body.category_name;
    Category.findByIdAndUpdate({_id:id}, {$set: {category_name: req.body.category_name}}, {new: true})
        .then(result => {
            res.status(200).send(result);
        }).catch(error => {
            res.status(403).send(`Error is: ${error}`);
    });
});
// Mongoose -- findOne UPDATE DATA
app.put('/updcategory/:id', (req, res)=> {
    Category.findOne({_id:req.params.id}).then(category => {
        category.category_name = req.body.category_name;
        category.save().then(result => {
            res.send(result);
        }).catch(error => {
            res.send(`Error is: ${error}`);
        })
    })
});
// Mongoose -- findOne DELETE DATA
// app.delete('/catdel/:id', (req, res) => {
//     Category.findOne({_id:req.params.id}).then(category=> {
//         category.delete().then(result=> {
//             res.send(result)
//         }).catch(error => {
//           res.send(error);
//         })
//     })
// });
app.delete('/catdel/:id', (req, res) => {
    Category.findByIdAndDelete({_id:req.params.id}).then(category=> {
        res.send(category);
    })
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
   console.log(`Listening is ${port}`);
});