const MAX_LIMIT = 1000;
var request = require('request');
var fs = require('fs');

module.exports.cron = {
  downloadCatalogImages: {
    //Every five seconds
    schedule: '* */10 * * * *',
    onTick: function() {
      Product.find({limit: MAX_LIMIT}).populate('category').exec(function (err, products) {
        products.forEach(function(element) {
          let path = null;
          if(typeof element.catalogImages != 'undefined' && element.catalogImages != null){
            let catalogImages = element.catalogImages;
            if (catalogImages.length > 0){
              //Remove possible spaces from code
              let code = element.code.replace(/\s/g, '');            
              path = './api/images/catalog/' + code + '.png';
              
              if (!fs.existsSync(path)) {
                //request(catalogImages[0]).pipe(fs.createWriteStream(path));
                request(catalogImages[0], {encoding: null}, function(error, response, body) {
                  if (error) {
                    console.log(error);
                  } else {
                    fs.writeFile(path, body, null, function (err) {});
                  }
                });
              }
            }
          }
        });
      });
    }
  }
};