const Silder = require('../Model/Silder')

exports.allSlider= async (req, res) => {
  try {
    const sliders = await Silder.find();
    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sliders' });
  }
};

// Controller to handle POST request to create a new slider
exports.allSliderPost= async (req, res) => {
  try {
    const { name, image, title, text, button_title, url, coupon, productId } = req.body;
    console.log(req.body)
    const newSlider = new Silder({
      
      name,
      image,
      title,
      text,
      button_title,
      url,
      coupon, // Coupon and productId can be omitted if not provided in the request
      productId,
    });

    const savedSlider = await newSlider.save();
    res.json(savedSlider);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the slider' });
  }
};