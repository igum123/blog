const express = require('express');
const router = express.Router();


const GetArticles = require('./routes/getArticles');
const GetArticle = require('./routes/getArticle');
const SaveArticle = require('./routes/saveArticle');
const SaveArticleImg = require('./routes/saveArticleImg');
const DeleteArticle = require('./routes/deleteArticle');
const GenerateSiteMap = require('./routes/generateSiteMap');



router.get('/api/v1/blog/articles', async (req, res) => {
    const route = new GetArticles(req, res);
    route.process();
});



router.get('/api/v1/blog/article/:articleUrl', async (req, res) => {
    const route = new GetArticle(req, res);
    route.process();
});

router.post('/api/v1/blog/articles', async (req, res) => {
    const route = new SaveArticle(req, res);
    route.process();
});

router.post('/api/v1/blog/img', async (req, res) => {
    const route = new SaveArticleImg(req, res);
    route.process();
});

router.delete('/api/v1/blog/articles/:articleUrl', async (req, res) => {
    const route = new DeleteArticle(req, res);
    route.process();
});

router.get('/api/v1/blog/articles/sitemap', async (req, res) => {
    const route = new GenerateSiteMap(req, res);
    route.process();
});

module.exports = router;