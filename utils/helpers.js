function dateFormat(timestamp) {
    return new Date(timestamp).toISOString();
  }
  
  // Validate if a given email address is valid
  function isValidEmail(email) {
    const emailRegex = /.+@.+\..+/;
    return emailRegex.test(email);
  }
  
  // Generate a unique identifier (e.g., for MongoDB ObjectId)
  function generateUniqueId() {
    return new mongoose.Types.ObjectId();
  }
  
  module.exports = { dateFormat, isValidEmail, generateUniqueId };
  