module.exports = async (ctx,next)=>{
    ctx.state.data = {
        meg:"小程序启动成功",
    }
}