var express = require('express');
var router = express.Router();
var request = require('../api/request');
var async = require('async');

const urls = {
    caseApi: 'http://api.vshowdome.com/project/?',
};

/* 首页. */
router.get('/', function (req, res, next) {
  try {
    res.render('index',
        {
            title: '首页',
            T: '微秀文化|DomeLab】创新沉浸式感官体验，引领移动空间艺术',
            D: '深圳市微秀文化传播有限公司，是一家专注于创新型、高性价比球幕产品为核心，以创意理解产品为核心竞争力，主张提升文化品味的创新公司；并以创意、技术优势转变为客户的竞争价值为宗旨。',
            K: '微秀，球幕，DomeLab，移动空间，艺术展览，微秀文化',
        }
    );
  } catch (err) {
    next(err);
  }
});

router.get('/instru/', function (req, res, next) {
    try {
        res.render('productInstru', {
            title: '产品介绍',
            T: '球幕_移动空间产品介绍-微秀文化|DomeLab',
            D: '【微秀文化|DomeLab】移动空间以激活创意为主旨，各类创新活动项目为载体，以互动交流为目的，结合资源整合、数字技术、创新工具，营造一个互动交流、信息共享的新空间。',
            K: '球幕，移动空间，微秀文化产品',
        });
    } catch (err) {
        next(err);
    }
});

router.get('/case/', async function(req, res, next) {
    try {
        const caseData = await request.get(urls.caseApi, { }, true);
        const caseData1 = await request.get(urls.caseApi, { cato: '商场活动' }, true);
        const caseData2 = await request.get(urls.caseApi, { cato: '户外活动' }, true);
        const caseData3 = await request.get(urls.caseApi, { cato: '品牌推广' }, true);
        const caseData4 = await request.get(urls.caseApi, { cato: '博物馆和科技馆' }, true);
        const caseData5 = await request.get(urls.caseApi, { cato: '音乐节和狂欢节' }, true);
        const caseData6 = await request.get(urls.caseApi, { cato: '展览展会' }, true);

        res.render('productdetail', {
            title: '成功案例',
            data: caseData,
            data1: caseData1,
            data2: caseData2,
            data3: caseData3,
            data4: caseData4,
            data5: caseData5,
            data6: caseData6,
            T: '户外活动案例，品牌推广案例，展览展会案例-微秀文化|DomeLab',
            D: '【微秀文化|DomeLab】移动空间与众多知名品牌合作经验丰富，落地实施案例众多，产品成功应用于商场活动、户外活动、品牌推广、博物馆&科技馆、音乐节&狂欢节、展览展会、主题乐园、会议室、全息舞台等，为客户提供完全的沉浸式视觉展示。',
            K: '户外活动案例，品牌推广案例，展览展会案例',
        }, function (err, content) {
            if (err) return next(err);
            res.send(content);
        });
    } catch (err) {
        next(err);
    }
});

router.get('/about/', function (req, res, next) {
    try {
        res.render('about', {
            title: '联系我们',
            T: '联系我们“电话：0755-26812810”-微秀文化|DomeLab',
            D: '【微秀文化|DomeLab】位于深圳市南山区蛇口南海意库6栋502#，交通便利，本着“客户第一，诚信至上”的原则，欢迎国内外企业/公司/机构与本单位建立长期的合作关系，热诚欢迎各界朋友前来参观、考察、洽谈业务。',
            K: '微秀文化，DomeLab，微秀文化地址，微秀文化联系电话',
        });
    } catch (err) {
        next(err);
    }
});

router.get('/service/', function (req, res, next) {
    try {
        res.render('service', {
            title: '服务介绍',
            T: '服务介绍-微秀文化|DomeLab',
            D: '【微秀文化|DomeLab】致力于从原生形态至升华呈现的全生命周期解决方案，注重作品带给客户的价值感和增值效果，根据国际前沿的创意空间结合客户需求，提供满足客户需求与引领市场风尚的定制化服务。',
            K: '微秀文化服务介绍，DomeLab服务介绍',
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;