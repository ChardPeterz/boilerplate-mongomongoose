require('dotenv').config();
const mongoose = require('mongoose');

let MONGO_URI='mongodb+srv://chardpeter10:7oCZFBNHT4H0MaIX@chardscluster.32vi5.mongodb.net/?retryWrites=true&w=majority&appName=ChardsCluster';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person',personSchema);

let chad = new Person({
  name:'chad',
  age: 24,
  favoriteFood: ['ice-cream','bread']
})

const createAndSavePerson = (done) => {
  let chad = new Person({
    name:'chad',
    age: 24,
    favoriteFood: ['ice-cream','bread']
  })
  chad.save((err , data) => {
    if(err){
      console.log(err);
    }else {
      done(null,data);
    }
  })
}

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error,data) => {
    if(error){
      console.log(error)
    }else {
      done(null , data);
    }
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (error,  data) => {
    if(error){
      console.log(error)
    }else{
      done(null,data)
    }
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : {$all : [food]}} , (error, data) => {
    if(error) {
      console.log(error)
    }else{
      done(null, data)
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, result) => {
    if(error){
      console.log(error)
    }else{
      done(null, result)
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (error, data) => {
    if (error){
      console.log(error)
    }else{
      data.favoriteFoods.push('hamburger')
      data.save((error, updatedData) => {
        if(error){
          console.log(error)
        }else{
          done(null, updatedData)
        }
      })
    }
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name:personName}, {age:ageToSet}, {new: true}, (error, data) => {
    if(error) {
      console.log(error)
    }else{
      done(null, data)
    }
  } )
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, data) => {
    if(error){
      console.log(error)
    }else{
      done(null, data)
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name:nameToRemove}, (error, data) => {
    if(!error){
      done(null, data)
    }
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods : {$all: [foodToSearch]}})
  .sort({name: 'asc'})
  .limit(2)
  .select('-age')
  .exec((error, data)=> {
    if(error){
      console.log(error)
    }else{
      done(null, data)
    }
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
