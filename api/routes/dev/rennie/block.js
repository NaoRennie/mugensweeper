const router = require('express').Router();
// ８方向に開く
const field = [{ x: 0, y: 0 }];

router.route('/').post((req, res) => {
  if (req.body.x) {
    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]];
    for (let i = 0; i < directions.length; i + 1) {
      const a = Number(directions[i][0]);
      const b = Number(directions[i][1]);
      let m = field.length;
      while (m >= 0) {
        if (field[m - 1].y + b === +req.body.y && field[m - 1].x + a === +req.body.x) {
          field.push({ x: +req.body.x, y: +req.body.y });
          m -= 1;
          break;
        }
        m -= 1;
        break;
      }
    }
  }
  res.json(field);
});

router.route('/').delete((req, res) => {
  field.length = 1;
  res.json(field);
});

module.exports = router;