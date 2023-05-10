export const create_response = async (req, res, next) => {
  var response = {};

  // 如果req中帶有err則表示是錯誤回傳
  if (req.err) {
    response = {
      success: false,
      message: "Travel新增失敗 err: " + req.err.message,
      data: {},
    };
    console.log(response);
    res.status(500).json(response);
  } else {
    response = {
      success: true,
      message: "Travel新增成功",
      data: {},
    };
    res.status(201).json(response);
  }
};
