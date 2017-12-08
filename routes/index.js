var express = require('express');
var router = express.Router();
var request = require('../api/request');
var async = require('async');

const urls = {
    caseApi: 'http://api.vshowdome.com/project/?',
};

/* 首页. */
router.get('/', async(req, res, next) => {
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

router.get('/instru', async(req, res, next) => {
    try {
        res.render('productInstru', {
            title: '产品介绍',
        });
    } catch (err) {
        next(err);
    }
});

// router.get('/case', async (req, res, next) => {
//     const caseData = await request.get(urls.caseApi, { }, true);
//     try {
//         res.render('productlist', {
//             title: '产品列表',
//             data: caseData,
//         });
//     } catch (err) {
//         next(err);
//     }
// });

router.get('/case', async(req, res, next) => {
    const caseData = await request.get(urls.caseApi, { }, true);
    const caseData1 = await request.get(urls.caseApi, { cato: '商场活动' }, true);
    const caseData2 = await request.get(urls.caseApi, { cato: '户外活动' }, true);
    const caseData3 = await request.get(urls.caseApi, { cato: '品牌推广' }, true);
    const caseData4 = await request.get(urls.caseApi, { cato: '博物馆&科技馆' }, true);
    const caseData5 = await request.get(urls.caseApi, { cato: '音乐节&狂欢节' }, true);
    const caseData6 = await request.get(urls.caseApi, { cato: '展览展会' }, true);
    try {
        res.render('productdetail', {
            title: '产品详情',
            data: caseData,
            data1: caseData1,
            data2: caseData2,
            data3: caseData3,
            data4: caseData4,
            data5: caseData5,
            data6: caseData6,
        });
    } catch (err) {
        next(err);
    }
});

router.get('/about', async(req, res, next) => {
    try {
        res.render('about', {
            title: '关于我们',
        });
    } catch (err) {
        next(err);
    }
});

router.get('/service', async(req, res, next) => {
    try {
        res.render('service', {
            title: '服务介绍',
        });
    } catch (err) {
        next(err);
    }
});

router.get('/test', async(req, res, next) => {
    try {
        res.render('serviceInstru', {
            title: '服务介绍',
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;