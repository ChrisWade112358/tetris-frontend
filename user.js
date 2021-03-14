


class User {
    static allUsers = []

    constructor(user){
        this.id = user.id
        this.name = user.name
        this.password = user.password
        User.allUsers.push(this) 
    }

    static generateUsers(){
        const userData = apiService.fetchUsers()
            .then(data => 
                data.forEach(user => {
                    const newUser = new User(user);
                })
            )
    }

    

    static findUser(name, password){
        
        for(let i = 0; i < this.allUsers.length; i++){
            if(name == this.allUsers[i].name && password == this.allUsers[i].password){
                return this.allUsers[i];
                
            }
            
        }

        apiService.submitUser(name, password)
                    .then(data =>{
                        console.log(data)
                        const newUser = new User(data);
                        currentUser = newUser
                        return newUser;
                    })
    }

    static findUserByID(id){
        for(let i = 0; i < this.allUsers.length; i++){
            if(id == this.allUsers[i].id){
                return this.allUsers[i];
            }
        }

    }

    static editUser(){
        let nameEdit = document.getElementById("nameEdit");
        let passwordEdit1 = document.getElementById("passwordEdit1");
        let passwordEdit2 = document.getElementById("passwordEdit2");
        let updateBtn = document.getElementById("updateBtn");
    

        nameEdit.hidden = false;
        passwordEdit1.hidden = false;
        passwordEdit2.hidden = false;
        updateBtn.hidden = false;
    
    
        updateBtn.addEventListener('click', function(e){
            e.preventDefault();
            if(passwordEdit1.value == passwordEdit2.value && passwordEdit1.value != "" && nameEdit.value != ""){
                const UserObj = {
                    id: currentUser.id,
                    name: nameEdit.value,
                    password: passwordEdit1.value,
                }
                apiService.editUser(UserObj);

            }
            else if(passwordEdit1.value == passwordEdit2.value && passwordEdit1.value != "" && nameEdit.value == ""){
                const UserObj = {
                    id: currentUser.id,
                    name: currentUser.name,
                    password: passwordEdit1.value,
                }
                apiService.editUser(UserObj);
            }
            else if(passwordEdit1.value == "" && nameEdit.value != ""){
                const UserObj = {
                    id: currentUser.id,
                    name: nameEdit.value,
                    password: currentUser.password,
                }
                apiService.editUser(UserObj);
            }
            else if(passwordEdit1.value != passwordEdit2.value && passwordEdit1.value != ""){
                alert("passwords must match. Please enter your password and re-enter your password in the virify password input.")
            }
            else{
                alert("Nothing was entered into edit fields. Please enter a change into the edit fields and click Update again.")
            }
            Tops.displayUserTops(currentUser.id)
        })
        
    }

    static deleteUser(){
        let deleteBtn = document.getElementById("deleteBtn");
        deleteBtn.hidden = false;
        deleteBtn.addEventListener('click', function(e){
            e.preventDefault()
            apiService.deleteUser(currentUser.id)
            User.findUserByID(currentUser.id).delete
            e.target.reset
        })
    
    }



    


}

    

   
