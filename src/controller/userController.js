const userModel = require("../model/userModel");
const validator = require("../validator/validator");

const cookie= require("cookie-parser");

const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const data = req.body;
    if (!validator.isValidRequestBody) {
      return res
        .status(400)
        .send({ status: false, msg: "not a valid request body" });
    }
    const { title, name, email, password } = data; //object destruturing
    if (!validator.isValid(name)) {
      return res
        .status(400)
        .send({ status: false, message: "enter valid name" });
    }

    let isName = /^[A-Za-z ]*$/;
    if (!isName.test(name)) {
      return res
        .status(422)
        .send({ status: false, message: "enter valid name" });
    }

    if (!validator.isValid(title)) {
      return res
        .status(400)
        .send({ status: false, message: "enter valid title" });
    }

    if (!["Mr", "Mrs", "Miss"].includes(title)) {
      return res.status(400).send({
        status: false,
        message: "enter valid title between Mr, Mrs, Miss",
      });
    }

    if (!validator.isValid(email)) {
      return res.status(400).send({
        status: false,
        message: "email is not present in input request",
      });
    }

    if(!validator.isValidEmail(email)){
      return res.status(400).send({
        status:false,
        msg:"please enter valid email"
      })
    }
    

    if (!/^[^A-Z]*$/.test(email)) {
      return res.status(400).send({
        status: false,
        msg: "BAD REQUEST please provied valid email which do not contain any Capital letter ",
      });
    }

    const isEmailAlreadyUsed = await userModel.findOne({
      email,
      isDeleted: false,
    });

    if (isEmailAlreadyUsed) {
      return res.status(409).send({
        status: false,
        message: `${email} is already used so please put valid input`,
      });
    }

    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "enter valid password" });
    }

    if (
      !/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(
        password
      )
    ) {
      return res.status(400).send({
        status: false,
        msg: "Please enter Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      });
    }
    const userData = await userModel.create(data);
    return res.status(201).send({
      status: true,
      message: "successfully saved user data",
      data: userData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

module.exports.registerUser = registerUser;

const loginUser = async function (req, res) {
  try {
    let email = req.body.email
    let password = req.body.password
        //----------------------Validation Start--------------------------------------------------------//
 
    if(!validator.isValidEmail(email)){
      return res.status(400).send({
        status:false,
        msg:"please enter valid email"
      })
    }
    if (!/^[^A-Z]*$/.test(email)) {
      return res.status(400).send({
        status: false,
        msg: "BAD REQUEST please provied valid email which do not contain any Capital letter ",
      });
    }

    
    //----------------------Validation Ends--------------------------------------------------------//

    let user = await userModel.findOne({ email: email, password: password });
    // console.log(user);
    if (!user)
      return res.status(400).send({
        status: false,
        msg: "email or the password is not corerct",
      });

    let token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        iat: new Date().getTime() / 1000,
      },
      "event-managementproject",
      {
        expiresIn: "99m",
      }
    );

        res.cookie("access_token", token, {
      httpOnly: true
     
    })

    return res.status(200).send({ status: true, data: token });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};
module.exports.loginUser = loginUser;

const logout =  async (req, res) => {
  try {
        // req.session.destroy(function(err){
        //   if(err){
        //     console.log(err)
        //   }else{
        //     res.render("loginUser");
        //   }
          
        // })
    res.clearCookie("access_token");
    console.log("logout Successfully");

   
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};
module.exports.logout = logout;

// const changePassword = async (req, res) => {
//   try {
//   } catch (error) {
//     return res.status(500).send({ status: false, Error: error.message });
//   }
// };
// module.exports.changePassword = changePassword;
