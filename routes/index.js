var express = require('express');
var router = express.Router();

/* 首页. */
router.get('/', function(req, res, next) {
  try {
    res.render('index',
        {
          title: '首页'
        }
    );
  } catch (err) {
    next(err);
  }
});

router.get('/instru', function(req, res, next) {
    try {
        res.render('productInstru', {
            title: '产品介绍',
        });
    } catch (err) {
        next(err);
    }
});

router.get('/case', function(req, res, next) {
    try {
        res.render('productlist', {
            title: '产品列表',
        });
    } catch (err) {
        next(err);
    }
});

router.get('/detail', function(req, res, next) {
    try {
        res.render('productdetail', {
            title: '产品详情',
        });
    } catch (err) {
        next(err);
    }
});

router.get('/about', function(req, res, next) {
    try {
        res.render('about', {
            title: '关于我们',
        });
    } catch (err) {
        next(err);
    }
});

router.get('/service', function(req, res, next) {
    try {
        res.render('service', {
            title: '服务介绍',
        });
    } catch (err) {
        next(err);
    }
});

router.get('/test', function(req, res, next) {
    try {
        res.render('serviceInstru', {
            title: '服务介绍',
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;