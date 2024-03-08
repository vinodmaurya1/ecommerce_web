const model = require("../models/cityModel");
const modelArea = require("../models/areaModel");
const modelLoction = require("../models/locationModel");
const City = model.City;
const Area = modelArea.Area;
const Location = modelLoction.Location;



exports.createCity = async (req, res) => {
  try {
    const existingCity = await City.findOne({ name: req.body.name });
    if (existingCity) {
      return res
        .status(409)
        .json({ success: false, msg: "City already exists" });
    } else {
      const newCity = new City(req.body);
      const savedCity = await newCity.save();
      return res.status(201).json({
        success: true,
        message: "City saved successfully!",
        city: savedCity,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Failed to save city" });
  }
};

exports.getCity = async (req, res) => {
  try {
    const cities = await City.find();
    const cityCount = await City.countDocuments();
    res.status(200).json({
      success: true,
      message: "City List!",
      count: cityCount,
      data: cities,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch cities" });
  }
};

exports.createArea = async (req, res) => {
  try {
    const { name, city_id } = req.body;
    const city = await City.findById(city_id);

    if (!city) {
      return res.status(404).json({ success: false, msg: "City not found" });
    }

    const existingArea = await Area.findOne({ name });

    if (existingArea) {
      return res
        .status(409)
        .json({ success: false, msg: "Area already exists" });
    }
    const newArea = new Area({
      name,
      city_id: city._id,
      city_name: city.name,
    });

    const savedArea = await newArea.save();

    return res.status(201).json({
      success: true,
      message: "Area saved successfully!",
      area: savedArea,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Failed to save area" });
  }
};

exports.getArea = async (req, res) => {
  try {
    const { city_id } = req.body;
    const areas = await Area.find({ city_id });
    const areaCount = await Area.countDocuments({ city_id });
    if (areaCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No area found here",
      });
    }
    res.status(200).json({
      success: true,
      message: "Area List!",
      count: areaCount,
      data: areas,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch areas" });
  }
};

exports.createLocation = async (req, res) => {
  try {
    const { name, city_id, area_id } = req.body;
    const city = await City.findById(city_id);
    const area = await Area.findById(area_id);
    if (!city) {
      return res.status(404).json({ success: false, msg: "City not found" });
    } else if (!area) {
      return res.status(404).json({ success: false, msg: "Area not found" });
    }
    const existingLocation = await Location.findOne({ name });
    if (existingLocation) {
      return res
        .status(409)
        .json({ success: false, msg: "Loaction already exists" });
    }
    const newLocation = new Location({
      name,
      city_id: city._id,
      city_name: city.name,
      area_id: area._id,
      area_name: area.name,
    });

    const savedLocation = await newLocation.save();

    return res.status(201).json({
      success: true,
      message: "Location saved successfully!",
      location: savedLocation,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to Loaction area" });
  }
};


exports.getLocation = async (req, res) => {
  try {
    const { city_id, area_id } = req.body;
    const locations = await Location.find({ city_id, area_id });
    const locCount = await Location.countDocuments({ city_id, area_id });
    if (locCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No locations found here",
      });
    }
    res.status(200).json({
      success: true,
      message: "location List!",
      count: locCount,
      data: locations,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch location" });
  }
};