const express = require('express') 
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const config = require('./config/key');


const { User } = require("./models/User");

//bodyparser- client에서 오는 정보를 server에서 분석해서 가져오는 것
//application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져오는 것
app.use(bodyParser.urlencoded({extended: true}));

//application/json type으로 된 것을 분석해서 가져올 수 있게 
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {

//회원 가입 할때 필요한 정보들을 client에서 가져오면
//그것들을 데이터 베이스에 넣어준다.


/*
req.body안에는 json형식으로
{
  id: "a",
  psssword: "123"
}

*/
    const user = new User(req.body)

    user.save((err, userInfo) => {      //정보들이 user모들에 저장, save() mongodb method
      if(err) return res.json({ success: false, err }) //에러를 json형식으로 전달
      return res.status(200).json({
        success: true
      })
    })


})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})