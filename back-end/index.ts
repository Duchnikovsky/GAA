const express = require('express')
const cors = require('cors')
// const bcrypt = require('bcrypt')
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const jwt = require('jsonwebtoken');

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

const app = express()
app.use(express.json());

app.use(cors({
  origin: [process.env.CLIENT_URL],
  methods: ["GET", "POST"],
  credentials: true,
}))

// app.use(cookieParser())
// app.use(bodyParser.urlencoded({extended: true}))

// app.post('/signup', async(req:any, res:any) => {
//   let email = req.body.email
//   let pass = req.body.password
//   try{
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(pass, salt)
//     await prisma.user.create({
//       data: {
//         email: email,
//         password: hashedPassword,
//       }
//     })
//     res.send({type: 1, message: "You have successfully created a user!"})
//   }catch{
//     res.send({type: 0, message: "This email is alredy taken"})
//   }
// })

// app.post('/signin', async (req: any, res: any) => {
//   let email = req.body.email;
//   let pass = req.body.password;
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     if (user) {
//       const passwordMatch = await bcrypt.compare(pass, user.password);
//       if (passwordMatch) {
//         const token = jwt.sign(
//           { id: user.id, email: user.email },
//           process.env.SESSION_SECRET,
//           { expiresIn: '24h' }
//         );
//         res.cookie('token', token, {
//           httpOnly: true,
//           maxAge: 3600000,
//         });
//         res.send({ type: 1, message: 'You have successfully logged in!' });
//       } else {
//         res.send({ type: 0, message: 'Invalid email or password' });
//       }
//     } else {
//       res.send({ type: 0, message: 'Invalid email or password' });
//     }
//   } catch {
//     res.send({ type: 0, message: 'An error occurred' });
//   }
// });

// app.post('/logout', (req: any, res: any) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.send({ loggedIn: false });
//   }
//   res.clearCookie('token');
//   res.send({type: 1, message: 'logged out'})
// });

// app.post('/isLogged', (req: any, res: any) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.send({ loggedIn: false });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SESSION_SECRET);
//     res.send({ loggedIn: true, userData: decoded });
//   } catch {
//     res.send({ loggedIn: false });
//   }
// });

// app.post('/getUserData', async (req: any, res: any) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.send({ loggedIn: false });
//   }
//   const decoded = jwt.verify(token, process.env.SESSION_SECRET);
//   let email = decoded.email
//   let id = decoded.id
//   try{
//     const user = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//       include: {
//         address: true,
//       }
//     });
//     const orders = await prisma.order.findMany({
//       where: {
//         userId: id,
//       }
//     })
//     if(user && orders){
//       res.send({type: 1, data: user, orders: orders})
//     }
//   }catch{
//     res.send({type: 0, message: "An error occured"})
//   }
// })

// app.post('/addPersonalData', async (req: any, res: any) => {
//   let email = req.body.email
//   let name = req.body.name
//   let lastname = req.body.lastname
//   let phone = req.body.phone
//   try{
//     const user = await prisma.user.update({
//       where: {
//         email: email,
//       },
//       data: {
//         name: name,
//         lastname: lastname,
//         phone: phone,
//       },
//     });
//     res.send({type: 1, user: user})
//   }catch{
//     res.send({type: 0, message: "An error occured"})
//   }
// })

// app.post('/changePassword', async (req: any, res: any) => {
//   let email = req.body.email
//   let prevPass = req.body.prev
//   let newPass = req.body.new
//   try{
//     const user = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });
//     if(user){
//       const passwordMatch = await bcrypt.compare(prevPass, user.password);
//       if(passwordMatch){
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(newPass, salt)
//         await prisma.user.update({
//           where: {
//             email: email,
//           },
//           data: {
//             password: hashedPassword,
//           }
//         })
//         res.clearCookie('token')
//         res.send({type: 1, message: "Password changed successfully"})
//       }else{
//         res.send({type: 0, message: "Current password is not valid"})
//       }
//     }else{
//       res.send({type: 0, message: "An error occured"})
//     }
//   }catch{
//     res.send({type: 0, message: "An error occured"})
//   }
// })

// app.post('/addAddress', async (req: any, res: any) => {
//   let email = req.body.email
//   let wojewodztwo = req.body.wojewodztwo
//   let powiat = req.body.powiat
//   let miejscowosc = req.body.miejscowosc
//   let ulica = req.body.ulica
//   let numer = req.body.numer
//   let kod = req.body.kod
//   try{
//     const address = await prisma.address.create({
//       data: {
//         userEmail: email,
//         wojewodztwo: wojewodztwo,
//         powiat: powiat,
//         miejscowosc: miejscowosc,
//         ulica: ulica,
//         nr_mieszkania: numer,
//         kod_pocztowy: kod,
//       },
//     });
//     res.send({type: 1, address: address})
//   }catch{
//     res.send({type: 0, message: "An error occured"})
//   }
// })

// app.post('/changeAddress', async (req: any, res: any) => {
//   let email = req.body.email
//   let wojewodztwo = req.body.wojewodztwo
//   let powiat = req.body.powiat
//   let miejscowosc = req.body.miejscowosc
//   let ulica = req.body.ulica
//   let numer = req.body.numer
//   let kod = req.body.kod
//   try{
//     const address = await prisma.address.update({
//       where: {
//         userEmail: email,
//       },
//       data: {
//         wojewodztwo: wojewodztwo,
//         powiat: powiat,
//         miejscowosc: miejscowosc,
//         ulica: ulica,
//         nr_mieszkania: numer,
//         kod_pocztowy: kod,
//       },
//     });
//     res.send({type: 1, address: address})
//   }catch{
//     res.send({type: 0, message: "An error occured"})
//   }
// })

// app.post('/getExhibition', async(req: any, res: any) => {
//   let type = req.body.type
//   try{
//     const products = await prisma.product.findMany({
//       where: {
//         type: type,
//       },
//       take: 8,
//       orderBy: {
//         title: 'asc',
//       },
//     })
//     const dlc = await prisma.product.findMany({
//       where: {
//         type: (type+1),
//       },
//       take: 4,
//       orderBy: {
//         title: 'asc',
//       },
//     })

//     if(products && dlc){
//       res.send({products: products, dlc: dlc})
//     }
//   }catch (error:any) {
//     res.status(500).send({ error: error.message });
//   }
// })

// app.post('/getCategories', async(req: any, res: any) => {
//   try{
//     const categories = await prisma.category.findMany({
//       where: {
//         NOT: [
//           { name: 'DLC' },
//           { name: 'C/S' },
//         ],
//       },
//     })
//     if(categories){
//       res.send({categories: categories})
//     }
//   }catch (error:any) {
//     res.status(500).send({ error: error.message });
//   }
// })

// app.post('/getProducts', async(req: any, res: any) => {
//   let name = req.body.name
//   let page = req.body.page
//   let skip = 8*(page-1)
//   let type = req.body.type
//   try{
//     const count = await prisma.product.count({
//       where: {
//         category: {
//           name: name,
//         },
//         type: type,
//       }
//     })
//     const products = await prisma.product.findMany({
//       where:{
//         category: {
//           name: name,
//         },
//         type: type,
//       },
//       include: {
//         dlc: true,
//       },
//       skip: skip,
//       take: 8,
//     })
//     if(products && count){
//       res.send({products: products, count: count})
//     }else{
//       res.send({count: count})
//     }
//   }catch (error:any) {
//     res.status(500).send({ error: error.message });
//   }
// })

// app.post('/getProduct', async(req: any, res: any) => {
//   let name = req.body.name
//   try{
//     const product = await prisma.product.findFirst({
//       where: {
//         title: name,
//       },
//       include: {
//         producent: true,
//         category: true,
//       }
//     })
//     if(product){
//       res.send({product: product})
//     }
//   }catch(error:any){
//     res.status(500).send({ error: error.message });
//   }
// })

// app.post('/getOpinions', async(req: any, res: any) => {
//   let id = req.body.id
//   try{
//     const opinions = await prisma.opinion.findMany({
//       where: {
//         productId: id,
//       },
//       take: 10,
//     })

//     const averageRating = await prisma.opinion.aggregate({
//       where: {
//         productId: id,
//       },
//       _avg: {
//         rating: true
//       }
//     })

//     if(opinions){
//       res.send({opinions: opinions, averageRating: averageRating._avg.rating})
//     }
//   }catch(error:any){
//     res.status(500).send({ error: error.message });
//   }
// })


// app.post('/addOpinion', async (req: any, res: any) => {
//   let product = req.body.product
//   let title = req.body.title
//   let content = req.body.content
//   let rating = req.body.rating
//   const token = req.cookies.token
//   if (!token) {
//     return res.send({ loggedIn: false })
//   }
//   const decoded = jwt.verify(token, process.env.SESSION_SECRET)
//   try{
//     const opinion = await prisma.opinion.create({
//       data: {
//         authorId: decoded.id,
//         productId: product,
//         rating: rating,
//         title: title,
//         content: content,
//       },
//     });
//     res.send({type: 1, opinion: opinion})
//   }catch{
//     res.send({type: 0, message: "An error occured"})
//   }
// })

// app.post('/getCart', async (req: any, res: any) => {
//   const token = req.cookies.token
//   if (!token) {
//     return res.send({type: 0, loggedIn: false })
//   }
//   const decoded = jwt.verify(token, process.env.SESSION_SECRET)
//   try {
//     const cart = await prisma.cart.findMany({
//       where:{
//         userId: decoded.id,
//       },
//       include:{
//         product: true,
//       }
//     })
//     if(cart){
//       res.send({type : 1, cart: cart})
//     }
//   }catch{
//     res.send({type: 0, message: "An error occured"})
//   }
// })

// app.post('/addToCart', async (req:any, res:any) => {
//   let id = req.body.product
//   const token = req.cookies.token;
//   if(!token){
//     return res.send({type: 0, message: 'NoAuth' })
//   }
//   const decoded = jwt.verify(token, process.env.SESSION_SECRET)
//   try{
//     const add = await prisma.cart.create({
//       data: {
//         userId: decoded.id,
//         productId: id,
//       }
//     })
//     if(add){
//       res.send({type: 1, message: 'Successfully added to cart'})
//     }
//   }catch(error:any){
//     res.status(500).send({type: 0, message: error.message});
//   }
// })

// app.post('/removeFromCart', async (req:any, res:any) => {
//   let id = req.body.id
//   try{
//     const remove = await prisma.cart.delete({
//       where:{
//         id: id,
//       }
//     })
//     if(remove){
//       res.send({type: 1})
//     }
//   }catch(error:any){
//     res.status(500).send({type: 0, message: error.message});
//   }
// })

// app.post('/searchProducts', async (req:any, res:any) => {
//   let query = req.body.query
//   let page = req.body.page
//   let skip = 8*(page-1)
//   try{
//     const count = await prisma.product.count({
//       where: {
//         OR: [
//           { title: { contains: query, mode: 'insensitive' } },
//           { producent: { name: { contains: query, mode: 'insensitive' } } },
//         ],
//       },
//     });
    
//     const products = await prisma.product.findMany({
//       where: {
//         OR: [
//           { title: {contains: query, mode: 'insensitive'}},
//           { producent: {name: {contains: query, mode: 'insensitive' }}},
//         ]
//       },
//       include: {
//         producent: true,
//       },
//       skip: skip,
//       take: 8,
//       orderBy: {
//         title: 'asc',
//       }
//     })
//     const uniqueResults = Array.from(new Set(products.map(item => item.title)))
//     .map(name => products.find(item => item.title === name));
//     if(uniqueResults){
//       res.send({type: 1, products: uniqueResults, count: count})
//     }
//   }catch(error:any){
//     res.status(500).send({type: 0, message: error.message});
//   }
// })

// app.post('/getProductImage', async(req: any, res: any) => {
//   let id = req.body.id
//   try{
//     const image = await prisma.product.findFirst({
//       where: {
//         id: id,
//       },
//       select: {
//         image: true,
//       }
//     })
//     if(image){
//       res.send({src: image})
//     }
//   }catch(error:any){
//     res.status(500).send({ error: error.message });
//   }
// })

// app.post('/payment', async(req: any, res: any) => {
//   let cart = req.body.cart
//   let cost = req.body.cost
//   const ids = cart.map((item: { productId: any }) => item.productId).join(",");
//   const token = req.cookies.token;
//   if(!token){
//     return res.send({type: 0, message: 'NoAuth' })
//   }
//   const decoded = jwt.verify(token, process.env.SESSION_SECRET)
//   try{
//     const add = await prisma.order.create({
//       data: {
//         userId: decoded.id,
//         products: ids,
//         cost: cost,
//       }
//     })
//     if(add){
//       const remove = await prisma.cart.deleteMany({
//         where: {
//           userId: decoded.id,
//         }
//       })
//       if(remove){
//         res.send({type: 1})
//       }
//     }
//   }catch(error:any){
//     res.status(500).send({ error: error.message });
//   }
// })

// async function cleanup(){
//   await prisma.$disconnect()
//   console.log('Prisma client disconnected.')
// }

// process.on('beforeExit', async () => {
//   await cleanup()
// })

// process.on('SIGINT', async () => {
//   await cleanup()
//   process.exit(0)
// })

// process.on('SIGTERM', async () => {
//   await cleanup()
//   process.exit(0)
// })

app.listen(3001, () => {
  console.log(`Serwer został uruchomiony na porcie 3001`)
})