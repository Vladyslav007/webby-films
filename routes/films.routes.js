const {Router} = require('express')
const Film = require('../models/Film')
const router = Router()

// /api/films/add
router.post('/add', async (req, res) => {
    try {

        const { title, releaseYear, stars, format } = req.body

        const invalidFilm  = await Film.findOne({title, releaseYear, stars, format})

        if (invalidFilm) {
            return res.status(400).json({ message: 'Такой фильм уже сущуствует' })
        }

        const film = new Film({ title, releaseYear, stars, format })

        await film.save()

        res.status(201).json({message: 'Фильм добавлен'})
        
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/', async (req, res) => {
    try {
        const films = await Film.find()
        res.json(films)


    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const film = await Film.findById(req.params.id)
        res.json(film)

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const film = await Film.findById(req.params.id)

        await film.delete()

        res.status(201).json({message: 'Фильм удален'})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/search/:queryStr', async (req, res) => {
    try {
        await Film.find({ $or:
                [{"title": new RegExp(req.params.queryStr, 'i')},
                {"stars": new RegExp(req.params.queryStr, 'i')}]
        },
            (err, films) => {
            res.json(films);
        })

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router