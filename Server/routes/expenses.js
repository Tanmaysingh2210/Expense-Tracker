import { Router } from 'express';
import Expense from '../models/expense.model.js';

const router = Router();

router.route('/').get((req, res) => {
    Expense.find()
        .then(expenses => res.json(expenses))
        .catch((err) => res.status(400).json('Error: ' + err));

});

router.route('/add').post(async (req, res) => {
    const name = req.body.name;
    const amount = req.body.amount;
    const date = Date.parse(req.body.date);
    const type = amount < 0 ? 'expense' : 'income';

    const newExpense = new Expense({
        name,
        amount,
        date,
        type,
    });

    try {
        const savedExpense = await newExpense.save();
        res.json(savedExpense);
    } catch (err) {
        res.status(400).json("Error: " + err);
    }
});

router.route('/:id').get((req, res) => {
    Expense.findById(req.params.id)
        .then(expense => res.json(expense))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Expense.findByIdAndDelete(req.params.id)
        .then(() => res.json('Expense deleted'))
        .catch((err) => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    Expense.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            amount: Number(req.body.amount),
            date: Date.parse(req.body.date),
            type: req.body.name,
        },
        { new: true } // return the updated document
    )
        .then(() => res.json('Expense Updated'))
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;
