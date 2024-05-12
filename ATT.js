//Curso de Engenharia de Software – UniEvangélica
//Disciplina de Programação WEB
//Dev: Lucas Alberto Pereira Davi


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para analisar corpos de requisição JSON
app.use(bodyParser.json());

// Dados de exemplo (simulando um banco de dados)
let cars = [
    { id: 1, brand: 'Toyota', model: 'Corolla', year: 2020 },
    { id: 2, brand: 'Honda', model: 'Civic', year: 2019 }
];

// Recuperar a lista de carros
app.get('/api/cars', (req, res) => {
    res.json(cars);
});

// Criar um novo carro
app.post('/api/cars', (req, res) => {
    const newCar = req.body;
    cars.push(newCar);
    res.status(201).json(newCar);
});

// Recuperar informações de um carro específico por ID
app.get('/api/cars/:car_id', (req, res) => {
    const carId = parseInt(req.params.car_id);
    const car = cars.find(car => car.id === carId);
    if (!car) {
        return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
});

// Atualizar informações de um carro específico por ID
app.put('/api/cars/:car_id', (req, res) => {
    const carId = parseInt(req.params.car_id);
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === carId);
    if (index === -1) {
        return res.status(404).json({ message: 'Car not found' });
    }
    cars[index] = { ...cars[index], ...updatedCar };
    res.json(cars[index]);
});

// Excluir um carro específico por ID
app.delete('/api/cars/:car_id', (req, res) => {
    const carId = parseInt(req.params.car_id);
    const index = cars.findIndex(car => car.id === carId);
    if (index === -1) {
        return res.status(404).json({ message: 'Car not found' });
    }
    const deletedCar = cars.splice(index, 1);
    res.json(deletedCar);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
