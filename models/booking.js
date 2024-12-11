'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // A booking belongs to a user
      Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      // A booking belongs to a speaker
      Booking.belongsTo(models.User, { foreignKey: 'speakerId', as: 'speaker' });
      // A booking is tied to a specific time slot
      Booking.belongsTo(models.SpeakerAvailability, { foreignKey: 'timeSlotId', as: 'timeSlot' });
    }
  }

  Booking.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speakerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeSlotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      defaultValue: 'pending',
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
