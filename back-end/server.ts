const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express()
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true,
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/signup', async(req:any, res:any) => {
  let email = req.body.email
  let pass = req.body.password
  try{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(pass, salt)
    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      }
    })
    res.send({type: 1, message: "You have successfully created a user!"})
  }catch{
    res.send({type: 0, message: "This email is alredy taken"})
  }
})

app.post('/signin', async (req: any, res: any) => {
  let email = req.body.email;
  let pass = req.body.password;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(pass, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.SESSION_SECRET,
          { expiresIn: '24h' }
        );
        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 3600000,
        });
        res.send({ type: 1, message: 'You have successfully logged in!' });
      } else {
        res.send({ type: 0, message: 'Invalid email or password' });
      }
    } else {
      res.send({ type: 0, message: 'Invalid email or password' });
    }
  } catch {
    res.send({ type: 0, message: 'An error occurred' });
  }
});

app.post('/isLogged', (req: any, res: any) => {
  const token = req.cookies.token;

  if (!token) {
    return res.send({ loggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    res.send({ loggedIn: true, userData: decoded });
  } catch {
    res.send({ loggedIn: false });
  }
});

app.post('/getUserData', async (req: any, res: any) => {
  let email = req.body.email;
  try{
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        address: true,
      }
    });
    res.send({type: 1, data: user})
  }catch{
    res.send({type: 0, message: "An error occured"})
  }
})

app.post('/addPersonalData', async (req: any, res: any) => {
  let email = req.body.email
  let name = req.body.name
  let lastname = req.body.lastname
  let phone = req.body.phone
  try{
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        name: name,
        lastname: lastname,
        phone: phone,
      },
    });
    res.send({type: 1, user: user})
  }catch{
    res.send({type: 0, message: "An error occured"})
  }
})

app.post('/changePassword', async (req: any, res: any) => {
  let email = req.body.email
  let prevPass = req.body.prev
  let newPass = req.body.new
  try{
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if(user){
      const passwordMatch = await bcrypt.compare(prevPass, user.password);
      if(passwordMatch){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPass, salt)
        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            password: hashedPassword,
          }
        })
        res.clearCookie('token')
        res.send({type: 1, message: "Password changed successfully"})
      }else{
        res.send({type: 0, message: "Current password is not valid"})
      }
    }else{
      res.send({type: 0, message: "An error occured"})
    }
  }catch{
    res.send({type: 0, message: "An error occured"})
  }
})

app.post('/addAddress', async (req: any, res: any) => {
  let email = req.body.email
  let wojewodztwo = req.body.wojewodztwo
  let powiat = req.body.powiat
  let miejscowosc = req.body.miejscowosc
  let ulica = req.body.ulica
  let numer = req.body.numer
  let kod = req.body.kod
  try{
    const address = await prisma.address.create({
      data: {
        userEmail: email,
        wojewodztwo: wojewodztwo,
        powiat: powiat,
        miejscowosc: miejscowosc,
        ulica: ulica,
        nr_mieszkania: numer,
        kod_pocztowy: kod,
      },
    });
    res.send({type: 1, address: address})
  }catch{
    res.send({type: 0, message: "An error occured"})
  }
})

app.post('/changeAddress', async (req: any, res: any) => {
  let email = req.body.email
  let wojewodztwo = req.body.wojewodztwo
  let powiat = req.body.powiat
  let miejscowosc = req.body.miejscowosc
  let ulica = req.body.ulica
  let numer = req.body.numer
  let kod = req.body.kod
  try{
    const address = await prisma.address.update({
      where: {
        userEmail: email,
      },
      data: {
        wojewodztwo: wojewodztwo,
        powiat: powiat,
        miejscowosc: miejscowosc,
        ulica: ulica,
        nr_mieszkania: numer,
        kod_pocztowy: kod,
      },
    });
    res.send({type: 1, address: address})
  }catch{
    res.send({type: 0, message: "An error occured"})
  }
})

app.post('/getExhibition', async(req: any, res: any) => {
  try{
    const exhibition = await prisma.exhibition.findMany({
      include: {
        product: true,
      }
    })
    if(exhibition){
      res.send({products: exhibition})
    }
  }catch (error:any) {
    res.status(500).send({ error: error.message });
  }
})

app.listen(3001, () => {
  console.log('Serwer został uruchomiony na porcie 3001.')
})