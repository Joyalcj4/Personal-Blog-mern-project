const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
content: {
    type: String,
    required: true,
  }
});
contactSchema.statics.getSingleton = async function () {
  let about = await this.findOne();
  if (!about) {
    about = await this.create({ content: 'default about' });
  }
  return about;
};

contactSchema.pre('save', async function (next) {
  const existing = await this.constructor.findOne();
  if (existing && existing._id.toString() !== this._id.toString()) {
    throw new Error('Only one contact document is allowed.');
  }
  next();
});
module.exports = mongoose.model('Contact', contactSchema);