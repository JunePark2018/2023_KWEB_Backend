const { ArticleDAO } = require('../DAO');

const indexPage = async (req, res, next) => {
    try {
        const { user } = req.session;
        return res.render("index.pug", { user });
    } catch (err) {
        return next(err);
    }
};

const listArticles = async (req, res, next) => {
    try {
        const { user } = req.session;
        const { page } = req.params;
        if (page <= 0) throw new Error("BAD_REQUEST");
        const articles = await ArticleDAO.getList(10 * (page - 1), 10);

        const hasPrev = (page > 1) ? true : false;

        const articleNumber = await ArticleDAO.getTotalCount();
        const hasNext = (articleNumber > page * 10) ? true : false;
       

        return res.render("articles/index.pug", { user, articles, page, hasPrev, hasNext });
    } catch (err) {
        return next(err);
    }
};

const latestArticles = async (req, res, next) => {
    try {
        return res.redirect("articles/page/1");
    } catch (err) {
        return next(err);
    }
};

module.exports = { indexPage, listArticles, latestArticles };