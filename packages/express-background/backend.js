import express from "express";

const app = express();
const port = 8000;

const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

 const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);

 const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}

// Function to delete a user by ID
const deleteUserById = (id) => {
   // Find the index of the user with the specified ID
   const userIndex = users.users_list.findIndex((user) => user.id === id);

   // If the user is found, remove it from the array
   if (userIndex !== -1) {
       users.users_list.splice(userIndex, 1);
       return true; // Indicate success
   }

   return false; // Indicate failure (user not found)
};

app.use(express.json());

app.get('', (req, res) => {
    res.send("This is a change from Josh");
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});


    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);

    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

app.delete('/users/:id', (req, res) => {
   const id = req.params['id']

   const success = deleteUserById(id)


   if (success) {
       res.send('User deleted')
   } else {
      res.status(404).send('User not Found')
   }
});

app.post('/users', (req, res) => {
   const userToAdd = req.body;
   addUser(userToAdd);
   res.send();
});