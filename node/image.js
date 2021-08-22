const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * 小爬虫 js
 *
 * @param {*} options
 */
function downloadJx3Images(options) {
  let { urls, dirName } = options;

  let promises = [];

  function fetchUrlImages(url) {
    return new Promise((resolve, reject) => [
      request(url, function (error, response, body) {
        let imgs = [];

        if (error) {
          reject(error);
          return;
        }

        //获取爬取网站的页面信息
        const $ = cheerio.load(body);

        // 用正则判断数组中的路径是否存在https
        var _ = /(http[s]?|ftp)/;

        $('img').each((i, e) => {
          // 遍历所有
          var src = $(e).attr('src');

          if (!_.test(src)) {
            src = src.replace(/\/{2}/, 'https://'); //因为有些图片不可下载，所以用正则判断一下
          }
          imgs.push(src);
        });

        resolve(imgs);
      }),
    ]);
  }

  urls.forEach((url) => {
    promises.push(fetchUrlImages(url));
  });

  Promise.all(promises).then((result) => {
    let imgs = result.reduce((pervTotal, currentValue) => {
      return pervTotal.concat(currentValue);
    }, []);

    const filePath = path.resolve(__dirname, `./${dirName}`);

    // 是否存在文件夹，如果不存在则创建
    const exists = fs.existsSync(filePath);

    if (!exists) {
      fs.mkdirSync(filePath);
    }

    for (let index = 0; index < imgs.length; index++) {
      if (imgs[index].indexOf('http') !== -1) {
        request(imgs[index]).pipe(
          fs.createWriteStream(
            path.resolve(__dirname, `./${dirName}/${index}.png`)
          )
        );
      }
    }
  });
}

function main() {
  let ShaoLin = {
    urls: [
      'https://www.aigei.com/view/20723-7006770.html',
      'https://www.aigei.com/view/20723-7006770.html?page=2',
      'https://www.aigei.com/view/20723-7006770.html?page=3',
      'https://www.aigei.com/view/20723-7006770.html?page=4',
    ],
    dirName: 'assets-shaolin',
  };

  downloadJx3Images(ShaoLin);
}

main();
