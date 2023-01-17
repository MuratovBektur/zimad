class UserInfoController {
  async getUserInfo(req, res) {
    const id = req.user.id;
    return res.status(400).json({ id });
  }
}

export default new UserInfoController();
