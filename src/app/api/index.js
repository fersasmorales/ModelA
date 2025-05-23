const express=require('express');

const cors=require('cors'); //cross origin resource sharing cors permite que la api pueda ser accedoda desde otros dominios
const app=express();
app.use(cors());
app.use(express.json());
app.use('/assets', express.static('public/assets'));


const productosRouter=require('./routes/productos');
app.use('/api/productos', productosRouter);

const usuariosRouter = require('./routes/usuario');
app.use('/api/usuario', usuariosRouter);

app.listen(3000,()=>{
console.log('API corriendo en http://localhost:3000');
});