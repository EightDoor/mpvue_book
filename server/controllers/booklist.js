
const { mysql } = require('../qcloud');
module.exports = async (ctx, next) => {
    const { page, openid } = ctx.request.query;
    const size = 10;
    const mysqlSelect = mysql('books')
        .select("books.*", "cSessionInfo.user_info")
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
    let books;
    if (page) {
        books = await mysqlSelect.limit(size)
            .offset(Number(page) * size)
            .orderBy('id', 'desc');
    } else if (openid) {
        books = await mysqlSelect.where('openid',openid);
    }
    ctx.state.data = {
        list: books.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}