/*dependencies*/
const express = require('express');


/*imports*/
const postsRouter = require('./posts/PostsRouter.js')

/*server*/

const server = express();
server.use(express.json());
server.use('/api/posts', postsRouter);


server.listen(8000, () => {
    console.log('*** Server Running on http://localhost:8000 ***')
})