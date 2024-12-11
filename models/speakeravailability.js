'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpeakerAvailability extends Model {
    static associate(models) {
      // A speaker availability belongs to a speaker (user)
      SpeakerAvailability.belongsTo(models.User, { foreignKey: 'speakerId', as: 'speaker' });
      // A speaker availability can have many bookings
      SpeakerAvailability.hasMany(models.Booking, { foreignKey: 'timeSlotId', as: 'bookings' });
    }
  }

  SpeakerAvailability.init({
    speakerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeSlot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isBooked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'SpeakerAvailability',
  });

  return SpeakerAvailability;
};
