const { getBom, addBom } = require('../../../models/v1/bomStore.js');
const countBoms = require('../bom/countBoms.js');
const createPartOfBoms = require('../bom/createPartOfBoms.js');
const judgeExploded = require('../util/judgeExploded.js');

module.exports = (req, field) => {
  const rate = 0.7;

  // 周囲へボムを配置
  createPartOfBoms(rate, field, req).forEach((n) =>
    addBom({ x: n.x, y: n.y, actionId: n.actionId }),
  );
  // 爆弾関連の情報を返却
  return {
    x: req.x,
    y: req.y,
    bomCount: countBoms(getBom(), req),
    exploded: judgeExploded(req, getBom()).exploded,
    userId: req.userId,
  };
};
