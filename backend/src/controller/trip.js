// data yang akan di gunakan untuk edit, tambah, ataupun hapus
const TRIPS = require("../models"); //menggunakan data yang ada di database 
module.exports = {
  getAllTrips: async (req, res) => {
    try {
      const data = await TRIPS.find({});
      res.status(200).json({
        message: "Successfully got all trips",
        data,
      });
    } catch (error) {
      res.status(500).json({ message: "Error getting trips", error });
    }
  },

  getTripById: async (req, res) => {
    try {
      const data = await TRIPS.findById(req.params.id);
      if (!data) return res.status(404).json({ message: "Trip not found." });
      res.status(200).json({
        message: "Successfully got trip by id",
        data,
      });
    } catch (error) {
      res.status(500).json({ message: "Error getting trip by id", error });
    }
  },

  addTrips: async (req, res) => {
    try {
      const newTrip = new TRIPS(req.body);
      await newTrip.save();
      res.status(201).json({
        message: "Trip successfully added",
      });
    } catch (error) {
      res.status(500).json({ message: "Error adding trip", error });
    }
  },


  editTripById: async (req, res) => {
    try {
      const data = await TRIPS.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, });
      res.status(201).json({
        message: "Trip successfully updated",
        data: data,
      })
    } catch (error) {
      res.status(400).json({
        status: "Error",
        message: "Error updating trip",
      })
    }
  },

  deleteTripById: async (req, res) => {

    const { id } = req.params;
    try {
      await TRIPS.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "Success",
        message: "Trip successfully deleted"
      });
    } catch (error) {
      res.status(400).json({
        status: "Error",
        message: "Error deleting trip",
      })

    }

  }
};
