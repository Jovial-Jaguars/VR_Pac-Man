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
  Maps.create({
    mapData: '1102200000111113102002000001111102000200000011112000200222000111022200200200001100000200020020010000200020022000100020020020200211002220020200201110000020020201111100020020201111111000002201111111110000201111111111100001111111111111001111111111111111111111',
    shareable: false,
    user_id: 'don'
  });
  Maps.create({
    mapData: '1102200000111113102002000001111102000200000011112000200222000111022200200200001100000200020020010000200020022000100020020020200211002220020200201110000020020201111100020020201111111000002201111111110000201111111111100001111111111111001111111111111111111111',
    shareable: true,
    user_id: 'don'
  });
  Maps.create({
    mapData: '1102200000111113102002000001111102000200000011112000200222000111022200200200001100000200020020010000200020022000100020020020200211002220020200201110000020020201111100020020201111111000002201111111110000201111111111100001111111111111001111111111111111111111',
    shareable: true,
    user_id: 'don'
  });
  Maps.create({
    mapData: '1102200000111113102002000001111102000200000011112000200222000111022200200200001100000200020020010000200020022000100020020020200211002220020200201110000020020201111100020020201111111000002201111111110000201111111111100001111111111111001111111111111111111111',
    shareable: true,
    user_id: 'don'
  });
  Maps.create({
    mapData: '2222002112022222211120211202111221112021120211122111202112022222211120211202111221112021120211122222002222022222000002003022222000002120000020000002212200002000000211120000200000222222200020000020000020002000022000002200200002000000020020000200000002222220',
    shareable: true,
    user_id: 'notdon'
  });
  Maps.create({
    mapData: '2222002112022222211120211202111221112021120211122111202112022222211120211202111221112021120211122222002222022222000002003022222000002120000020000002212200002000000211120000200000222222200020000020000020002000022000002200200002000000020020000200000002222220',
    shareable: true,
    user_id: 'notdon'
  });
  Maps.create({
    mapData: '2222002112022222211120211202111221112021120211122111202112022222211120211202111221112021120211122222002222022222000002003022222000002120000020000002212200002000000211120000200000222222200020000020000020002000022000002200200002000000020020000200000002222220',
    shareable: false,
    user_id: 'notdon'
  });
  Maps.create({
    mapData: '2222002112022222211120211202111221112021120211122111202112022222211120211202111221112021120211122222002222022222000002003022222000002120000020000002212200002000000211120000200000222222200020000020000020002000022000002200200002000000020020000200000002222220',
    shareable: true,
    user_id: 'notdon'
  });
  Maps.create({
    mapData: '1222222212222221121121121211112112112112121111211222222222222221121121211111212112222122212221211111211101011121111121300000012110002001101100211111210100010121111121011111012112222222222222211211212111112121122221222122212112111111212111211222222222222221',
    shareable: true,
    user_id: 'notdon'
  });
  return 'default maps created';
});

module.exports = Maps;