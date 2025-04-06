const mongoose = require('mongoose');
const aboutSchema = new mongoose.Schema({
content: {
    type: String,
    required: true,
  }
});
aboutSchema.statics.getSingleton = async function () {
  let about = await this.findOne();
  if (!about) {
    about = await this.create({ content: 'default about' });
  }
  return about;
};

aboutSchema.pre('save', async function (next) {
  const existing = await this.constructor.findOne();
  if (existing && existing._id.toString() !== this._id.toString()) {
    throw new Error('Only one About document is allowed.');
  }
  next();
});
module.exports = mongoose.model('About', aboutSchema);