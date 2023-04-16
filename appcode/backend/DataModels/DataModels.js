class Slot {
  id = Number;
  status = Boolean;
  vehicleNumber = String;
  vehicleType = String;
  contactNumber = String;
  inTime = Date | null;
  pricePerHour = Number;
  constructor(id, status, vehicleNumber, vehicleType, contactNumber, inTime, pricePerHour) {
    this._id = mongoose.Types.ObjectId();
    this.id = id;
    this.status = status;
    this.vehicleNumber = vehicleNumber;
    this.vehicleType = vehicleType;
    this.contactNumber = contactNumber;
    this.inTime = inTime;
    this.pricePerHour = pricePerHour;
  }
}

class ResponseModel{
  response = Boolean;
  message = String;
  constructor(response, message, model = null) {
    this.response = response;
    this.message = message;
    this.model = model;
  }
}

module.exports = {
  Slot,
  ResponseModel
};
