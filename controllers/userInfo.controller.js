class UserInfoController {
  async getUserInfo(req, res) {
    const id = req.user.id;
    return res.status(200).json({ id });
  }
}

export default new UserInfoController();
