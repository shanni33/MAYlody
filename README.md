<div align="center">
    <img src="https://raw.githubusercontent.com/shanni33/MAYlody/c3cc3dd45166dd221dbc6c6b3d819ea97a3f800d/public/maylody-icon.svg" alt="MAYlody" width="200">
    <h2>MAYlody 五月天演唱會查詢網站</h2>
</div>

MAYlody 是使用 Express.js 建構 API，提供給前端 (Vue.js) 使用，並透過 Ajax 對資料庫 MongoDB 進行操作。

## 線上演示

- Demo：https://maylody.herokuapp.com

## 功能說明

### 前端

- 演唱會查詢

```
透過點擊演唱會資訊卡場次，可以查詢總共聽過多少歌曲
```

![](https://i.imgur.com/A1o20Yh.png)

- 演唱會搜尋

```
可以依據演唱會名稱、演唱會日期及演唱會歌曲來搜尋特定場次的演唱會
```

- 查看歌單

```
可點選演唱會資訊卡下方的歌單按鈕進行查看
```

![](https://i.imgur.com/C2fWVje.png)

- 演唱會地圖

```
點擊地圖上方的標誌，會有資訊欄跳出，可以查看五月天在該地方開過演唱會
```

![](https://i.imgur.com/it34wcQ.jpg)

- 新增/修該演唱會 (只限管理員)

```
需進行登入驗證後，即可進入後台，並且可以對特定場次的演唱會進行修改，以及可以新增演唱會
```

![](https://i.imgur.com/x1vLqk9.png)

![](https://i.imgur.com/Z7bdWAt.png)

### 後端 API 說明

| HTTP METHOD |        URL         |           ACTION           | NOTE                             |
| :---------: | :----------------: | :------------------------: | -------------------------------- |
|     GET     |   /api/concerts    | 得到`全部場次`的演唱會資訊 |                                  |
|     GET     | /api/concerts/{id} | 得到`指定場次`的演唱會資訊 | 需經過驗證，拿到 TOKEN，才能操作 |
|    POST     |   /api/concerts    |       新增一場演唱會       | 需經過驗證，拿到 TOKEN，才能操作 |
|    PATCH    | /api/concerts/{id} | 更新`指定場次`的演唱會資訊 |                                  |

> 登入驗證是使用 Passport.js + JWT
