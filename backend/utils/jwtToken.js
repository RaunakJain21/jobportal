export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken(); // Assumes getJWTToken() returns a signed JWT

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // Cookie expiration time
    ),
    httpOnly: true, // Prevents JavaScript from accessing the token
    secure: true, // Sends cookie only over HTTPS (since Render uses HTTPS)
    sameSite: "None", // Required for cross-origin requests (Frontend and Backend hosted separately)
  };

  // Send the cookie with the JWT token
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
