import http from "../utils/request";

// 请求数据;
export const login = (data) => {
  //返回一个promise对象
  return http.post("/user/login", data);
};
// 注册
export const register = (data) => {
  return http.post("/user/register", data);
};
// 图片上传oss
export const uploadImg = (data) => {
  return http.post("/oss/upload", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 最佳路径goodPath
export const getGoodPath = (data) => {
  return http.post("/path/goodPath", data);
};

// 管理员首页计数接口
// 用户
export const getUserCount = () => {
  return http.post("/user/userCount");
};
// 评论
export const getCommentCount = () => {
  return http.post("/comment/commentCount");
};
// 预定
export const getReservationCount = () => {
  return http.post("/reservation/reservationCount");
};
// 景点
export const getAttractionCount = () => {
  return http.post("/attraction/attractionCount");
};
// 图表数据
export const getGraphInfo = () => {
  return http.post("/reservation/graphInfo");
};
// 最新评论 commentGraphInfo
export const getCommentGraphInfo = () => {
  return http.post("/comment/commentGraphInfo");
};

//用户
// 获取用户列表
export const getUserList = (data) => {
  return http.post("/user/list", data);
};
// 查询用户
export const getUserById = (data) => http.post("/user/getById", data);
// 删除用户
export const deleteUser = (data) => {
  return http.post("/user/delete", data);
};
// 修改用户
export const updateUser = (data) => {
  return http.post("/user/update", data);
};

//获取分类 /category
export const getCategoryList = (data) => {
  return http.post("/category/list", data);
};
//添加分类
export const addCategory = (data) => {
  return http.post("/category/add", data);
};
//删除分类
export const deleteCategory = (data) => {
  return http.post("/category/delete", data);
};
//修改分类
export const updateCategory = (data) => {
  return http.post("/category/update", data);
};
//查询分类
export const getCategoryById = (data) => {
  return http.post("/category/getById", data);
};

//景区 /attraction
// 获取景区列表
export const getAttractionList = (data) => {
  return http.post("/attraction/list", data);
};
// 查询景区
export const getAttractionById = (data) => {
  return http.post("/attraction/getById", data);
};
// 添加景区
export const addAttraction = (data) => {
  return http.post("/attraction/add", data);
};
// 删除景区
export const deleteAttraction = (data) => {
  return http.post("/attraction/delete", data);
};
// 下架景区
export const removeAttraction = (data) => {
  return http.post("/attraction/remove", data);
};
// 修改景区
export const updateAttraction = (data) => {
  return http.post("/attraction/update", data);
};
// 搜索 search
export const searchAttraction = (data) => {
  return http.post("/attraction/search", data);
};

// 预定信息
// 获取预定列表
export const getReservationList = (data) => {
  return http.post("/reservation/list", data);
};
// 查询预定信息
export const getReservationById = (data) => {
  return http.post("/reservation/getById", data);
};
// 添加预定信息
export const addReservation = (data) => {
  return http.post("/reservation/add", data);
};
// 删除预定信息
export const deleteReservation = (data) => {
  return http.post("/reservation/delete", data);
};
// 修改预定信息
export const updateReservation = (data) => {
  return http.post("/reservation/update", data);
};
// 获取用户预定信息 listByUserId
export const getListByUserId = (data) => {
  return http.post("/reservation/listByUserId", data);
};

// 留言信息
// 获取留言列表
export const getCommentList = (data) => {
  return http.post("/comment/list", data);
};
// 查询留言信息
export const getCommentById = (data) => {
  return http.post("/comment/getById", data);
};
// 添加留言信息
export const addComment = (data) => {
  return http.post("/comment/add", data);
};
// 删除留言信息
export const deleteComment = (data) => {
  return http.post("/comment/delete", data);
};
// 修改留言信息
export const updateComment = (data) => {
  return http.post("/comment/update", data);
};
// listByAttractionId
export const getCommentsByAttraction = (data) => {
  return http.post("/comment/listByAttractionId", data);
};

//查询
// 获取用户列表
export const getUserListBySearch = (data) => {
  return http.post("/user/list", data);
};

export const getCategoryByName = (data) => {
  return http.post("/category/list", data);
};

export const getAttractionListByName = (data) => {
  return http.post("/attraction/list", data);
};

export const getReservationListByName = (data) => {
  return http.post("/reservation/listByUserName", data);
};

export const getCommentListByContent = (data) => {
  return http.post("/comment/listByName", data);
};
