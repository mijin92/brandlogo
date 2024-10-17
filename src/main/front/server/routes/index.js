const cors = require('cors');
const express = require('express');
const router = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "database-1.czc60qgw4krb.ap-northeast-2.rds.amazonaws.com",
  user: "root",
  password: "2024mijin",
  database: "brandLogo",
});

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

router.use(cors());

// http://localhost:4000/ 으로 접속 시 응답메시지 출력
router.get('/test', (req,res) => {
    res.send({ test : "this is test!!"});
})

router.get("/account_list", (req, res) => {
  const sqlQuery = "SELECT * FROM account;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

module.exports = router;