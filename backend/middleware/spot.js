export const create_response = async (req, res, next) => {
  var response = {};

  // 如果req中帶有err則表示是錯誤回傳
  if (req.err) {
    response = {
      success: false,
      message: "新增地點失敗 err: " + req.err.message,
      data: {},
    };
    console.log(response);
    res.status(500).json(response);
  } else {
    req.data = JSON.parse(req.data);
    response = {
      success: true,
      message: "新增地點成功",
      data: {},
    };
    response.data = req.data;
    res.status(201).json(response);
  }
};
