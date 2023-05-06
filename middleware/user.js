export const register_response = async (req, res, next) => {

    var response = {};
    
    // 如果req中帶有message則表示是錯誤回傳
    if(req.err) {
        response = {
            "success": false,
            "message": "使用者註冊失敗 err: " + req.err.message,
            "data": {}
        }
        res.status(500).json(response);
    } else {
        req.data = JSON.parse(req.data);
        response = {
            "success": true,
            "message": "使用者註冊成功",
            "data": {}
        }
        response.data = req.data;
        res.status(201).json(response);
    }
}