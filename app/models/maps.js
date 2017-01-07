var Sequelize = require('sequelize');
var sequelize = new Sequelize('PacmanVR', 'root', '');

var Maps = sequelize.define('Maps', {
  mapData: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  shareable: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  freezeTableName: true
});

Maps.sync({force: true}).then(function () {
  return Maps.create({
    mapData: '1222222212222221121121121211112112112112121111211222222222222221121121211111212112222122212221211111211101011121111121300000012110002001101100211111210100010121111121011111012112222222222222211211212111112121122221222122212112111111212111211222222222222221',
    shareable: true,
    user_id: null
  });
});

module.exports = Maps;