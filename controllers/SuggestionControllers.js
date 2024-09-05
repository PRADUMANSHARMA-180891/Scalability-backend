const Response = require('../models/suggestion/ResponseModels');
const Suggestion = require('../models/suggestion/SuggestionModels');

const createSuggestion = async(req,res) =>{
    try {
        const { suggestionText, anonymous, userId } = req.body;
    
        if (!suggestionText) {
          return res.status(400).json({ error: 'Suggestion text is required' });
        }
    
        const newSuggestion = await Suggestion.create({
          suggestionText,
          anonymous,
          userId: anonymous ? null : userId,
        });
    
        res.status(201).json(newSuggestion);
      } catch (error) {
        console.error('Error creating suggestion:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };


    const getAllSuggestions = async (req, res) => {
      try {
          const suggestions = await Suggestion.findAll({
              order: [['createdAt', 'DESC']],
          });
  
          res.status(200).json(suggestions);
      } catch (error) {
          console.error('Error fetching suggestions:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  };


  // response 
const addResponse = async(req,res)=>{
  const { id } = req.params; // Suggestion ID
  const { responseText } = req.body;

  try {
    const response = await Response.create({
      responseText,
      suggestionId: id,
    });

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add response' });
  }
}
// get response
const getResponse = async (req, res) => {
  try {
    const { suggestionId } = req.params; // Assuming `suggestionId` is provided as a URL parameter

    if (!suggestionId) {
      return res.status(400).json({ error: 'Suggestion ID is required' });
    }

    const responses = await Response.findAll({
      where: { suggestionId },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {createSuggestion, getAllSuggestions, addResponse, getResponse}