const blogs = [
    {
        id: '5a451df7571c224a31b5c8ce',
        title: 'HTML is easy',
        author: 'Dan Din',
        url: 'https://jhjfhgj',
        user: {
            _id: '5a437a9e514ab7f168ddf138',
            username: 'lanita',
            name: 'Lana Diva'
        }
    },
    {
        id: '5a451e21e0b8b04a45638211',
        title: 'Browser can execute only javascript',
        author: 'Van Dam',
        url: 'https://ktjhgjj',
        user: {
            _id: '5a437a9e514ab7f168ddf138',
            username: 'lanita',
            name: 'Lana Diva'
        }
    },
    {
        id: '5a451e30b5ffd44a58fa79ab',
        title: 'The most important methods of HTTP are GET and POST',
        author: 'Kim Sim',
        url: 'https://yeyeyye',
        user: {
            _id: '5a437a9e514ab7f168ddf138',
            username: 'lanita',
            name: 'Lana Diva'
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = () => {
    return Promise.resolve(null)
}

export default { getAll, setToken }