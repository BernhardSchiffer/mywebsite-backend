const express = require('express');
const router = express.Router();

router.get('/packliste', async (req, res) => {
   res.download(`${__dirname}/../media/zeltlager/Packliste.pdf`);
});

module.exports = router;