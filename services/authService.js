import jwt from 'jsonwebtoken';

const AuthService = () => {

  const createLogInToken = (userId) => {
    // SIGN IN USER WITH JWT
    const payload = {
      user: {
        id: userId
      }
    }

    // Create token
    return jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
      if (error) throw error;
      console.log('token in service', token);
      console.log('payload', payload);

      return {
        token,
        user: payload.user,
        loggedIn: true
      }
    });


  }

  return {
    createLogInToken,
  }
}

export default AuthService;