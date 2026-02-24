import Country from "../models/country";

export const getAllCountries = async (req, res) => {
    try {
        const countries = await Country.find();
        res.json(countries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createCountry = async (req, res) => {
    const country = new Country({
        name: req.body.name,
        cities: req.body.cities
    });
    try {
        const newCountry = await country.save();
        res.status(201).json(newCountry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const addCityToCountry = async (req, res) => {
    const countryId = req.params.countryId;
    try {
        const country = await Country.findById(countryId);
        if (!country) {
            return res.status(404).json({ message: 'Quốc gia không tồn tại' });
        }
        const city = {
            name: req.body.name,
            population: req.body.population
            // Các trường khác của thành phố
        };
        country.cities.push(city);
        const updatedCountry = await country.save();
        res.status(201).json(updatedCountry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
