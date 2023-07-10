const express = require('express');
const app = express();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    database: "quizapp",
    username: 'root',
    password: 'root@123',
    host: "localhost",
    dialect: "mariadb",
})

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    selectedOption: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    // answer: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // },
    // isCorrect: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // }
    // question3: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // },
    // question4: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // },
    // question5: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // }
})
User.sync();
app.use(express.json());

const storeUserName = async (input) => {
    try {
        const user = await User.create({
            name: input,
        });
        console.log("username stored successfully", user.name)
    }
    catch (err) {
        console.log("error occured", err)
    }
}
app.post('/register', async (req, res) => {
    console.log("body-------", req.body);
    const userName = req.body.input;
    await storeUserName(userName);
    res.json({ message: "user name stored successfully" })
})
// ....................................................................

app.use(express.json());

const storeUserSelectedOption = async (selectedOption) =>{
    //   const {} = req.body
    try{
        const option = await User.create({
        //    Question_No: questionId,
        //    answer:qAnswer,
        //    isCorrect: check,
        options:selectedOption
        });
        console.log("user's selected option stored successfully",option.id)
        // res.status(200).json({message:"user's selected option stored successfully..."})
    }
    catch(err){
        console.log("error occured........________",err)
     
    }
}
app.post('/quiz',async (req,res)=>{
    
    console.log("body.............", req.body.selectedOption);
   
    const userName = req.body.selectedOption;
    await storeUserSelectedOption(userName);
    res.json({ message: "user's selected option stored successfully" })
})

// ...........................................................................

const getAllTask = async () => {
    try {
        let result = await User.findAll({

        })
        return JSON.parse(JSON.stringify(result))
    }

    catch (err) {
        console.log("Error..........", err)
    }
}

app.get("/getAllTask", async (req, res) => {
    let result = {
        code: 200,
        message: "",
        data: null,
    }
    try {
        let task = await getAllTask()
        if (task) {
            result = {
                code: 200,
                data: task,
                message: "data fetched successfully"
            }
        }
        else {
            result = {
                code: 500,
                message: "Error occurred while fetching all tasks",
                data: null,
            }
        }
        res.send(result);
    }
    catch (err) {
        console.log("Error occured successfully....", err)
        result = {
            code: 500,
            message: "Error occurred while fetching all tasks",
            data: null,
        }
    }

})

const server = app.listen(5000, function () {
    console.log("Listening to the port ", server.address().port)
})
